from collections.abc import Sequence

from flask_login import current_user
from sqlalchemy import select
from sqlalchemy.dialects.postgresql import insert as pg_insert

from finapp import db
from finapp.models import Alert, AlertType
from finapp.queries import budget_queries, transaction_queries

##
## Alert queries
##


def get_alert() -> Alert | None:
    return db.session.scalars(
        select(Alert).where(Alert.user_id == current_user.id).limit(1)
    ).first()


def upsert_alert(alert_type) -> None:
    stmt = pg_insert(Alert).values(
        {"user_id": current_user.id, "alert_type": alert_type}
    )
    upsert_stmt = stmt.on_conflict_do_update(
        constraint="alert_user_id_unique",
        set_={
            "alert_type": stmt.excluded.alert_type,
        },
    )
    db.session.execute(upsert_stmt)
    db.session.commit()


def get_all_users_with_alerts() -> Sequence[Alert]:
    stmt = select(Alert).where(Alert.alert_type > AlertType.NONE)
    return db.session.scalars(stmt).unique().all()


def get_users_with_weekly_alerts() -> Sequence[int]:
    alert_type_int = int(AlertType.WEEKLY_SPENDING)
    stmt = select(Alert.user_id).where(
        alert_type_int == Alert.alert_type.op("&")(alert_type_int)
    )
    return db.session.scalars(stmt).unique().all()


def get_users_with_year_end_alerts() -> Sequence[Alert]:
    alert_type_int = int(AlertType.YEAR_END_REPORT)
    stmt = select(Alert).where(
        alert_type_int == Alert.alert_type.op("&")(alert_type_int)
    )
    return db.session.scalars(stmt).unique().all()


def get_week_spend_report(user_id) -> list[dict[str, float | str]]:
    budgets = budget_queries.get_budgets_for_user(user_id)

    spending_data = []
    for budget in budgets:
        spending_data.append(
            {
                "name": budget.name,
                "total": budget.total,
                **transaction_queries.get_spending_for_budget(budget.id, 7),
            }
        )

    return spending_data

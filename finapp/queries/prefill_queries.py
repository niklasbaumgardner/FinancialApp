from finapp.models import PaycheckPrefill
from flask_login import current_user
from finapp import db


##
## Prefill queries
##


def create_or_update_prefill(b_id, total_amount, amount):
    prefill = PaycheckPrefill(
        budget_id=b_id,
        user_id=current_user.id,
        total_amount=total_amount,
        amount=amount,
    )

    db_prefill = get_prefill_by_total_amount_and_budget(
        prefill.total_amount, prefill.budget_id
    )

    if db_prefill:
        db_prefill.amount = prefill.amount
    else:
        db.session.add(prefill)
    db.session.commit()


def get_prefill(prefill_id):
    prefill = PaycheckPrefill.query.filter_by(
        id=prefill_id, user_id=current_user.id
    ).first()
    return prefill


def get_prefills():
    prefills = PaycheckPrefill.query.filter_by(user_id=current_user.id).all()
    return prefills


def get_prefills_by_budget(budget_id):
    prefills = PaycheckPrefill.query.filter_by(
        budget_id=budget_id, user_id=current_user.id
    ).all()
    return prefills


def get_prefills_by_total_amount(total_amount):
    prefill = PaycheckPrefill.query.filter_by(
        user_id=current_user.id, total_amount=total_amount
    ).all()
    return prefill


def get_prefill_by_total_amount_and_budget(total_amount, budget_id):
    prefill = PaycheckPrefill.query.filter_by(
        user_id=current_user.id, total_amount=total_amount, budget_id=budget_id
    ).first()
    return prefill


def get_prefill_paycheck():
    prefills = get_prefills()

    prefill_dict = {}
    for prefill in prefills:
        temp = [prefill.budget_id, prefill.amount]
        try:
            prefill_dict[prefill.total_amount].append(temp)
        except:
            prefill_dict[prefill.total_amount] = [temp]

    return prefill_dict


def delete_prefill(p_id):
    pre = get_prefill(p_id)
    _delete_prefill(pre)


def _delete_prefill(prefill):
    if prefill:
        db.session.delete(prefill)
        db.session.commit()

import json

from flask import Blueprint, render_template, request
from flask_login import login_required

from finapp.queries import externaltransactions_queries

externaltransactions_bp = Blueprint("externaltransactions_bp", __name__)


@externaltransactions_bp.get("/external_transactions")
@login_required
def view_transactions() -> str:

    return render_template("externaltransactions.html")


@externaltransactions_bp.get("/api/data_grid_external_transactions")
@login_required
def api_data_grid_transactions():
    sort = json.loads(request.args.get("sort", ""))
    filters = json.loads(request.args.get("filters", ""))
    search = request.args.get("search")
    page = request.args.get("page", default=1, type=int)
    page_size = request.args.get("pageSize", default=20, type=int)

    transactions, total, page, num_pages, total_sum = (
        externaltransactions_queries.data_grid(sort, filters, search, page, page_size)
    )

    return {
        "transactions": [t.to_dict() for t in transactions],
        "total": total,
        "page": page,
        "num_pages": num_pages,
        "total_sum": total_sum,
    }

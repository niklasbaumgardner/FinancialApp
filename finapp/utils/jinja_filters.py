from jinja2.filters import FILTERS
from finapp.utils import helpers


def budgets_array(value):
    """
    custom budgets list to js array filter
    """
    lst = []
    for budget in value:
        temp = dict(id=budget.id, budgetString=str(budget))
        lst.append(temp)
    return lst


def json_array(lst):
    newLst = []
    for ele in lst:
        newLst.append(ele.to_json())
    return newLst


def to_json(object):
    return object.to_json()


def prettify_money(value):
    """
    Formats a number into a dollar amount string
    """

    return helpers.format_to_money_string(value)


def add_filters():
    FILTERS["budgets_array"] = budgets_array
    FILTERS["json_array"] = json_array
    FILTERS["to_json"] = to_json
    FILTERS["prettify_money"] = prettify_money

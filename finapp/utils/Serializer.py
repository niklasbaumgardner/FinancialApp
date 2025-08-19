from sqlalchemy.inspection import inspect as sa_inspect
from typing import Any, Optional


class SerializerMixin:
    serialize_only: Optional[tuple[str, ...]] = None
    serialize_rules: Optional[tuple[str, ...]] = None

    def to_dict(self, rules=None, only=None) -> dict:
        inspector = sa_inspect(self)
        sa_keys = {a.key for a in inspector.mapper.attrs}

        include = set()
        exclude = set()

        only = only or tuple()
        rules = rules or tuple()

        only = getattr(self, "serialize_only") or tuple() + only
        rules = getattr(self, "serialize_rules") or tuple() + rules

        keys = None
        if only is not None and len(only) > 0:
            keys = only

        else:
            keys = tuple(sa_keys)
            for rule in rules:
                if rule.startswith("-"):
                    exclude.add(rule[1:])
                else:
                    include.add(rule)

            keys += tuple(include)

        keys = tuple(sorted(list(keys)))

        data: dict[Any, Any] = {}

        for key in keys:
            if key in exclude:
                continue

            data[key] = serialize(getattr(self, key))

        return data


def serialize(value):
    KEEP_DEFAULT_TYPES = [int, float, str, bool]
    value_type = type(value)
    if value is None:
        return None
    elif value_type in KEEP_DEFAULT_TYPES:
        return value
    elif isinstance(value, list):
        return [serialize(v) for v in value]
    elif callable(value):
        return serialize(value())
    elif hasattr(value, "to_dict"):
        return value.to_dict()
    else:
        return str(value)

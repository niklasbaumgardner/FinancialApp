from datetime import datetime
from flask_login import current_user


TIMED_CACHE = {}


class TimedCache:
    valid_time = 3600  # 1 hour in seconds
    data = {}

    def get(self, key):
        result, set_time = self.data.get(key, (None, None))

        if set_time and self.is_time_still_valid(time=set_time):
            return result

        return None

    def set(self, key, value):
        now = datetime.now()

        self.data[key] = (value, now)

    def has(self, key):
        result, set_time = self.data.get(key, (None, None))

        return result and self.is_time_still_valid(time=set_time)

    def is_time_still_valid(self, time):
        now = datetime.now()

        return (now - time).total_seconds() < self.valid_time

    def invalidate(self):
        self.data.clear()


def timed_cache_decorator(func):
    def wrapper(*args, **kwargs):
        key = func.__name__
        timed_cache = TIMED_CACHE.get(key)
        if not timed_cache:
            timed_cache = TimedCache()
            TIMED_CACHE[key] = timed_cache

        result = timed_cache.get(current_user.id)
        if result:
            return result

        result = func(*args, **kwargs)
        timed_cache.set(key=current_user.id, value=result)

        return result

    return wrapper

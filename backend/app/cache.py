import json

import redis

from app.config import settings

_client: redis.Redis | None = None

TASKS_CACHE_KEY = "tasks:all"
TASKS_TTL = 60


def get_redis() -> redis.Redis:
    global _client
    if _client is None:
        _client = redis.from_url(settings.redis_url, decode_responses=True)
    return _client


def get_cached_tasks() -> list | None:
    try:
        raw = get_redis().get(TASKS_CACHE_KEY)
        return json.loads(raw) if raw else None
    except redis.RedisError:
        return None


def set_cached_tasks(tasks: list) -> None:
    try:
        get_redis().setex(TASKS_CACHE_KEY, TASKS_TTL, json.dumps(tasks))
    except redis.RedisError:
        pass


def invalidate_tasks_cache() -> None:
    try:
        get_redis().delete(TASKS_CACHE_KEY)
    except redis.RedisError:
        pass

# Stage 1: Build
FROM python:3.13-slim AS builder

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

ENV UV_PYTHON_PREFERENCE=only-system

RUN apt-get update && apt-get install -y --no-install-recommends \
  gcc \
  libc-dev \
  libpq-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync --locked --no-dev --no-install-project

# Stage 2: Runtime
FROM python:3.13-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
  libpq5 \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"

COPY finapp/ finapp/
COPY run.py gunicorn.conf.py ./

CMD ["gunicorn", "-c", "gunicorn.conf.py", "run:app"]

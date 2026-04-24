FROM python:3.11-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY apps/coach-py/pyproject.toml ./
RUN pip install -U pip && pip install . || true
COPY apps/coach-py/src ./src
EXPOSE 5000
CMD ["python","-m","uvicorn","src.main:app","--host","0.0.0.0","--port","5000"]

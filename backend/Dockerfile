FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Note the port 7860 for Hugging Face
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--timeout", "120", "app:app"]
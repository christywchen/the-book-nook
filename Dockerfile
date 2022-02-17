FROM node:12 AS build-stage

WORKDIR /frontend
RUN pwd
COPY frontend/. .

# You have to set this because it should be set during build time.
ENV REACT_APP_BASE_URL=https://book-nook-app.herokuapp.com/

# Build our React App
RUN npm install
RUN npm run build

FROM python:3.9

# Setup Flask environment
ENV FLASK_APP=backend
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /frontend/build/* backend/static/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD gunicorn --worker-class eventlet -w 1 backend:backend

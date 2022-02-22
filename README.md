# The Book Nook
The Book Nook is an app for organizing your book clubs. Users can create book clubs and join book clubs, interact with those book clubs, as well as add books to their book club's reading lists. This app seeks to create an enclave for friends to gather in a space away from their busy, cluttered social media organizations and make offer a sleek, no-frills platform for doing what every book club needs - a clean, organized interface for people to read about books, then talk about them.

A live demo of this project can be found [here](https://book-nook-app.herokuapp.com/).

This app was created an a two week sprint and has the following core functionalities:
- **Book Clubs & Memberships**: Creating and joining book clubs. Creators can set a member capacity for their book club. All users can join or create up to five book clubs.
- **Book Clubs & Book Club Books**: Adding and removing books to and from book clubs' reading lists and setting read status. Users can browse books in the database or create new books if the desired book is not yet in the database.

Visit the [wiki](https://github.com/christywchen/the-book-nook/wiki) for more information about features, database schema, redux state, and routes.

# Implementation
This app was built using a **JavaScript** frontend and **Python** backend.

The backend utilizes **Flask** and **SQLAlchemy** along with **PostgreSQL** for data management. The API routes were designed with RESTful architecture in mind. Other libraries used to facilitate data retrieval or processing includes **WTForms**, **Flask-Login**, and **Alembic**.

The frontend utilizes **React**, and **Redux** along with **React Router** for routing. As with the backend, RESTful convention also guided the decisionmaking for frontend routes. The application's **HTML** and **CSS** were written entirely from scratch and uses no external libraries.

# Local Installation

Running this application locally requires Python 3.9, Pipenv, PostgreSQL, and Node.js, and NPM. The root folder holds the backend directory ``/app`` and the frontend directory ``/react-app``.

## Step 1: Download
Clone the project repository.
```
git clone https://github.com/christywchen/the-book-nook
```
## Step 2: Backend Setup

### Server Installation
From the root directory, run the following to install the Flask app and its dependencies. Pipenv is required for creating the virtual environment and ``requirements.txt`` must be included to install the correct dependencies.

```
pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
```

### Database Creation
Create a PostgreSQL user with database creation authority and save the credentials in the **.env** inside of the root folder. Create the **.env** file based on the example provided in **.env.example**.

```
FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=<secret key>
DATABASE_URL=postgresql://<username>:<password>@<server>/<database>
```

Initiate the pipenv shell from your root directory. Migrate and seed the database using the following commands. The seeder files contain necesary information to set up a demo user account that can be used to tour the site without needing to register.

```
pipenv shell
flask db upgrade
flask seed all
```

At this point, the server can be started by running the following command from the root directory.
```
flask run
```

## Step 3: Frontend Setup
Switch over to ``/react-app`` and run the following command to set up the necessary Node.js dependencies for running the frontend server.

```
npm install
```

After installation completes, run the following to start the server and begin using the application.

```
npm start
```

# Future Features

- Book genre tagging
- Book club invitations
- Book club joining requests/approvals
- Book club and book search
- Book club reading list voting

# Challenges

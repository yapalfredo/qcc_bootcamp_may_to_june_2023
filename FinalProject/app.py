# PROJECT NAME: FINAL_PROJECT
# PURPOSE: This is the main file for the project. It contains the routes for this project.
# AUTHOR: ALFREDO YAP

from flask import Flask, render_template, request, redirect, url_for, session
from pymongo import MongoClient
from dotenv import load_dotenv

import os
# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

# MongoDB connection settings
client = MongoClient(os.environ.get('MONGO_HOST'))
db = client['qcc_se_final_project']
collection = db['users']


@app.route("/")
def index():
    if 'current_user' in session:
        username = session['current_user']['username']
        best = session['current_user']['best']
        user_image_url = 'https://robohash.org/'+username
        return render_template("index.html", username=username, best=best, user_image_url=user_image_url)
    else:
        return redirect(url_for('login'))


@app.route("/login", methods=['GET', 'POST'])
def login():
    # session  is active redirect to index
    if 'current_user' in session:
        return redirect(url_for('index'))

    if request.method == 'POST':
        # get username and password from form using ID
        username = request.form['username']
        password = request.form['password']

        # check if username and password match
        user = collection.find_one(
            {"username": username, "password": password})

        if not username or not password:
            return render_template("login.html", error="Username and password cannot be empty")

        if user is None:
            return render_template("login.html", error="Invalid username or password")
        else:

            user_dict = dict(user)
            user_dict.pop('_id', None)  # Remove the ObjectId field
            session['current_user'] = user_dict
            return redirect(url_for('index'))
    else:
        return render_template("login.html")


@app.route("/signup", methods=['GET', 'POST'])
def signup():
    # session  is active redirect to index
    if 'current_user' in session:
        return redirect(url_for('index'))

    if request.method == 'POST':
        # get username and password from form using ID
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        # Check if fields are empty
        if not username or not password or not confirm_password:
            return render_template("signup.html", error="All fields are required")

        # Check if passwords match
        if password != confirm_password:
            return render_template("signup.html", error="Passwords do not match")

        # check if username and password match
        user = collection.find_one(
            {"username": username, "password": password})

        if user is None:
            # create new user
            new_user = {
                "password": password,
                "username": username,
                "best": 0,
            }
            collection.insert_one(new_user)
            return render_template("login.html", success="User created successfully")
        else:
            return render_template("signup.html", error="User already exists")
    else:
        return render_template("signup.html")


# logout route
@app.route("/logout")
def logout():
    # remove the current_user from the session
    session.pop('current_user', None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.debug = True
    app.run()

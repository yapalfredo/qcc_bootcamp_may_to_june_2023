from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
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
        return render_template("index.html")
    else:
        return redirect(url_for('authenticate'))


@app.route("/authenticate")
def authenticate():
    return render_template("home.html")


@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # get username and password from form using ID
        username = request.form['username']
        password = request.form['password']

        # check if username and password match
        user = collection.find_one(
            {"username": username, "password": password})

        if user is None:
            return render_template("home.html", error="Invalid username or password")
        else:
            user_dict = dict(user)
            user_dict.pop('_id', None)  # Remove the ObjectId field
            session['current_user'] = user_dict
            return redirect(url_for('index'))
    else:
        return redirect(url_for('index'))


# logout route
@app.route("/logout")
def logout():
    # remove the current_user from the session
    session.pop('current_user', None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.debug = True
    app.run()

from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Load environment variables
load_dotenv()

# MongoDB connection settings
client = MongoClient(os.environ.get('MONGO_HOST'), 27017)
db = client['qcc_se_final_project']
collection = db['users']


# keeps track off whether the user is logged in or not
current_user = None


@app.route("/")
#  if current_user is not None:
def index():
    if current_user is not None:
        return render_template("index.html")
    else:
        return redirect(url_for('authenticate'))


@app.route("/authenticate", methods=['GET', 'POST'])
def authenticate():
    if request.method == 'POST':
        username = request.form.get('username')
        # Check if the user is in the database or not
        # If the user is in the database, then set user_logged_in to True
        # Else flash an error message
        user_logged_in = True  # Assuming the user is authenticated successfully
        return redirect(url_for('index'))
    else:
        return render_template("home.html")


# logout route
@app.route("/logout")
def logout():
    # set user_logged_in to false
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.debug = True
    app.run()

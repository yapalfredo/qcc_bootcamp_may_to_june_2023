# PROJECT NAME: FINAL_PROJECT
# PURPOSE: This is the main file for the project. It contains the routes for this project.
# AUTHOR: ALFREDO YAP

from flask import Flask, render_template, request, redirect, url_for, session, jsonify,  make_response
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
        user_image_url = 'https://robohash.org/'+username

        # Fetch the user data from the database to get the latest 'best' score
        user = collection.find_one({"username": username})
        best = user['best'] if user and 'best' in user else 0

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

            # Check if the best score is already in the session
            if 'best' not in user_dict:
                user_dict['best'] = 0

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

        # check if username already exists
        user = collection.find_one(
            {"username": username})

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
    
@app.route("/account", methods=['GET', 'POST'])
def account():
    # session  is active redirect to index
    if 'current_user' in session:
        username = session['current_user']['username']
        user_image_url = 'https://robohash.org/'+username

        # Fetch the user data from the database to get the latest 'best' score
        user = collection.find_one({"username": username})
        best = user['best'] if user and 'best' in user else 0

        return render_template("account.html", username=username, best=best, user_image_url=user_image_url)
    else:
        return redirect(url_for('login'))


@app.route("/update_best_score", methods=['POST'])
def update_best_score():
    if 'current_user' in session:
        username = session['current_user']['username']
        score = request.json.get('score')

        if score is not None and isinstance(score, int):
            # Fetch the user data from the database to get the latest 'best' score
            user = collection.find_one({"username": username})
            current_best = user['best'] if user and 'best' in user else 0

            # Compare the new score with the current best score and update if necessary
            if score > current_best:
                # update the session value for best
                session['current_user']['best'] = score

                # Update the existing document with the new score
                collection.update_one({"username": username}, {
                                      '$set': {'best': score}})
                return jsonify({'message': 'Score updated successfully'})
            else:
                return jsonify({'message': 'New score is not higher than the current best score'})
        else:
            return jsonify({'error': 'Invalid request data'})
    else:
        return jsonify({'error': 'User not logged in'})


@app.route("/get_best_score")
def get_best_score():
    if 'current_user' in session:
        username = session['current_user']['username']
        user = collection.find_one({"username": username})
        if user is not None and 'best' in user:
            best_score = user['best']
            return jsonify({'best': best_score})
    return jsonify({'error': 'User not logged in or score not found'})


@app.route("/logout")
def logout():
    # remove the current_user from the session
    session.pop('current_user', None)
    return redirect(url_for('index'))

# delete account, remove from database, delete session, logout. fetch from ajax
@app.route("/delete_account", methods=['GET', 'POST'])
def delete_account():

    # allow only if there's a valid session
    if 'current_user' not in session:
        return render_session_not_found()

    # get username from ajax request
    username = request.json.get('username')
    # delete user from database using username

    if username is not None:
        collection.delete_one({"username": username})
        # remove the current_user from the session
        return jsonify({'message': 'Account deleted successfully'})
    else:
        return jsonify({'error': 'Invalid request data'})

# reset best score to 0, fetch from ajax
@app.route("/reset_best_score", methods=['GET', 'POST'])
def reset_best_score():
    # allow only if there's a valid session
    if 'current_user' not in session:
        return render_session_not_found()

    # get username from ajax request
    username = request.json.get('username')
    # update the best in database using username

    if username is not None:
        collection.update_one({"username": username}, {
                              '$set': {'best': 0}})
        # remove the current_user from the session
        return jsonify({'message': 'Best score reset successfully'})
    else:
        return jsonify({'error': 'Invalid request data'})


# update password in db
@app.route("/update_password", methods=['GET', 'POST'])
def update_password():

    # allow only if there's a valid session
    if 'current_user' not in session:
        return render_session_not_found()

    # not ajax, get username and password from using name. Then validate current password, the new password and confirm new password. Do not allow empty fields. If current password is correct, update password in database. If not, return error message. If new password and confirm new password do not match, return error message. If all is well, return success message.
    # get username and password from form using ID
    username = request.form['username']
    best = request.form['best']
    current_password = request.form['password']
    new_password = request.form['new_password']
    confirm_new_password = request.form['confirm_password']

    # Check if fields are empty
    if not username or not current_password or not new_password or not confirm_new_password:
        return render_template("account.html", update_error="All fields are required", username=username, best=best)
    
    # check if current password is correct
    user = collection.find_one(
        {"username": username, "password": current_password})
    
    if user is None:
        return render_template("account.html", update_error="Current password is incorrect", username=username, best=best)
    
    # Check if new passwords match
    if new_password != confirm_new_password:
        return render_template("account.html", update_error="New passwords do not match", username=username, best=best)
    
    # if new password is the same password as the current password
    if new_password == current_password:
        return render_template("account.html", update_error="New password cannot be the same as the current password", username=username, best=best)
    
    # update password in database
    collection.update_one({"username": username}, {
                            '$set': {'password': new_password}})
    return render_template("account.html", update_success="Password updated successfully", username=username, best=best)
    
def render_session_not_found():
    response = make_response("<h1>No active session found</h1> <p>You will be redirected to the login page in 5 seconds</p>")
    response.headers['Refresh'] = '5;url=' + url_for('login')
    return response



if __name__ == '__main__':
    app.debug = True
    app.run()

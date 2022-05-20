from flask import render_template, flash, redirect, url_for
from app import app, db
from app.forms import LoginForm, RegistrationForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Rank
from flask import request
from werkzeug.urls import url_parse
from datetime import date


@app.route('/')
@app.route('/index')
# @login_required
def index():
    return render_template("index.html", title="Home")

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        user.set_adminkey(form.adminkey.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

@app.route('/game')
@login_required
def game():
    return render_template("game.html", title="Game")

@app.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    return render_template('user.html', user=user, title="Profile")


@app.route('/is_play_today/', methods=['GET', 'POST'])
@login_required
def is_play_today():
    print(current_user.id)
    today = date.today()
    rank_today = Rank.query.filter(Rank.user_id==current_user.id, db.func.date(Rank.timestamp)==today).first()
    if rank_today is None:
        return "False"
    return "True"    
    #return 


@app.route('/admin/')
# @login_required
def admin():

    data = User.query.order_by(User.id)
    return render_template("admin.html", data = data)
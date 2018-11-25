from flask import Flask, render_template, redirect, url_for, request, logging, flash, session
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt
from os import urandom

app = Flask(__name__)
app.secret_key = urandom(16)

# Config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'FOBS'
app.config['MYSQL_PASSWORD'] = 'fobs'
app.config['MYSQL_DB'] = 'FOBS'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# Init MYSQL
mysql = MySQL(app)

@app.route("/", methods=['GET', 'POST'])
def main():
    return render_template('homePage.html')

@app.after_request
def add_header(r):
    """
    This code disable caching in Flask.
    This behaviour is convenient for development because when refreshing the webpage,
    cached versions of CSS and JS files are loaded instead of the most recent versions.

    Code from: https://stackoverflow.com/questions/47376744/how-to-prevent-cached-response-flask-server-using-chrome
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@app.route("/ceo")
def ceo():
    if 'username' in session:
        return render_template('ceo.html')
    # TODO: (IAN) render a not logged in page
    return render_template('homePage.html')

@app.route("/financial")
def financial():
    if 'username' in session:
        return render_template('financial.html')
    # TODO: (IAN) render a not logged in page
    return render_template('homePage.html')

@app.route("/employee")
def employee():
    if 'username' in session:
        return render_template('employee.html')
    # TODO: (IAN) render a not logged in page
    return render_template('homePage.html')
    

class RegisterForm(Form):
    company = StringField('Company', [validators.Length(min=4, max=50)])
    username = StringField('Username', [validators.Length(min=4, max=25)])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords do not match')
    ])
    confirm = PasswordField('Confirm Password')

@app.route('/signup', methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate():
        # Create cursor
        cur = mysql.connection.cursor()

        # CREATE A NEW COMPANY FIRST
        company_name = form.company.data
        cur.execute("INSERT INTO company(company_name) VALUES(%s)", [company_name])

        # GET THE ID OF THE CREATED COMPANY
        company_id = -1
        result = cur.execute("SELECT * FROM company WHERE company_name = %s", [company_name])
        if result > 0:
            # Get stored hash
            data = cur.fetchone()
            company_id = int(data['company_id'])

        username = form.username.data
        password = sha256_crypt.encrypt(str(form.password.data))
        role = "ceo"

        cur.execute("INSERT INTO users(username, password, company_id, role) VALUES(%s, %s, %s, %s)",
                    (username, password, company_id, role))

        # commit to DB
        mysql.connection.commit()

        # close connection
        cur.close()

        # flash('Your company is now registered and you can login as the CEO', 'success')

        return redirect("/")

    return render_template('signup.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None

    if request.method == 'POST':

        # Get Form Fields
        username = request.form['username']
        password_candidate = request.form['password']

        if username == 'admin' and password_candidate == 'admin':
            return redirect("/ceo")

        # Create cursor
        cur = mysql.connection.cursor()

        # Get user by username
        result = cur.execute("SELECT * FROM users WHERE username = %s", [username])

        if result > 0:
            # Get stored hash
            data = cur.fetchone()
            password = data['password']
            role = data['role']

            # Compare Passwords
            if sha256_crypt.verify(password_candidate, password):
                session['username'] = data['username']
                app.logger.info('PASSWORD MATCHED')
                if role == 'ceo':
                    return redirect("/ceo")
                elif role == 'FD':
                    return redirect("/financial")
                else:
                    return redirect("/employee")
            else:
                error = 'Password not matched'
        else:
            error = 'Invalid Credentials. Please try again.'

    return render_template('login.html', error=error)

if __name__ == '__main__':
    app.run(debug=True)

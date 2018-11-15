from flask import Flask, render_template, redirect, url_for, request, logging, flash
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt




app = Flask(__name__)

#config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'FOBS'
app.config['MYSQL_PASSWORD'] = 'fobs'
app.config['MYSQL_DB'] = 'FOBS'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

#init MYSQL
mysql = MySQL(app)

@app.route("/", methods=['GET', 'POST'])
def main():
    # form = RegisterForm(request.form)
    # if request.method == 'POST' and form.validate():
    #
    # return render_template('s', form=form)

    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid Credentials. Please try again.'
        else:
            return redirect("/ceo")
    return render_template('homePage.html', error=error)

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
    return render_template('ceo.html')

@app.route("/financial")
def financial():
    return render_template('financial.html')

@app.route("/employee")
def employee():
    return render_template('employee.html')

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
        company = form.company.data
        username = form.username.data
        password = sha256_crypt.encrypt(str(form.password.data))
        role = "ceo"
        # Create cursor
        cur = mysql.connection.cursor()

        cur.execute("INSERT INTO users(username, password, company, role) VALUES(%s, %s, %s, %s)",
                    (username, password, company, role))

        # commit to DB
        mysql.connection.commit()

        # close connection
        cur.close()

        # flash('Your company is now registered and you can login as the CEO', 'success')

        return redirect("/")

    return render_template('signup.html', form=form)



if __name__ == '__main__':
    app.run(debug=True)

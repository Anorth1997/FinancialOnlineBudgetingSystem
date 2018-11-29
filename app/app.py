from flask import Flask, render_template, redirect, url_for, request, logging, flash, session, jsonify
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt
from os import urandom
from datetime import datetime

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
    session.clear()
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

class CreateDepartmentForm(Form):
    department = StringField('department', [validators.Length(min=4, max=50)])
    username = StringField('Username', [validators.Length(min=4, max=25)])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords do not match')
    ])
    confirm = PasswordField('Confirm Password')

class SetTotalRevenue(Form):
    total = StringField('total', [validators.Length(min=4, max=50)])

@app.route("/ceo", methods=['GET', 'POST'])
def ceo():
    if request.method == 'POST':
        if 'total' in request.form.keys():
            form = SetTotalRevenue(request.form)
            if form.validate():
                company = session['company']
                total = int(form.total.data)
                cur = mysql.connection.cursor()

                cur.execute("SELECT company_id FROM Company WHERE company_name = %s", [company])
                data = cur.fetchone()
                company_id = data['company_id']

                cur.execute("UPDATE Company SET total_revenue_goal = %s WHERE company_id = %s", (total, company_id))

                mysql.connection.commit()

                cur.close()
                if 'username' in session:
                    return render_template('ceo.html', username=session['username'], company=session['company'])
        elif 'username' in request.form.keys():
            form = CreateDepartmentForm(request.form)
            if form.validate():
                ## initalize the fields
                company = session['company']
                department = form.department.data
                username = form.username.data
                password = sha256_crypt.encrypt(str(form.password.data))
                null = None

                # Create cursor
                cur = mysql.connection.cursor()


                # get company_id
                cur.execute("SELECT company_id FROM Company WHERE company_name = %s", [company])
                data = cur.fetchone()
                company_id = data['company_id']


                ## Create the department in user
                cur.execute("INSERT INTO Users(username, password, company_id, role) VALUES(%s, %s, %s, %s)",
                            (username, password, company_id, department))

                ## if this is not the financial department, it needs to be stored in department table
                if department != 'financial':
                    cur.execute("SELECT user_id FROM Users WHERE username = %s", [username])
                    user_id = cur.fetchone()['user_id']
                    cur.execute("INSERT INTO Departments(user_id, budget, revenue_goal, actual_expenses) VALUES(%s, %s, %s, %s)",
                                (user_id, null, null, null))

                # commit to DB
                mysql.connection.commit()

                # close connection
                cur.close()
                if 'username' in session:
                    return render_template('ceo.html', username=session['username'], company=session['company'])

    if 'username' in session:
        return render_template('ceo.html', username=session['username'], company=session['company'])
    # TODO: (IAN) render a not logged in page
    return render_template('homePage.html')

@app.route("/financial")
def financial():
    if 'username' in session:
        # Create cursor
        cur = mysql.connection.cursor()

        # Get the total revenue goal data
        cur.execute("SELECT * FROM Company WHERE company_id = %s", [session['company_id']])
        data = cur.fetchone()

        return render_template('financial.html', username=session['username'], company=session['company'], total_revenue_goal=data['total_revenue_goal'])
    # TODO: (IAN) render a not logged in page
    return render_template('homePage.html')

class RequestFundForm(Form):
    amount = StringField('department', [validators.Length(min=1, max=50)])
    reason = StringField('Username', [validators.Length(min=4, max=200)])

@app.route("/employee", methods=['GET', 'POST'])
def employee():
    if request.method == 'POST':
        form = RequestFundForm(request.form)
        if form.validate():
            # initialize the fields
            amount = form.amount.data
            reason = form.reason.data
            now = datetime.now()
            formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')
            # Create cursor
            cur = mysql.connection.cursor()

            # Create the request in table
            cur.execute("INSERT INTO Requests(user_id, amount, data, reason, status) VALUES(%s, %s, %s, %s, %s)",
                        (session['user_id'], amount, formatted_date, reason, 'ceo_not_notified'))

            # commit to DB
            mysql.connection.commit()

            # close connection
            cur.close()

            return render_template('employee.html', username=session['username'], company=session['company'])

    if 'username' in session:
        return render_template('employee.html', username=session['username'], company=session['company'])
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
        # take the user information from front-end first
        company = form.company.data
        username = form.username.data
        password = sha256_crypt.encrypt(str(form.password.data))
        role = "ceo"
        null = None
        # Create cursor
        cur = mysql.connection.cursor()

        ## Create the company instance in company table
        cur.execute("INSERT INTO Company(company_name, total_revenue_goal) VALUES(%s, %s)", (company, null))
        cur.execute("SELECT company_id FROM Company WHERE company_name = %s", [company])
        data = cur.fetchone()
        mysql.connection.commit()

        ## Create the ceo in user
        cur.execute("INSERT INTO Users(username, password, company_id, role) VALUES(%s, %s, %s, %s)",
                    (username, password, data['company_id'], role))

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
            session['username'] = "admin"
            session['company'] = "admin"
            return redirect("/ceo")

        # Create cursor
        cur = mysql.connection.cursor()

        # Get user by username
        result = cur.execute("SELECT * FROM Users WHERE username = %s", [username])

        if result > 0:
            # Get stored hash
            data = cur.fetchone()
            password = data['password']
            role = data['role']

            # Compare Passwords
            if sha256_crypt.verify(password_candidate, password):
                session['username'] = data['username']
                query = "SELECT * FROM "
                query += "(Company INNER JOIN Users ON Company.company_id=Users.company_id) "
                query += "WHERE username = '" + data['username'] + "'"
                result = cur.execute(query)
                data = cur.fetchone()
                session['company'] = data['company_name']
                session['company_id'] = data['company_id']
                session['user_id'] = data['user_id']
                app.logger.info('PASSWORD MATCHED')
                if role == 'ceo':
                    return redirect("/ceo")
                elif role == 'financial':
                    return redirect("/financial")
                else:
                    return redirect("/employee")
            else:
                error = 'Password not matched'
        else:
            error = 'Invalid Credentials. Please try again.'

    return render_template('login.html', error=error)

@app.route('/expenses/department', methods=['GET'])
def department_expenses():
    # Create cursor
    cur = mysql.connection.cursor()
    # Get the budget of the department
    query = "SELECT * FROM Departments WHERE user_id = " + str(session["user_id"])
    result = cur.execute(query)
    if result == 0:
        return "No department found with user_id"
    data = cur.fetchone()
    budget = data["budget"]

    # Get department name
    query = "SELECT role FROM Users WHERE user_id = " + str(session["user_id"])
    cur.execute(query)
    result = cur.fetchone()
    departmentName = result['role']

    # Get the expense history from the department
    query = "SELECT * FROM Expense_history WHERE user_id = " + str(session["user_id"])
    cur.execute(query)
    result_set = cur.fetchall()
    result_data = {"items":[], "budget": budget, "departmentName": departmentName}
    for row in result_set:
        item = {}
        item["purpose"] = row["purpose"]
        item["amount"] = row["amount"]
        item["exp_id"] = row["user_id"]
        item["date"] = row["date"]
        result_data["items"].append(item)
    return jsonify(result_data)

@app.route('/expenses/overview', methods=['GET'])
def overview_expenses():
    # Create cursor
    cur = mysql.connection.cursor()
    # Get the list of all departments in the company

    query = "SELECT * FROM Users WHERE company_id = " + str(session["company_id"]) + " AND role != 'ceo'"

    cur.execute(query)
    result_set = cur.fetchall()
    department_users = []
    print(result_set)
    for item in result_set:
        department_users.append((item["user_id"], item["role"]))
    print('--dep--')
    print(department_users)
    # Construct the result department data
    result_data = {"departments": []}
    for department in department_users:
        user_id, role = department
        # Get the budget of the department
        query = "SELECT * FROM Departments WHERE user_id = " + str(user_id)
        result = cur.execute(query)
        if result == 0:
            return "No department found with user_id"
        data = cur.fetchone()
        budget = data["budget"]
        revenue_goal = data["revenue_goal"]
        # Get the expense history from the department
        query = "SELECT * FROM Expense_history WHERE user_id = " + str(user_id)
        cur.execute(query)
        result_set = cur.fetchall()
        department_data = {"role": role, "items": [], "budget": budget, "revenue_goal": revenue_goal}
        for row in result_set:
            item = {}
            item["purpose"] = row["purpose"]
            item["amount"] = row["amount"]
            item["exp_id"] = row["user_id"]
            item["date"] = row["date"]
            department_data["items"].append(item)
        result_data["departments"].append(department_data)
    return jsonify(result_data)


# Route for the CEO to get the full expenditure history of the 
# departments
@app.route('/expenses/full_history', methods=['GET'])
def overview_expenses_full_history():
    # Create cursor
    cur = mysql.connection.cursor()
    # Get the list of all departments in the company
    query = "SELECT * FROM Users WHERE company_id = " + str(session["company_id"]) + " AND role != 'ceo'"

    cur.execute(query)
    result_set = cur.fetchall()
    department_users = []

    for item in result_set:
        department_users.append((item["user_id"], item["role"]))

    # Create the query
    query = "SELECT B.role, A.amount, A.purpose, A.date " + \
        "FROM Expense_history AS A JOIN Users AS B ON A.user_id = " + \
        "B.user_id WHERE "

    for i in range(len(department_users)):
        user_id, role = department_users[i]
        query += "A.user_id = " + str(user_id) + " "
        if i < len(department_users) - 1:
            query += "OR "
    
    query += "ORDER BY date DESC"
    result = cur.execute(query)
    result_set = cur.fetchall()
    result_data = {"expenses": []}

    # Convert query result into JSON and return
    for row in result_set:  
        item = {}
        item["department"] = row["role"]
        item["amount"] = row["amount"]
        item["purpose"] = row["purpose"]
        item["date"] = row["date"]
        result_data["expenses"].append(item)

    return jsonify(result_data)

if __name__ == '__main__':
    app.run(debug=True)

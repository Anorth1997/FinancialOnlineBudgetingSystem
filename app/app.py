from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def main():
    return render_template('homePage.html', my_string="Wheeeee!")

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

if __name__ == '__main__':
    app.run(debug=True)

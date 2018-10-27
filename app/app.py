from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def main():
    return render_template('signup.html', my_string="Wheeeee!")

@app.route("/financial")
def ceo():
    return render_template('financial.html')

if __name__ == '__main__':
    app.run(debug=True)

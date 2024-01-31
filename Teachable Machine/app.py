from flask import Flask, render_template

app = Flask(__name__)

# the homepage for your site will be at the route below
@app.route('/')
def hello_world():
    return render_template("index.html")

# Rendering a html template
# @app.route('/home')
# def home():
#     return render_template("home.html")
#
# @app.route('/index')
# def index():
#     return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, render_template

app = Flask(__name__)

# the homepage for your site will be at the route below
@app.route('/')
def hello_world():
    return """
    <h1>Hello World!</h1> 
    <br />
    Try these links: <br /> 
     - <a href='/home'>home</a><br />
    """

# Rendering a html template
@app.route('/home')
def home():
    return render_template("home.html")


if __name__ == '__main__':
    app.run(debug=True)
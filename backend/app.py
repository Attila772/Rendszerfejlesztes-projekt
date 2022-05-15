from api import create_app
from api import db
app = create_app()


if __name__ == '__main__':
    app.run(debug=False)
    


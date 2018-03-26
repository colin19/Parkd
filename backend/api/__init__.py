import flask
import flask_restless
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.schema import CreateTable
from sqlalchemy import *
from flask_cors import CORS
from flask_restful import Api

app = flask.Flask(__name__)
api = Api(app)

# Create our SQLAlchemy DB engine
engine = create_engine('mysql+mysqlconnector://parkdteam:foodtrucks'
                       + '@parkd-mysql.cthwmo3nyii9.us-east-2.rds.amazonaws.com:3306/parkd_sqlalchemy')
Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)
session = scoped_session(Session)

Base = declarative_base()
Base.metadata.bind = engine

# Import all models to add them to Base.metadata
from api.models.truck import Truck
from api.models.truck_review import Truck_Review
from api.models.truck_photo import Truck_Photo
from api.models.park import Park
from api.models.park_review import Park_Review
from api.models.park_photo import Park_Photo

Base.metadata.create_all()

print('Table Schema: ')
print(CreateTable(Truck.__table__).compile(engine))
print(CreateTable(Truck_Photo.__table__).compile(engine))
print(CreateTable(Truck_Review.__table__).compile(engine))
print(CreateTable(Park.__table__).compile(engine))
print(CreateTable(Park_Photo.__table__).compile(engine))
print(CreateTable(Park_Review.__table__).compile(engine))

manager = flask_restless.APIManager(app, session=session)

# Register flask-restless blueprints to instantiate CRUD endpoints
from api.controllers import park_api_blueprint, truck_api_blueprint, truck_photo_api_blueprint

app.register_blueprint(truck_api_blueprint)
app.register_blueprint(park_api_blueprint)
app.register_blueprint(truck_photo_api_blueprint)

# Load Resources
from api.resources.parkList import ParkList
from api.resources.truckList import TruckList
api.add_resource(ParkList, '/parks')
api.add_resource(TruckList, '/trucks')

cors = CORS(app, resources={r"/*": {"origins": "*"}})

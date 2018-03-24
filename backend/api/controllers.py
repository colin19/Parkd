from api import manager
from api.models.park import Park
from api.models.truck import Truck
from api.models.truck_photo import Truck_Photo


truck_api_blueprint = manager.create_api_blueprint(Truck, methods=['GET'])
truck_photo_api_blueprint = manager.create_api_blueprint(Truck_Photo, methods=['GET'])

park_api_blueprint = manager.create_api_blueprint(Park, methods=['GET'])

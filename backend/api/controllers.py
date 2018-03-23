from api import app, s, manager
from api.models.park import Park
from api.models.truck import Truck


truck_api_blueprint = manager.create_api_blueprint(Truck, methods=['GET', 'PATCH', 'POST', 'DELETE'])
park_api_blueprint = manager.create_api_blueprint(Park, methods=['GET', 'PATCH', 'POST', 'DELETE'])
from api import manager
from api.models.park import Park
from api.models.truck import Truck
from api.models.truck_photo import Truck_Photo


truck_api_blueprint = manager.create_api_blueprint(Truck, methods=['GET']
                                                   , results_per_page=30, max_results_per_page=100)

truck_photo_api_blueprint = manager.create_api_blueprint(Truck_Photo, methods=['GET']
                                                         , results_per_page=30, max_results_per_page=100)

park_api_blueprint = manager.create_api_blueprint(Park, methods=['GET']
                                                  , results_per_page=30, max_results_per_page=100)

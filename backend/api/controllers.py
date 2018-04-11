from api import manager
from api.models.park import Park
from api.models.truck import Truck
from api.models.truck_photo import Truck_Photo
from api.models.park_photo import Park_Photo


truck_api_blueprint = manager.create_api_blueprint(Truck, methods=['GET']
                                                   , url_prefix=''
                                                   , results_per_page=20, max_results_per_page=30)

truck_photo_api_blueprint = manager.create_api_blueprint(Truck_Photo, methods=['GET']
                                                         , url_prefix=''
                                                         , results_per_page=20, max_results_per_page=30)

park_api_blueprint = manager.create_api_blueprint(Park, methods=['GET']
                                                  , url_prefix=''
                                                  , results_per_page=20, max_results_per_page=30)

park_photo_api_blueprint = manager.create_api_blueprint(Park_Photo, methods=['GET']
                                                        , url_prefix=''
                                                        , results_per_page=20, max_results_per_page=30)

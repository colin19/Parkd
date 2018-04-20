from api import manager
from api.models.park import Park
from api.models.truck import Truck
from api.models.truck_photo import Truck_Photo
from api.models.park_photo import Park_Photo

# register controller for Truck Model
truck_api_blueprint = manager.create_api_blueprint(Truck, methods=['GET']
                                                   , url_prefix=''
                                                   , results_per_page=20, max_results_per_page=30)
# register controller for Truck Photo Model
truck_photo_api_blueprint = manager.create_api_blueprint(Truck_Photo, methods=['GET']
                                                         , url_prefix=''
                                                         , results_per_page=20, max_results_per_page=30)
# register controller for Park Model
park_api_blueprint = manager.create_api_blueprint(Park, methods=['GET']
                                                  , url_prefix=''
                                                  , results_per_page=20, max_results_per_page=30)
# register controller for Park Photo Model
park_photo_api_blueprint = manager.create_api_blueprint(Park_Photo, methods=['GET']
                                                        , url_prefix=''
                                                        , results_per_page=20, max_results_per_page=30)

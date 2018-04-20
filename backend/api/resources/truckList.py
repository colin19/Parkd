from flask_restful import Resource

from api.models.truck import Truck
from api import session


class TruckList(Resource):
    """
        A Resource return a lighter list of all the truck
    """

    # define the GET method
    def get(self):
        trucks_list = []

        trucks = session.query(Truck).limit(20).all()
        for truck in trucks:
            trucks_list.append(truck.to_truck_list_item())

        return {"objects": trucks_list}

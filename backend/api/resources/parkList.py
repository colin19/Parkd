from flask_restful import Resource

from api.models.park import Park
from api import session

class ParkList(Resource):

    # define the GET method
    def get(self):
        parks_list = []

        parks = session.query(Park).limit(30).all()
        for park in parks:
            parks_list.append(park.to_park_list_item())

        return {"objects": parks_list}

from flask_restful import Resource

from api.models.park import Park
from api import session

import timeit


class ParkList(Resource):
    """
    A Resource return a lighter list of all the park
    """

    # define the GET method
    def get(self):
        start_time = timeit.default_timer()

        parks_list = []

        # add all the parks basic info into the list
        parks = session.query(Park).limit(20).all()
        for park in parks:
            parks_list.append(park.to_park_list_item())

        end_time = timeit.default_timer()
        print('GET park list time: ' + str(end_time-start_time))

        return {"objects": parks_list}

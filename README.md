# Parkd
Stalk food trucks

## How to run our tests
### Frontend (Selenium)
Enter the `frontend` directory, install the packages, then spin up a local Node server with `npm run start` or `yarn start` (on port 3000 if that's not the default). Then run `frontend/guitests.py`. The frontend connects to our remote database automatically so there's no need to run a Flask instance locally.
### Frontend (Mocha)
Enter the `frontend` directory, install the packages, then run the test suite with `npm run test` or `yarn test`.
### Backend (unittest)
Install the Python requirements from `docker/requirements.txt`. Then run `backend/tests.py`.
### Backend (Postman)
Run `newman run Postman.json` from the root.

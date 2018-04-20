# Parkd

## How to deploy our frontend
### Development Build
Enter the `frontend` directory, run `npm install`. It will install all the necessary package. Then, run `npm start`. It will launch the development build.
### Deployment Build
Enter the `frontend` directory, run `npm install`. It will install all the necessary package. Then, run `npm run build`. And then, run `serve -s build`

## How to deploy our backend
Install the Python requirements from `docker/requirements.txt`. Then run `backend/main.py`.



## How to run our tests
### Important
Before running the Selenium tests, start an instance of the Node server on port 3000 in a different console window.

### Frontend (Selenium)
Enter the `frontend` directory, install the packages, then spin up a local Node server with `npm run start` or `yarn start` (on port 3000 if that's not the default). Then run `frontend/guitests.py`. The frontend connects to our remote database automatically so there's no need to run a Flask instance locally.

### Frontend (Mocha)
Enter the `frontend` directory, install the packages, then run the test suite with `npm run test` or `yarn test`.

### Backend (unittest)
Install the Python requirements from `docker/requirements.txt`. Then run `backend/tests.py`.

### Backend (Postman)
Run `Postman.json` with `newman` or similar.
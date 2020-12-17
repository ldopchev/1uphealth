# 1upDemo

To setup you will need mongodb. I store some variables in express-session which is persisted in mongo (not ideal).
In addition, I had to npm install nodemon -g (only locally did not work for me). So setup is easy as in 1,2,3

- Start mongo on localhost:27017
- cd in project directory nodemon index.js 
- cd client npm start

react is proxied to port 5000 so only relative urls for the apis will work, but if you want to open the server from a browser localhost:5000

Once it is running, click Register. This will register the user which is hardcoded on the server. 
Connect will make a series of API calls to get code, exchange for token and redirect to EHR auth
Get Patient Url will retrieve the patient $everything url 
$Everything will fetch the data and display. 

Pagination is added to the bottom of the page.


# Added Docker Compose for easier setup

before running docker-compose remove "proxy": "http://localhost:5000" from client/package-json

- docker-compose up -d 

# WebPulse

- a tool used to test REST functions also has additional function for checking if a server is up or not.

## Documentation

* Team Name: The Searchers

* The Project name: WebPulse.

* The Team members: Mohammed Awadallah, Osama Abdallah, Idrees Almasri, Saad AlZoubi,  Marah AlRefai, Marah Jaradat.

* Problem Domain and the solution: The need for an API testing application through an HTTP client that tests HTTP requests while providing support to serve and help the user, from there came our project which dissect RESTful APIs made by others or test ones that have been made by the user personaly while being able to recivie support from a qualified staff.

### User Story:

1. as a User i want to be able to test the REST functions and see them in action realtime .
2. as a User i want to be able to check if a certain website or server is down or not .
3. as an authorized User i want to be able to connect with the customer service team in case i run into some issues .
4. as a User i want a simple but effecient Ui .
5. as a User i want a safe and reliable experience .

### Documentation for your API (endpoints, request and response for each end point ):

1. Postman Clone:,

Start snowpack: Using npm run start.

localhost:8080

2. WebPulse: 

Server Start: nodemon

localhost:3000

**/**: 2 types of request one to render the home page and the second one to check if users url of choosing is live and responds with a status of either 200 if live or 404 if it doesnt exsist.

**/register**: 2 types of requests one to open the signup form for the user and another to create user by applying the post, and it responds by forcing you to correctly register otherwise user returns to the same end point and when the form is complete takes you to the login page.

**/login**: 2 types of requests one to open the signin form and the second is when user enters his email and password it authincates the users email and passwrod to check if available or not if so takes him to the support end point where a chat is available for help and if email or passwrod are wrong returns an error mesaage.

**/support**: a single type of request which takes us to the support chat page and it responds with the messages being shared between the user and support staff, a middleware is present to verify if user is signed in prior to allowing access to the chat.

**/logout**: single type of request using get which responds by exiting the user and returning to the homepage.


### The final Database diagram:

![database diagram](https://i.ibb.co/3zHgNKG/database-image-mid-proj.jpg)


### Whiteboard planning of the wireframe.

#### Not Signed in

![not signed](https://i.ibb.co/CHPpJC2/not-signedin.png)

#### Signed in
![signed in](https://i.ibb.co/VCP7w7j/signedIn.png)

### Packages : 
* Express : to setup our server 
* Nodemon : to start the server 
* Morgan : For loggers 
* CodeMirror : to setup the code editor 
* ejs and bootsrap : for the front end 
* jsonwebtoken , bcrypt and cookie parser : for authentication 
* axios : for fetching the requests from the postman clone 
* http (built in)  : for getting the responsed in webpulse
* socket.io : to setup the support chat 
* pg , sqlite3 , sequleize : to setup the database 
* cors :  allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.


### Resources : 

|id |url
|--|--|
|1  |  [JsonplaceHolder](https://jsonplaceholder.typicode.com/)|
|2|[bootstrap](https://react-bootstrap.github.io/)|
|3|[moesif](https://www.moesif.com/blog/technical/logging/How-we-built-a-Nodejs-Middleware-to-Log-HTTP-API-Requests-and-Responses/)|
|4|[better programming](https://betterprogramming.pub/simple-chat-application-in-node-js-using-express-mongoose-and-socket-io-ee62d94f5804)|
|5|[scaleway](https://www.scaleway.com/en/docs/tutorials/socket-io/)|
|6|[web dev](https://web.dev/add-manifest/#:~:text=The%20web%20app%20manifest%20is,when%20the%20app%20is%20launched.)|

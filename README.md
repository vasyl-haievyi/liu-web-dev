# TDDD27_2022_project

## Description

The project is an online markedplace. 

Users can search for different items using text and categories. 

Registered users can add items to their followed items list and write a message in a chat with the seller.

If a seller and a user are both online, they can have live chat. 

Registered users can also add new items. One image is allowed to be added to the item.

Logged in users can log out at any time, as well as access their email and ID.

## Frameworks

## Backend: 
Go programming language

For REST API routing I decided to use Chi framework, as it has good compatibility with standard go library and other Go frameworks.

For authentication I use Authboss ready solution, as it has many available modules.

I use MongoDB as a storage and official Mongo driver for Go.

For websockets handling I use Melody framework, because it is much easier to use than popular gorilla/websockets.


## Frontend:
React Framework for building UI

Axios for handling HTTP requests and responses

React Bootstrap for ready components based on bootstrap framework

Formik for form validation

React Router for client routing

React Use Websocket for working with websockets

React Redux for handling global application state


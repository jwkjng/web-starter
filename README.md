# Web Template
This is a simple web template that leverages up-to-date frameworks and libs with [React.js](https://facebook.github.io/react) being the main driver on the front end.

## Get Started
### Install
```javascript
npm install
```

### Run
```javascript
npm start
```
Browse to *http://localhost:3333* and *http://localhost:3333/2* for store 2.


## Implementation

The example included in the source is a simple coffee store e-commerce site. The app uses Relay to communicate with the React components and GraphQL to retrieve data back and forth.

The example includes Coffee Store which has a list of coffee items. This demonstrates the parent child relationship in Relay. Each coffee item has a Buy button to show how mutations can be used.



## Architecture
### Client
* [React.js](https://facebook.github.io/react)
* [Relay](https://facebook.github.io/relay/)
* [React-Router-Relay](https://github.com/relay-tools/react-router-relay)

### Server
* `Express`
* [GraphQL](https://facebook.github.io/graphql/)


### CSS
* `Sass`


### Build
* `Webpack`
* `Babel`
* `Gulp`

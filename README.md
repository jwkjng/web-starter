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

## Implementation

The example included in the source is a simple coffee store e-commerce site. The app uses Relay to communicate with the React components and GraphQL to retrieve data back and forth.

The example includes Coffee Store which has a list of coffee items. This demonstrates the parent child relationship in Relay. Each coffee item has a Buy button to show how mutations can be used.

The quick breakdown of the composition:
- main.jsx
  - App.jsx
  - CoffeeList.jsx
    - Coffee.jsx
      - BuyButton.jsx

### CoffeeList
`CoffeeList` effectively represents a coffee store with the store name and a list of coffee items it's serving. So it needs to maintain a list of `Coffee` components and a list of purchases made at the store.

### Coffee
The `Coffee` component is an individual coffee item with the name, price, and a buy button.

### BuyButton
The `BuyButton` component is tied to a single `Coffee` item and allows for the buy mutation to kick in. Once the button is clicked, it uses the Relay connection with the store's purchases to tell the Relay store that there is a new item in the purchases of the store.

### Schema
Essentially, for a simple web application, Relay expects three main things to be defined in the schema - `Models`, `Connections`, `Mutations and Query`

* Models are the front-end domain-specific representations of data models and probably some more. I'd like to refer to these as domain models.
* Connections are the relationships between Models. In this example, a *Store* would need to know how they are tied to a list of *Coffee* items.
* Mutations are a bit verbose, and I hope Relay changes how we need to define each mutation in the future. You basically need to represent how domain models will be affected by certain *actions* such as "Buy Button" clicks and store changes. It is likely that even a simple component could have multiple mutation scenarios such as Add, Remove, Update, and Delete and to represent each mutation in schema-like js code is a bit cumbersome and time-consuming. Also, there are some moving parts that could go wrong without getting a good insight into the error stack.
* Queries are generally simple since there is usually a couple of scenarios to get the top-level data and the rest is hierarchical. That's what's really nice about React and Relay.

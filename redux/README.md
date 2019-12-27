# Understanding Redux

Author: Ohans Emmanuel  
URL: <https://gumroad.com/l/Ocgbb>  
Tweet hashtag: #UnderstandingRedux  
Twitter account: <https://twitter.com/OhansEmmanuel>

## Basic principles

- Redux is a predictable state container for JavaScript apps.
- The createStore factory function from Redux is used to create a Redux STORE, the single source of truth
- The Reducer is the only mandatory argument passed into createStore()
- A REDUCER is just a function. A function that takes in two parameters. The first being the STATE of the app, and the other being an ACTION. The only way to change the state is to dispatch an action  to the REDUCER. An action always has a type field that describes the action you want to perform.
- A Reducer always returns the NEW STATE of your application.
- The INITIAL STATE of your application, initialState is the second argument passed into the createStore function call.
- Store.getState() will return the current state of your application. Where Store is a valid Redux STORE.

## Further resources

- [Dan Abramov talk](https://www.youtube.com/watch?v=xsSnOQynTHs&feature=youtu.be) and [Medium's article](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
- <https://github.com/erikras/ducks-modular-redux>
- [Rekit](http://rekit.js.org/#)
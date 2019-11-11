const isPromise = (payload) =>
    (typeof(payload) === "object" || typeof(payload) === "function")
        && typeof(payload.then) === "function";

/**
 * Redux data stores can be extended to support asynchronous operations using a middleware function,
 * which inspects the actions that are sent to the data store and alters them before they are processed.
 * Here the middleware will wait until the Promise is resolved and then pass on the action using the outcome
 * of the Promise as the payload. */        
export const asyncActions = () => (next) => (action) => {
    if (isPromise(action.payload)) {
        action.payload.then(result => next({...action, payload: result}));
    } else {
        next(action)
    }
}
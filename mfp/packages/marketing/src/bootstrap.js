import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (element, { onNavigate, defaultHistory } ) => {

    // this says if we were provided a defaultHistory then use it, otherwise
    // call createMemoryHistory() to create a history object
    const history = defaultHistory || createMemoryHistory();

    // use the history object's event listener called listen
    // whenever the url changes, call the callback function onNavigate to notify the Container of a url change
    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(<App history={history} />,element);

    return {
        onParentNavigate({pathname: nextPathname}){

            const { pathname } = history.location;

            console.log("In Marketing component bootstrap.js: Container just navigated")
            console.log(location);

            if (pathname !== nextPathname){
                history.push(nextPathname);
            }
        }
    };
};


// If we are in development and running in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
    // use an id that will only exist in marketing component and not in the container
    const devRoot = document.getElementById("_marketing-dev-root");

    // if the element exists, then mount function 'devRoot'
    if (devRoot) {
        mount(devRoot,{defaultHistory: createBrowserHistory()});
    }
}

// We are running through container and we should export the mount function
export { mount };



import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Mount function to start up the app
const mount = (element) => {
    ReactDOM.render(<App />,element);
};


// If we are in development and running in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
    // use an id that will only exist in marketing component and not in the container
    const devRoot = document.getElementById("_marketing-dev-root");

    // if the element exists, then mount function 'devRoot'
    if (devRoot) {
        mount(devRoot);
    }
}

// We are running through container and we should export the mount function
export { mount };



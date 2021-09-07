import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// inside here create a React component and export it
export default () => {
    // ref is a reference to the html element that is displayed on the screen
    const ref = useRef(null);

    // this history object is the history that is being used in our container
    // we just need to add the navigation path to this history object
    // history is a browser history object
    const history = useHistory();

    // we need to ensure that the mount function only gets called one time, when
    // this React component is first displayed on the screen
    // The useEffect hook is used to make sure the mount function is only called once.
    // - ref.current is a reference to the html element
    useEffect(() => {
        // here is where our container calls the mount function for our marketing application
        // onNavigate is a callBack function that Marketing will use to notify the
        // container of a navigation change
        const { onParentNavigate } = mount(ref.current, {
            // pathname is received back from Marketing during the callback
            // we will destructure pathname to the nextPathname variable
            onNavigate: ({ pathname: nextPathname }) => {

                // this will be the path that we are currently at in the Container App
                const { pathname } = history.location;

                console.log("The container noticed a navigation change in Marketing")
                console.log("In MarketingApp.js nextPathname= " + nextPathname  );
                console.log(nextPathname);

                // they are not the same, it means we need to do navigation
                //    - pathname = where we are currently at
                //    - nextPathname = where we are being told to navigate to
                // this code is to prevent an endless loop of path changes 
                if ( pathname !== nextPathname ) {
                // this says, hey history object, we want to navigate to this path
                    history.push(nextPathname);
                }
            }
        });

        // whenever history detects a change to the url, we want to call onParentNavigate
        history.listen(onParentNavigate);

    },[]);   // the 2nd arg of an empty array tells useEffect to only run this code once


    return <div ref = {ref} />;
};

import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

// inside here create a React component and export it
export default () => {
    // ref is a reference to the html element that is displayed on the screen
    const ref = useRef(null);

    // we need to ensure that the mount function only gets called one time, when
    // this React component is first displayed on the screen
    // The useEffect hook is used to make sure the mount function is only called once.
    // - ref.current is a reference to the html element
    useEffect(() => {
        mount(ref.current);
    });    


    return <div ref = {ref} />;
};

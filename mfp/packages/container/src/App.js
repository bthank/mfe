import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName     } from '@material-ui/styles';
//import { mount } from 'marketing/MarketingApp';
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';

// This will force React to build CSS class names with the prefix of 'co' instead
// of 'jss' for this container component.
// This is used to avoid CSS class naming collisions across components. 
// This is available thru material-ui StylesProvider.
const generateClassNamePrefix = createGenerateClassName({
    productionPrefix: 'co',
});

//console.log(mount)

export default () => {
    return (
            <BrowserRouter>     
                <StylesProvider generateClassName={generateClassNamePrefix}>
                    <div>
                        <Header />
                        <MarketingApp />
                    </div>
                </StylesProvider>  
            </BrowserRouter>
            ); 
    
    
};
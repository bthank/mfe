import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

// This will force React to build CSS class names with the prefix of 'ma' instead
// of 'jss' for this marketing component.
// This is used to avoid CSS class naming collisions across components. 
// This is available thru material-ui StylesProvider.
const generateClassNamePrefix = createGenerateClassName({
    productionPrefix: 'ma',
});

// this receives the history object as a property and will provide history to the
// Router component
export default ( {history} ) => {
    return <div>
                <StylesProvider generateClassName={generateClassNamePrefix}>
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/pricing" component={Pricing} />
                            <Route path="/" component={Landing} />
                        </Switch>
                    </Router>
                </StylesProvider>
            </div>
}
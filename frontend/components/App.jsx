import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import '../css/style.scss';


//components
import Home from './Home.jsx';
import Test from './Test.jsx';

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/test" component={Test}></Route>
            </Switch>
        );
    }
}
export default App;
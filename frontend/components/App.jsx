import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import '../css/style.scss';


//components
import Home from './Home.jsx';
import Input from './Input.jsx';
import Test from './Test.jsx';
import Header from './Header.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/input" component={Input}></Route>
                    <Route exact path="/test" component={Test}></Route>
                </Switch>
            </div>
        );
    }
}
export default App;
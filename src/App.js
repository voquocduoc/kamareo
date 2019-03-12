import React, {Component} from "react";
import * as _ from 'lodash';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
const history = createHistory();
import StoreDetail from "./components/StoreDetail";
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <div className="container">
                        <Route path="/stores/:id" component={StoreDetail}/>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;

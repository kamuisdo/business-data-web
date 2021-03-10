import './App.less';
import Login from "./pages/login/Login";
import Index from "./pages/Index/Index";
import NotFound from "./pages/NotFound/NotFound";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import 'antd/dist/antd.css';

function App() {
    return (
        <Switch>
            <Redirect exact from="/" to="/index"/>
            <Route path="/login">
                <Login/>
            </Route>

            <Route path="/index">
                <Index/>
            </Route>

            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );
}

export default App;

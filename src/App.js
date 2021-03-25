import './App.less';
import Login from "./pages/login/Login";
import Index from "./pages/Index/Index";
import Demo from "./pages/Demo";
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
            <Route path="/demo">
                <Demo/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );
}

export default App;

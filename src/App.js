import './App.less';
import Login from "./pages/login/Login";
import Demo from "./pages/Demo";
import OverviewPage from "./pages/Overview";
import OnlineRateSinglePage from './pages/OnlineRate_Single'
import OnlineRateMulti from "./pages/OnlineRate_Multi";
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
            <Redirect exact from="/" to="/overview"/>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/overview">
                <OverviewPage/>
            </Route>
            <Route path="/online-rate-single">
                <OnlineRateSinglePage/>
            </Route>
            <Route path="/online-rate-multi">
                <OnlineRateMulti/>
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

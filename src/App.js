import './App.less';
import Login from './pages/Login'
import OverviewPage from "./pages/Overview";
import OnlineRateSinglePage from './pages/OnlineRate_Single'
import OnlineRateMulti from "./pages/OnlineRate_Multi";
import EnergySinglePage from "./pages/Energy_Single";
import EnergyMultiPage from "./pages/Energy_Multi";
import TimeSinglePage from "./pages/Time_Single";
import TimeMultiPage from "./pages/Time_Multi";
import HabitsSinglePage from "./pages/Habits_Single";
import HabitsMultiPage from "./pages/Habits_Multi";
import ProjectQueryPage from "./pages/ProjectQuery";
import AirQualityPage from "./pages/AirQuality";
import NotFound from "./pages/NotFound/NotFound";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import 'antd/dist/antd.css';
import store from 'store'
import storeKeyName from "./utils/storeKeyName";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !!store.get(storeKeyName.token) ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

function App() {
    return (
        <Switch>
            <Redirect exact from="/" to="/overview"/>
            <Route path="/login">
                <Login/>
            </Route>
            {/*<PrivateRoute path="/overview" component={OverviewPage} />*/}
            <Route path="/overview">
                <OverviewPage/>
            </Route>
            <PrivateRoute path="/online-rate-single" component={OnlineRateSinglePage} />

            <PrivateRoute path="/online-rate-multi" component={OnlineRateMulti} />

            <PrivateRoute path="/energy-single" component={EnergySinglePage} />

            <PrivateRoute path="/energy-multi" component={EnergyMultiPage} />

            <PrivateRoute path="/time-single" component={TimeSinglePage} />

            <PrivateRoute path="/time-multi" component={TimeMultiPage} />

            <PrivateRoute path="/habits-single" component={HabitsSinglePage} />

            <PrivateRoute path="/habits-multi" component={HabitsMultiPage} />

            <PrivateRoute path="/project-query" component={ProjectQueryPage} />

            <PrivateRoute path="/air-quality" component={AirQualityPage} />

            <PrivateRoute component={NotFound} />

        </Switch>
    );
}

export default App;

import './App.less';
import Login from "./pages/login/Login";
import Demo from "./pages/Demo";
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
            <Route path="/energy-single">
                <EnergySinglePage/>
            </Route>
            <Route path="/energy-multi">
                <EnergyMultiPage/>
            </Route>
            <Route path="/time-single">
                <TimeSinglePage/>
            </Route>
            <Route path="/time-multi">
                <TimeMultiPage/>
            </Route>
            <Route path="/habits-single">
                <HabitsSinglePage/>
            </Route>
            <Route path="/habits-multi">
                <HabitsMultiPage/>
            </Route>
            <Route path="/project-query">
                <ProjectQueryPage/>
            </Route>
            <Route path="/air-quality">
                <AirQualityPage/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );
}

export default App;

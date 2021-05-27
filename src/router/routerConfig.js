import Login from '../pages/Login'
import OverviewPage from "../pages/Overview";
import OnlineRateSinglePage from '../pages/OnlineRate_Single'
import OnlineRateMulti from "../pages/OnlineRate_Multi";
import EnergySinglePage from "../pages/Energy_Single";
import EnergyMultiPage from "../pages/Energy_Multi";
import TimeSinglePage from "../pages/Time_Single";
import TimeMultiPage from "../pages/Time_Multi";
import HabitsSinglePage from "../pages/Habits_Single";
import HabitsMultiPage from "../pages/Habits_Multi";
import ProjectQueryPage from "../pages/ProjectQuery";
import AirQualityPage from "../pages/AirQuality";
import NotFound from "../pages/NotFound/NotFound";

export default [
    {
        path:'/login',
        component:Login
    },
    {
        path:'/overview',
        component:OverviewPage,
        auto:true
    },
    {
        path:'/online-rate-single',
        component:OnlineRateSinglePage,
        auto:true
    },
    {
        path:'/online-rate-multi',
        component:OnlineRateMulti,
        auto:true
    },
    {
        path:'/energy-single',
        component:EnergySinglePage,
        auto:true
    },
    {
        path:'/energy-multi',
        component:EnergyMultiPage,
        auto:true
    },
    {
        path:'/time-single',
        component:TimeSinglePage,
        auto:true
    },
    {
        path:'/time-multi',
        component:TimeMultiPage,
        auto:true
    },
    {
        path:'/habits-single',
        component:HabitsSinglePage,
        auto:true
    },
    {
        path:'/habits-multi',
        component:HabitsMultiPage,
        auto:true
    },
    {
        path:'/project-query',
        component:ProjectQueryPage,
        auto:true
    },
    {
        path:'/air-quality',
        component:AirQualityPage,
        auto:true
    },
    {
        path:'/404',
        component:NotFound,
        auto:true
    }
]
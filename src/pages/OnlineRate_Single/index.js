import React from "react";
import PageLayout from "../Layout";
import SearchForm from "../../components/SearchForm";
import AreaSelector from "../../components/AreaSelector";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import TimeUnitSelector from "../../components/TimeUnitSelector";
import TypeSelector from "../../components/TypeSelector";
import * as api from '../../api/onlineCountSingle'
import OnlineCountBarChart from "./OnlineCountBar";
import OnlineRateChart from "./OnlineRateChart";
import NoChart from "../../components/NoChart";

export default class OnlineRateSinglePage extends React.Component{

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this)
        this.state = {
            formData:null
        }

    }

    handleSearch(value){
        this.setState({
            formData:value
        })
    }

    render() {
        let { formData } = this.state;
        return (
            <PageLayout title="在线数量统计分析">
                <div style={{display:'block'}}>
                    <SearchForm onFinish={this.handleSearch}>
                        <div className="searchForm-row">
                            <TypeSelector required/>
                            <AreaSelector />
                        </div>
                        <div className="searchForm-row">
                            <TimeRangeSelector required/>
                        </div>
                        <div className="searchForm-row">
                            <TimeUnitSelector required/>
                        </div>

                    </SearchForm>
                </div>
                <div className="chart-box">
                    { formData===null ? <NoChart />: <OnlineCountBarChart requestFn={api.onlineCountBar} query={formData}/>}
                </div>
                <div className="chart-box">
                    { formData===null ? <NoChart />: <OnlineRateChart requestFn={api.getOnlineRateLine} query={formData}/>}
                </div>
            </PageLayout>

        )
    }
}
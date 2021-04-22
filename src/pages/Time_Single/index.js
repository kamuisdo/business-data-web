import React from 'react'
import SearchForm from "../../components/SearchForm";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import TimeUnitSelector from "../../components/TimeUnitSelector";
import ProjectCascadeSelector from "../../components/ProjectCascadeSelector";
import NoChart from "../../components/NoChart";
import PageLayout from "../Layout";
import * as api from '../../api/runtime'
import RunTimeSingleBarChart from "./RunTimeSingleBartChart";
import RunTimeHoursBarChart from "./RunTimeHoursBarChart";

export default class TimeSinglePage extends React.Component{

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
        let {formData} = this.state;
        return (
            <PageLayout title="单物件运转统计">
                <div style={{display:'block'}}>
                    <SearchForm onFinish={this.handleSearch}>
                        <ProjectCascadeSelector />
                        <div className="searchForm-row">
                            <TimeRangeSelector required/>
                        </div>
                        <div className="searchForm-row">
                            <TimeUnitSelector required/>
                        </div>

                    </SearchForm>
                </div>
                <div className="chart-box">
                    { formData===null ? <NoChart />: <RunTimeSingleBarChart requestFn={api.getRunTimeBarChart} query={formData} />}
                </div>
                <div className="chart-box">
                    { formData===null ? <NoChart />: <RunTimeHoursBarChart requestFn={api.getRunTimeHours} query={formData} />}
                </div>
            </PageLayout>
        )
    }
}
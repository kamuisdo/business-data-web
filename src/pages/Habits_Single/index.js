import React from 'react'
import SearchForm from "../../components/SearchForm";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import TimeUnitSelector from "../../components/TimeUnitSelector";
import ProjectCascadeSelector from "../../components/ProjectCascadeSelector";
import NoChart from "../../components/NoChart";
import PageLayout from "../Layout";
import * as api from '../../api/habits'
import { getEnergyBarChart } from '../../api/energy'
import HabitsSingleChart from "./HabitsSingleChart";

export default class HabitsSinglePage extends React.Component{

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
        // 合并电量
        // let getEnergyAndHabits = (query)=>{
        //     return Promise.all([
        //         getEnergyBarChart(query).then((data)=>{ return { energy:data } }),
        //         api.getHabitsSingleLine(query).then((data)=>{ return { habit:data } })
        //     ])
        // }

        return (
            <PageLayout title="单物件设定温度、回风温度以及耗电量统计">
                <div style={{display:'block'}}>
                    <SearchForm onFinish={this.handleSearch}>
                        <ProjectCascadeSelector hideFrom="null" />
                        <div className="searchForm-row">
                            <TimeRangeSelector required/>
                        </div>
                        <div className="searchForm-row">
                            <TimeUnitSelector required/>
                        </div>
                    </SearchForm>
                </div>
                <div className="chart-box">
                    { formData===null ? <NoChart />: <HabitsSingleChart requestFn={api.getHabitsSingleLine} query={formData} />}
                </div>
            </PageLayout>
        )
    }
}
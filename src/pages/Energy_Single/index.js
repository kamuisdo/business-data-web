import React from 'react'
import SearchForm from "../../components/SearchForm";
import TypeSelector from "../../components/TypeSelector";
import AreaSelector from "../../components/AreaSelector";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import TimeUnitSelector from "../../components/TimeUnitSelector";
import ProjectCascadeSelector from "../../components/ProjectCascadeSelector";
import NoChart from "../../components/NoChart";
import EnergyBarChart from "./EnergyBarChart";
import PageLayout from "../Layout";
import * as api from '../../api/energy'

export default class EnergySinglePage extends React.Component{

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
            <PageLayout title="单器械电力消耗统计">
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
                    { formData===null ? <NoChart />: <EnergyBarChart requestFn={api.getEnergyBarChart} query={formData} />}
                </div>
            </PageLayout>
        )
    }
}
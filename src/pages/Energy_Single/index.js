import React from 'react'
import SearchForm from "../../components/SearchForm";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import TimeUnitSelector from "../../components/TimeUnitSelector";
import ProjectCascadeSelector from "../../components/ProjectCascadeSelector";
import NoChart from "../../components/NoChart";
import EnergyBarChart from "./EnergyBarChart";
import EnergyErrLineChart from "./EnergyErrLineChart";
import PageLayout from "../Layout";
import * as api from '../../api/energy'
import ErrorChart from '../../components/ErrorChart'


export default class EnergySinglePage extends React.Component{

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this)
        this.handleErrorClick = this.handleErrorClick.bind(this)
        this.state = {
            formData:null,
            data:null,
            ifError:false
        }
    }

    handleSearch(value){
        this.setState({
            formData:value
        })
        this.loadData(value)
    }

    handleErrorClick(){
        this.setState({ ifError:false })
        this.loadData(this.state.formData)
    }


    loadData(value){
        this.setState({
            data:null
        })
        let query = Object.assign(value,{ type:0 })
        api.getEnergyBarChart(query).then((data)=>{
            this.setState({ data:data,ifError:false })
        }).catch((err)=>{
            this.setState({ ifError:true })
        })
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        let {formData,data,ifError} = this.state;
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
                    { formData===null ? <NoChart />: ifError ? <ErrorChart handleClick={this.handleErrorClick}/>:<EnergyBarChart data={data} query={formData}/>}
               </div>
                <div className="chart-box">
                    { formData===null ? <NoChart />: ifError ? <ErrorChart handleClick={this.handleErrorClick}/>:<EnergyErrLineChart data={data} query={formData}/>}
                </div>
            </PageLayout>
        )
    }
}
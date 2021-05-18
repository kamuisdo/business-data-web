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
import ErrorChart from '../../components/ErrorChart'


export default class OnlineRateSinglePage extends React.Component{

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this)
        this.handleErrorClick = this.handleErrorClick.bind(this)
        this.state = {
            formData:null,
            data:null,
            ifError:false,
            ifNoData:false
        }
        
    }

    handleSearch(value){
        this.setState({
            formData:value
        })
        this.loadData(value)
    }

    
    handleErrorClick(){
        console.log('---- handleErrorClick -----')
        this.setState({ ifError:false })
        this.loadData(this.state.formData)
    }


    loadData(value){
        this.setState({
            data:null,
            ifError:false,
            ifNoData:false
        })
        let query = Object.assign(value,{ type:0 })
        api.onlineCountBar(query).then((data)=>{
            let formatedData = api.formatDataByType(value,data)
            let ifNoData = data === null || (data && data.length === 0) || data === undefined
            this.setState({ data:formatedData,ifError:false,ifNoData })
        }).catch((err)=>{
            this.setState({ ifError:true,ifNoData:false })
        })
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }


    render() {
        let { formData,data,ifError,ifNoData } = this.state;
        return (
            <PageLayout title="在线数量统计分析">
                <div style={{display:'block'}}>
                    <SearchForm onFinish={this.handleSearch}>
                        <div className="searchForm-row">
                            <TypeSelector data={['物件数','系统']} required/>
                            <AreaSelector areaRules={[{required:true}]} provinceRules={[{required:true}]}/>
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
                    { (formData===null || ifNoData) ? <NoChart />: ifError ? <ErrorChart handleClick={this.handleErrorClick}/>:<OnlineCountBarChart data={data} query={formData}/>}
                </div>
                <div className="chart-box">
                    { (formData===null || ifNoData) ? <NoChart />: ifError ? <ErrorChart handleClick={this.handleErrorClick}/>:<OnlineRateChart data={data} query={formData}/>}
                </div>
            </PageLayout>

        )
    }
}
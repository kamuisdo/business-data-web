import React from "react";
import PageLayout from "../Layout";
import SearchForm from "../../components/SearchForm";
import AreaSelector from "../../components/AreaSelector";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import TimeUnitSelector from "../../components/TimeUnitSelector";
import TypeSelector from "../../components/TypeSelector";
import * as api from '../../api/onlineCountSingle'
import OnlineCountBarChart from "./OnlineCountBar";
import NoChart from "../../components/NoChart";




export default class OnlineRateSinglePage extends React.Component{

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this)
        this.state = {
            countBarData:null,
            formData:null
        }

    }

    handleSearch(value){
        console.log(value)
        this.setState({
            formData:value
        })
    }

    componentDidMount() {
        api.onlineCountBar().then((data)=>{
            this.setState({
                countBarData:data
            })
        })
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        let { formData,countBarData } = this.state;
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
                    { formData===null ? <NoChart />: <OnlineCountBarChart seriesData={countBarData}/>}
                </div>
            </PageLayout>

        )
    }
}
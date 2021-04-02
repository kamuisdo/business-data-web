import React from "react";
import PageLayout from "../Layout";
import SearchForm from "../../components/SearchForm";
import AreaSelector from "../../components/AreaSelector";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import TimeUnitSelector from "../../components/TimeUnitSelector";
import * as api from '../../api/onlineCountSingle'
import OnlineCountBarChart from "./OnlineCountBar";
import NoChart from "../../components/NoChart";
import {Form, Select} from "antd";

const {Option} = Select


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
                            <Form.Item
                                label="类型"
                                name="type"
                                required
                            >
                                <Select style={{ width: '12vw' }} placeholder="请选择地区" onChange={this.handleAreaChange}>
                                    {['物件数','LC No','系统','室内机'].map((v)=>{
                                        return <Option key={v} value={v}>{v}</Option>
                                    })}
                                </Select>
                            </Form.Item>
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
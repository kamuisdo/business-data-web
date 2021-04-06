import React from "react";
import PageLayout from "../Layout";
import ChinaMapChart from "./ChinaMapChart";
import AreaSelector from "../../components/AreaSelector";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import SearchForm from "../../components/SearchForm";
import ChinaMapCount from "./ChinaMapCount";
import OnlineCountChart from "./OnlineCountChart";
import Collapse from "../../components/Collapse";
import ProjectTypeCountChart from "./ProjectTypeChart";
import HpCountChart from "./HpCountChart";
import LcLinkCountChart from "./LcLinkCountPie";
import ProjectProvinceCountChart from "./ProjectProvinceCountChart";
import moment from 'moment';
import * as api from '../../api/overview'
import {Button} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";

export default class OverviewPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            searchShow:false,
            formData:{ timeRange:[moment().subtract(30, 'days'), moment()] }
        }
        this.handleClickSearchFormBtn = this.handleClickSearchFormBtn.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('---- OverviewPage componentDidUpdate ------')
    }


    handleClickSearchFormBtn(){
        this.setState({
            searchShow:!this.state.searchShow
        })
    }

    handleSearch(value){
        this.setState({
            formData:value
        })
    }


    render() {
        let searchBtnIcon = this.state.searchShow ? <DownOutlined/> : <UpOutlined />;
        let searchFormStyle=this.state.searchShow ? {display:'block'}:{display: 'none'}
        let { formData } = this.state;
        // 默认展示近7天
        let initialValues = { timeRange:[moment().subtract(30, 'days'), moment()] }
        return (
            <PageLayout title="商用智能VRV整体概况">
                <Button style={{float:'right',marginTop:'-60px'}} onClick={this.handleClickSearchFormBtn} type="link">搜索条件{searchBtnIcon}</Button>
                <div style={searchFormStyle}>
                    <SearchForm initialValues={initialValues} onFinish={this.handleSearch}>
                        <div className="searchForm-row">
                            <TimeRangeSelector required title="创建时间"/>
                        </div>
                        <div className="searchForm-row">
                            <AreaSelector />
                        </div>
                    </SearchForm>
                </div>
                <div>
                    <div style={{display:'flex',flexWrap:'nowrap'}}>
                        <div className='chart-box' style={{width:'60vw',marginRight:'20px'}}>
                            <ChinaMapChart requestFn={api.chinaMap} query={formData} size='430px'/>
                        </div>
                        <div className="chart-box" style={{width:'calc(100% - 60vw)'}}>
                            <ChinaMapCount query={formData}/>
                        </div>
                    </div>
                    <div className="chart-box">
                            <OnlineCountChart requestFn={api.onlineCountLine} query={formData} />
                    </div>
                    <div style={{clear: 'both'}}>
                        <div className="chart-box" style={{ width:'calc((100% - 20px)/2)',marginRight:'20px',float:'left' }}>
                            <Collapse title="物件类型概况">
                                <ProjectTypeCountChart/>
                            </Collapse>
                        </div>
                        <div className="chart-box" style={{ width:'calc((100% - 20px)/2)',float:'left' }}>
                            <Collapse title="智能VRV匹数分析">
                                <HpCountChart/>
                            </Collapse>
                        </div>
                    </div>
                    <div style={{clear: 'both'}}>
                        <div className="chart-box" style={{ width:'calc((100% - 20px)/2)',marginRight:'20px',float:'left' }}>
                            <Collapse title="每个LCNo连接的系统数">
                                <LcLinkCountChart/>
                            </Collapse>
                        </div>
                        <div className="chart-box" style={{ width:'calc((100% - 20px)/2)',float:'left' }}>
                            <Collapse title="各地物件数排名">
                                <ProjectProvinceCountChart/>
                            </Collapse>
                        </div>
                    </div>

                </div>

            </PageLayout>

        )
    }
}

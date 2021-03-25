import React from "react";
import { Form, Input, Button, Checkbox, Select } from 'antd';
import PageLayout from "../Layout";
import MapCharts from "./MapCharts";
import withEcharts from '../../components/withEcharts'
import ContentWrapper from "../../components/ContentWrapper";
import OverallItem from "./OverallItem";
import AddressSelector from '../../components/AddressSelector'
import OnRateChart from "./OnRateChart";
// import apiCollection from "../../api/apiCollection";
// import { getUserInfo } from '../../api/apiCollection'


class IndexContent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            onRateSearchData:{} // 开机率的搜索
        };
        this.onAddressSelectorChange = this.onAddressSelectorChange.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
        this.searchForm = React.createRef();
    }

    componentDidMount() {
        // getUserInfo({a:'1'}).then(function (data){
        //     console.log(data)
        // })
    }

    onRateFormFinish(){}

    onRateFormFinishFail(){}

    onAddressSelectorChange(data){
        console.log(`Index onAddressSelectorChange`);
        console.log(data)
        data = data || {};
        // this.setState({ onRateSearchData:data })
    }

    resetSearch(){
        // const [form] = Form.useForm();
        console.log(this)
        this.searchForm.current.resetFields()
    }

    render() {
        let MyMapChart = withEcharts(MapCharts);
        return (
            <div>
                <ContentWrapper title="总体数据概览">
                    <div style={{display:'flex',justifyContent:'left'}}>
                        <OverallItem title="项目总数（个）" count="24,330" change="+2个 较昨天"/>
                        <OverallItem title="室内机总数（台）" count="200,233,33" change="+320 较昨天"/>
                        <OverallItem title="室外机总数（台）" count="200,233,33" change="+320 较昨天"/>
                        <OverallItem title="新风机（台）" count="200,233,33" change="+320 较昨天"/>
                        <OverallItem title="传感器（台）" count="200,233,33" change="+0 较昨天"/>
                    </div>
                </ContentWrapper>
                <ContentWrapper title="空调实时开机率">
                    <Form
                        name="onRateForm"
                        onFinish={this.onRateFormFinish}
                        onFinishFailed={this.onRateFormFinishFail}
                        layout='inline'
                        ref={this.searchForm}
                    >
                        <AddressSelector onChange={this.onAddressSelectorChange} />
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="text" htmlType="reset" onClick={this.resetSearch}>
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:'30px'}}>
                        <OnRateChart title="室内机"/>
                        <OnRateChart title="室外机"/>
                        <OnRateChart title="新风机"/>
                        <OnRateChart title="传感器"/>
                    </div>
                </ContentWrapper>
                <ContentWrapper title="总体分布">
                    <div style={{height:'100%',width:'100%'}}>
                        <MyMapChart/>
                    </div>
                </ContentWrapper>
            </div>

        )
    }
}

export default class Index extends React.Component{
    render() {
        return (<PageLayout><IndexContent/></PageLayout>)
    }
}
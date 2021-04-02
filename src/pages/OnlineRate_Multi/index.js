import React from "react";
import PageLayout from "../Layout";
import {Alert,Form, Select} from "antd";
import AreaSelector from "../../components/AreaSelector";
import SearchForm from "../../components/SearchForm";
import SelectTable from "../../components/SelectTable";
import SelectTableItem from "../../components/SelectTableItem";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import TimeUnitSelector from "../../components/TimeUnitSelector";
import NoChart from "../../components/NoChart";
import AreaTable from "./AreaTable";
import ProvinceTable from "./ProvinceTable";
import OnlineRateMultiChart from "./OnlineRateMultiLine";
import * as api from '../../api/onlineCountMulti'
import './index.less'

const {Option} = Select

export default class OnlineRateMulti extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            areaType:null,
            tableFormData:null,
            chartFormData:null,
            chartData:null,
            selected:[],
            ifShowAlert:false
        }
        this.tableRef=React.createRef();
        this.tableWrapperRef=React.createRef();
        this.handleAreaTypeChange = this.handleAreaTypeChange.bind(this)
        this.onFinishChartForm = this.onFinishChartForm.bind(this)
        this.handleClickAddBtn= this.handleClickAddBtn.bind(this)
        this.onRemoveItem = this.onRemoveItem.bind(this)
        this.onFinishTableForm = this.onFinishTableForm.bind(this)
    }

    handleAreaTypeChange(value){
        this.setState({
            areaType:value
        })
    }

    handleClickAddBtn(totalSelected){
        console.log('-----handleClickAddBtn------')
        console.log(totalSelected)
        this.setState({
            selected:totalSelected
        })
    }

    // 移除total已选的数据
    onRemoveItem(key){
        console.log(key)
        let t = this.state.selected.filter((v)=>{ return v.key !== key })
        this.setState({
            selected:t
        })
    }

    onFinishTableForm(tableFormData){
        let orgData = Object.assign({},this.state.tableFormData)
        if(this.tableRef.current){
            this.tableRef.current.reloadAndRest();
            this.tableRef.current.clearSelected();
            this.tableWrapperRef.current.reset();
        }
        // areaType发生变化的时候需要把SelectedItem组件重置
        if(orgData.areaType !== tableFormData.areaType){
            this.setState({
                tableFormData,
                selected:[]
            })
        }else {
            this.setState({
                tableFormData
            })
        }
    }

    onFinishChartForm(chartFormData){
        if(this.state.selected.length === 0){
            this.setState({
                ifShowAlert:true
            })
            return
        }
        this.setState({
            chartFormData
        })
    }

    render() {

        let { areaType,tableFormData,chartFormData,ifShowAlert,selected } = this.state;
        let formAreaType = tableFormData ? tableFormData.areaType : null;
        let ifProvinceVisible = areaType === '市'
        let ifCityVisible = false;
        let selectedNameField = formAreaType==='地区' ? 'area' : (formAreaType==='省'?'province':'city')
        return (
            <PageLayout className="online-rate-multi-page">
                <SearchForm buttonText="查询" onFinish={this.onFinishTableForm} >
                    <p className="form-title">请选择对比维度</p>
                    <div className="searchForm-row">

                        <Form.Item
                            label="维度"
                            name="areaType"
                            rules={[{ required: true }]}
                        >
                            <Select style={{ width: '12vw' }}
                                    value={areaType}
                                    placeholder="请选择对比维度"
                                    onChange={this.handleAreaTypeChange}>
                                {['地区','省','市'].map((v)=>{
                                    return <Option key={v} value={v}>{v}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                    {
                        ((areaType === '省')||(areaType === '市')) &&
                        <>
                            <p className="form-title">请搜索并添加相关数据</p>
                            <div className="searchForm-row">
                                <AreaSelector ifProvinceVisible={ifProvinceVisible} ifCityVisible={ifCityVisible} />
                            </div>
                        </>
                    }

                </SearchForm>
                {
                    formAreaType === '地区' &&
                    <div className='chart-box'>
                        <SelectTable handleClickAddBtn={this.handleClickAddBtn} render={(onChangeFn)=>{
                            return (
                                <AreaTable onSelect={onChangeFn}/>
                            )
                        }} />
                    </div>
                }
                {
                    formAreaType === '省' &&
                    <div className='chart-box'>
                        <SelectTable ref={this.tableWrapperRef} handleClickAddBtn={this.handleClickAddBtn} render={(onChangeFn)=>{
                            return (
                                <ProvinceTable actionRef={this.tableRef} formData={tableFormData} onSelect={onChangeFn}/>
                            )
                        }} />
                    </div>
                }

                <div className='chart-box'>
                    { selected.length>0 && <SelectTableItem selected={selected} nameField={selectedNameField} onRemoveItem={this.onRemoveItem}/> }
                    <SearchForm initialValues={{ unit: '天' }} onFinish={this.onFinishChartForm}>
                        <div className="searchForm-row">
                            <TimeRangeSelector required={true}/>
                            <TimeUnitSelector/>
                        </div>
                        <div className="searchForm-row">
                            <Form.Item
                                label="类型"
                                name="type"
                                rules={[{ required: true }]}
                            >
                                <Select style={{ width: '12vw' }} placeholder="请选择对比类型">
                                    {['物件数','LC No','系统','室内机'].map((v)=>{
                                        return <Option key={v} value={v}>{v}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                    </SearchForm>
                    { (ifShowAlert&&selected.length===0) && <Alert message="请选择至少一个对象" type="warning" showIcon />}
                </div>
                <div className="chart-box">
                    { chartFormData===null ? <NoChart/> : <OnlineRateMultiChart selected={selected}/> }
                </div>
            </PageLayout>
        )
    }
}
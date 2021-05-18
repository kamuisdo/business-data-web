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
import CityTable from "./CityTable";
import OnlineRateMultiChart from "./OnlineRateMultiLine";
import { onlineRateMultiLine } from '../../api/onlineCountMulti';
import uniqBy from 'lodash/uniqBy';
import config from '../../utils/config'

import './index.less'

const {Option} = Select

export default class OnlineRateMulti extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            areaType:null,
            tempAreaType:null,
            tableFormData:null,
            chartFormData:null,
            chartData:null,
            selected:[],
            formSelected:[],    // chart根据此字段变更
            ifShowNoSelectAlert:false,
            ifShowTypeErrAlert:false,
            ifShowSelectedLimitAlert:false
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

    handleClickAddBtn(currentSelected,totalSelected){
        // console.log('-----handleClickAddBtn------')
        // console.log(currentSelected)
        // console.log(totalSelected)
        if(currentSelected.length){
            let {areaType} = this.state
            // 添加的时候，才把原来已选中的清除掉，根据当前的targetType判断
            totalSelected = uniqBy(totalSelected.concat(currentSelected),'key')
            let filteredSelected = this.filterSelected(totalSelected)
            if(this.tableWrapperRef.current){
                this.tableWrapperRef.current.resetTotal(filteredSelected);
            }
            let ifOverLimit = this.ifSelectedOverLimit(filteredSelected)
            if(!ifOverLimit){
                this.setState({
                    selected:filteredSelected,
                    tempAreaType:areaType
                })
            }
        }
        
    }

    filterSelected(selected){
        let {areaType} = this.state
        let nameField = areaType==='地区' ? 'area' : (areaType==='省'?'province':'city')
        return selected.filter((v)=>{ return v[nameField] !== undefined })
    }


    // 移除total已选的数据
    onRemoveItem(key){
        // console.log('--- onRemoveItem -----')
        // console.log(key)
        let t = this.state.selected.filter((v)=>{ return v.key !== key })
        if(this.tableWrapperRef.current){
            this.tableWrapperRef.current.resetTotal(t);
        }
        this.setState({
            selected:t
        })
    }

    onFinishTableForm(tableFormData){
        // let orgData = Object.assign({},this.state.tableFormData)
        if(this.tableRef.current){
            this.tableRef.current.reloadAndRest();
            this.tableRef.current.clearSelected();
            if(this.tableWrapperRef.current){
                this.tableWrapperRef.current.resetCurrent([])
            }
        }
        this.setState({
            tableFormData
        })
        // // areaType发生变化的时候需要把SelectedItem组件重置
        // if(orgData.areaType !== tableFormData.areaType){
        //     this.setState({
        //         tableFormData,
        //         selected:[]
        //     })
        // }else {
        //     this.setState({
        //         tableFormData
        //     })
        // }
    }

    onFinishChartForm(chartFormData){
        if(this.state.selected.length === 0){
            this.setState({
                ifShowNoSelectAlert:true
            })
            return
        }
        if(this.state.areaType !== this.state.tempAreaType){
            this.setState({
                ifShowTypeErrAlert:true
            })
            return
        }
        let formSelected = this.state.selected.concat();
        this.setState({
            chartFormData,
            formSelected
        })
    }

    ifSelectedOverLimit(selected){
        // 可选对象数量的最大值
        let result = selected.length > config.selectedItemLimit
        this.setState({ ifShowSelectedLimitAlert:result })
        return result
    }

    render() {
        let { areaType,tempAreaType,tableFormData,chartFormData,formSelected,ifShowNoSelectAlert,ifShowTypeErrAlert,ifShowSelectedLimitAlert,selected } = this.state;
        let formAreaType = tableFormData ? tableFormData.areaType : null;
        let ifProvinceVisible = areaType === '市'
        let ifCityVisible = false;
        let selectedNameField = tempAreaType==='地区' ? 'area' : (tempAreaType==='省'?'province':'city')
        let selectedIdField = 'key'
        let chartRegionType = areaType==='地区' ? 'region' : (areaType==='省'?'province':'city')
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
                {
                    formAreaType === '市' &&
                    <div className='chart-box'>
                        <SelectTable ref={this.tableWrapperRef} handleClickAddBtn={this.handleClickAddBtn} render={(onChangeFn)=>{
                            return (
                                <CityTable actionRef={this.tableRef} formData={tableFormData} onSelect={onChangeFn}/>
                            )
                        }} />
                    </div>
                }

                <div className='chart-box'>
                    { selected.length>0 && <SelectTableItem selected={selected} idField={selectedIdField} nameField={selectedNameField} onRemoveItem={this.onRemoveItem}/> }
                    <SearchForm initialValues={{ unit: '天' }} onFinish={this.onFinishChartForm}>
                        <div className="searchForm-row">
                            <TimeRangeSelector required={true}/>
                            <TimeUnitSelector required={true}/>
                        </div>
                        <div className="searchForm-row">
                            <Form.Item
                                label="类型"
                                name="type"
                                rules={[{ required: true }]}
                            >
                                <Select style={{ width: '12vw' }} placeholder="请选择对比类型">
                                    {[{id:'物件',text:'物件数'},{id:'系统',text:'系统'}].map((v)=>{
                                        return <Option key={v.id} value={v.id}>{v.text}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                    </SearchForm>
                    { (ifShowNoSelectAlert && selected.length===0) && <Alert message="请选择至少一个对像" type="warning" showIcon />}
                    { ifShowSelectedLimitAlert && <Alert message={`选择的对象不可超过${config.selectedItemLimit}个`} type="warning" showIcon /> }
                    { (ifShowTypeErrAlert && areaType !== tempAreaType) && <Alert message="已选对象的类型和需要比较的对象类型不一致" type="warning" showIcon />}
                </div>
                <div className="chart-box">
                    { chartFormData===null ? <NoChart/> : <OnlineRateMultiChart requestFn={onlineRateMultiLine} regionType={chartRegionType} selected={formSelected} query={chartFormData}/> }
                </div>
            </PageLayout>
        )
    }
}
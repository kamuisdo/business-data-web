import React from "react";
import PageLayout from "../Layout";
import {Alert,Form, Select} from "antd";
import SearchForm from "../../components/SearchForm";
import SelectTable from "../../components/SelectTable";
import SelectTableItem from "../../components/SelectTableItem";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import TimeUnitSelector from "../../components/TimeUnitSelector";
import ProjectCascadeSelector from "../../components/ProjectCascadeSelector";
import NoChart from "../../components/NoChart";
import EnergyLineMultiChart from "./EnergyMultiLine";
import EnergyErrorLineMultiChart from "./EnergyErrorMultiLine";
import SelectProjectTable from "../../components/SelectProjectTable";
import * as api from '../../api/energy'
import ErrorChart from '../../components/ErrorChart'
import uniqBy from 'lodash/uniqBy';
import config from '../../utils/config'

const {Option} = Select

export default class EnergyMultiPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            targetType:null,    // 随Selector修改的
            formTargetType:null,    // Tableform点击查询之后再修改
            selectedTargetType:null,    // 点击了添加之后再修改
            tableFormData:null,
            chartFormData:null,
            chartData:null,
            selected:[],
            formSelected:[],    // chart根据此字段变更
            ifShowAlert:false,
            data:null,  //请求回来的数据
            ifError:false,
            ifNoData:false,
            ifShowNoSelectAlert:false,
            ifShowTypeErrAlert:false,
            ifShowSelectedLimitAlert:false
        }
        this.tableRef=React.createRef();
        this.tableWrapperRef=React.createRef();     // selectTable的ref
        this.handleAreaTypeChange = this.handleAreaTypeChange.bind(this)
        this.onFinishChartForm = this.onFinishChartForm.bind(this)
        this.handleClickAddBtn= this.handleClickAddBtn.bind(this)
        this.onRemoveItem = this.onRemoveItem.bind(this)
        this.onFinishTableForm = this.onFinishTableForm.bind(this)
        this.handleErrorClick = this.handleErrorClick.bind(this)
    }

    handleAreaTypeChange(value){
        this.setState({
            targetType:value
        })
    }

    handleErrorClick(){
        this.setState({ ifError:false })
        this.loadData()
    }

    loadData(){
        this.setState({
            data:null,
            ifError:false,
            ifNoData:false
        })
        let chartFormData = this.state.chartFormData
        let type = this.state.targetType === '物件' ? 'build' : this.state.targetType === 'LcNo' ? 'terminal' : 'line'
        let idList = this.state.selected.map((v)=>{ return v.key })
        let query = Object.assign({},chartFormData,{ type,idList })
        api.getEnergyMultiLine(query).then((data)=>{
            data = data || []
            let ifNoData = data === null || (data && data.length === 0) || data === undefined
            this.setState({ data:data,ifError:false,ifNoData })
        }).catch((err)=>{
            this.setState({ ifError:true,ifNoData:false })
        })
    }

    handleClickAddBtn(currentSelected,totalSelected){
        console.log('-----handleClickAddBtn------')
        console.log(currentSelected)
        if(currentSelected.length){
            let {targetType} = this.state
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
                    selectedTargetType:targetType
                })
            }

        }
        
    }

    filterSelected(selected){
        let {targetType} = this.state
        let nameField = targetType==='物件' ? 'buildingName' : (targetType==='LcNo'?'lcNo':'lineName')
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
        let targetType = this.state.targetType;
        this.setState({
            tableFormData,
            formTargetType:targetType
        })
        if(this.tableRef.current){
            this.tableRef.current.reloadAndRest();
            this.tableRef.current.clearSelected();
            this.tableWrapperRef.current.resetCurrent([])
        }
    }

    onFinishChartForm(chartFormData){
        if(this.state.selected.length === 0){
            this.setState({
                ifShowNoSelectAlert:true
            })
            return
        }
        if(this.state.targetType !== this.state.selectedTargetType){
            this.setState({
                ifShowTypeErrAlert:true
            })
            return
        }
        let formSelected = this.state.selected
        this.setState({
            chartFormData,
            formSelected
        })
        this.loadData()
    }

    ifSelectedOverLimit(selected){
        // 可选对象数量的最大值
        let result = selected.length > config.selectedItemLimit
        this.setState({ ifShowSelectedLimitAlert:result })
        return result
    }

    render() {

        let { targetType,formTargetType,selectedTargetType,tableFormData,chartFormData,ifShowNoSelectAlert,ifShowSelectedLimitAlert, ifShowTypeErrAlert,selected,data,ifError,formSelected,ifNoData } = this.state;
        // let formTargetType = tableFormData ? tableFormData.targetType : null;
        let hideFrom = targetType || '物件';
        let map = {
            '物件':'project',
            'LcNo':'lcNo',
            '系统':'system',
        }   
        let selectProjectTableType = map[formTargetType]
        // console.log('multi render');
        // console.log(selectProjectTableType);
        let selectedNameField = selectedTargetType==='物件' ? 'buildingName' : (selectedTargetType==='LcNo'?'lcNo':'lineName')
        let selectedIdField = selectedTargetType === '物件' ? 'buildingId': (selectedTargetType==='LcNo'?'terminalId':'lineId')
        return (
            <PageLayout className="energy-multi-page">
                <SearchForm buttonText="查询" onFinish={this.onFinishTableForm} >
                    <p className="form-title">请选择对比维度</p>
                    <div className="searchForm-row">
                        <Form.Item
                            label="维度"
                            name="targetType"
                            rules={[{ required: true }]}
                        >
                            <Select style={{ width: '12vw' }}
                                    value={targetType}
                                    placeholder="请选择对比维度"
                                    onChange={this.handleAreaTypeChange}>
                                {['物件','LcNo','系统'].map((v)=>{
                                    return <Option key={v} value={v}>{v}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                    <p className="form-title">请搜索并添加相关数据</p>
                    <ProjectCascadeSelector hideFrom={hideFrom} lcNoRules={[{required:true}]}/>
                </SearchForm>
                {
                    tableFormData !== null &&
                    <div className='chart-box'>
                        <SelectTable ref={this.tableWrapperRef} handleClickAddBtn={this.handleClickAddBtn} render={(onChangeFn)=>{
                            return (
                                <SelectProjectTable
                                    actionRef={this.tableRef}
                                    query={tableFormData}
                                    type={selectProjectTableType}
                                    onSelect={onChangeFn}/>
                            )
                        }} />
                    </div>   
                }

                <div className='chart-box'>
                    { selected.length>0 && <SelectTableItem selected={selected} idField={selectedIdField} nameField={selectedNameField} onRemoveItem={this.onRemoveItem}/> }
                    <SearchForm initialValues={{ unit: '天' }} onFinish={this.onFinishChartForm}>
                        <div className="searchForm-row">
                            <TimeRangeSelector required={true}/>
                        </div>
                        <div className="searchForm-row">
                            <TimeUnitSelector required={true}/>
                            <Form.Item
                                label="电量统计维度"
                                name="type"
                                rules={[{ required: true }]}
                            >
                                <Select style={{ width: '12vw' }} placeholder="请选择统计对象">
                                    {['暖房','冷房','合计'].map((v)=>{
                                        return <Option key={v} value={v}>{v}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                    </SearchForm>
                    { (ifShowNoSelectAlert && selected.length===0) && <Alert message="请选择至少一个对像" type="warning" showIcon />}
                    { ifShowSelectedLimitAlert && <Alert message={`选择的对象不可超过${config.selectedItemLimit}个`} type="warning" showIcon /> }
                    { (ifShowTypeErrAlert && targetType !== selectedTargetType) && <Alert message="已选对象的类型和需要比较的对象类型不一致" type="warning" showIcon />}
                </div>
                <div className="chart-box">
                    { chartFormData===null || ifNoData ? <NoChart />: ifError ? <ErrorChart handleClick={this.handleErrorClick}/>:<EnergyLineMultiChart data={data} query={chartFormData} selected={formSelected}/>}
                </div>
                <div className="chart-box">
                    { chartFormData===null || ifNoData ? <NoChart />: ifError ? <ErrorChart handleClick={this.handleErrorClick}/>:<EnergyErrorLineMultiChart data={data} query={chartFormData} selected={formSelected}/>}
                </div>
            </PageLayout>
        )
    }
}
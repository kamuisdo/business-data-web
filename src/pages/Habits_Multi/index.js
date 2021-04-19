import React from "react";
import PageLayout from "../Layout";
import {Alert,Form, Select} from "antd";
import SearchForm from "../../components/SearchForm";
import SelectTable from "../../components/SelectTable";
import SelectTableItem from "../../components/SelectTableItem";
import TimeUnitSelector from "../../components/TimeUnitSelector";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import ProjectCascadeSelector from "../../components/ProjectCascadeSelector";
import NoChart from "../../components/NoChart";
import SelectProjectTable from "../../components/SelectProjectTable";
import HabitsMultiChart from "./HabitsMultiChart";
import * as api from '../../api/habits'


const {Option} = Select

export default class HabitsMultiPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            targetType:null,
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
            targetType:value
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
        // targetType发生变化的时候需要把SelectedItem组件重置
        if(orgData.targetType !== tableFormData.targetType){
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

        let { targetType,tableFormData,chartFormData,ifShowAlert,selected } = this.state;
        let formTargetType = tableFormData ? tableFormData.targetType : null;
        let hideFrom = targetType || '物件';
        let map = {
            '物件':'project',
            'LcNo':'lcNo',
            '系统':'system',
        }
        let selectProjectTableType = map[targetType]
        let selectedNameField = formTargetType==='物件' ? 'projectName' : (formTargetType==='LcNo'?'lcNoName':'systemName')
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
                    <ProjectCascadeSelector hideFrom={hideFrom}/>
                </SearchForm>
                {
                    formTargetType&&formTargetType.length>0 &&
                    <div className='chart-box'>
                        <SelectTable handleClickAddBtn={this.handleClickAddBtn} render={(onChangeFn)=>{
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
                    { selected.length>0 && <SelectTableItem selected={selected} nameField={selectedNameField} onRemoveItem={this.onRemoveItem}/> }
                    <SearchForm onFinish={this.onFinishChartForm}>
                        <div className="searchForm-row">
                            <TimeRangeSelector required={true}/>
                            <TimeUnitSelector required={true}/>
                        </div>
                    </SearchForm>
                    { (ifShowAlert&&selected.length===0) && <Alert message="请选择至少一个对象" type="warning" showIcon />}
                </div>
                { chartFormData===null ? <NoChart/> : <HabitsMultiChart requestFn={api.getHabitsMultiLine} selected={selected} query={chartFormData} /> }
            </PageLayout>
        )
    }
}
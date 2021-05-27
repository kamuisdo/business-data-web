import React from "react";
import {DatePicker, Form, Button} from 'antd';
import moment from 'moment';
import FormContext from '../SearchForm/formContext'
import './index.less'
import EE from "../../utils/eventEmitter";
import eventName from "../../utils/eventName";

const {RangePicker} = DatePicker;


class TimeRangeSelector extends React.Component{

    constructor(props) {
        super(props);
        this.handleToady = this.handleToady.bind(this)
        this.handleSevenDay = this.handleSevenDay.bind(this)
        this.handleThirtyDay = this.handleThirtyDay.bind(this)
        this.handleOneYear = this.handleOneYear.bind(this)
    }

    // 设置时间为今天
    handleToady() {
        this.context.formRefs.current.setFieldsValue({
            timeRange: [moment(), moment()]
        });
    }

    // 设置时间为近7日
    handleSevenDay() {
        this.context.formRefs.current.setFieldsValue({
            timeRange: [moment().subtract(7, 'days'), moment()]
        });
    }

    // 设置时间为近30日
    handleThirtyDay() {
        this.context.formRefs.current.setFieldsValue({
            timeRange: [moment().subtract(30, 'days'), moment()]
        });
    }

    // 设置时间为近一年
    handleOneYear() {
        this.context.formRefs.current.setFieldsValue({
            timeRange: [moment().subtract(1, 'years'), moment()]
        });
    }

    componentDidMount() {
        if(this.context && this.context.formId){
            EE.on(`${eventName.FormRestPrefix}${this.context.formId}`,()=>{
                // console.log(`------ TimeRangeSelector 重置 ${eventName.FormRestPrefix}${this.context.formId} ------`)
                // let {cascading,disabled} = this.props;
                // let apiDisabled = cascading ? true : disabled
                this.context.formRefs.current.setFieldsValue({
                    timeRange: []
                });
            })
        }
    }


    render() {
        let {label='时间',required,rules=[]} = this.props;
        if(required){
            rules.push({ required:true,message:'请输入时间范围' })
        }
        return (
            <Form.Item label={label} required={required}  className="timeRange-wrapper">
                <Form.Item name="timeRange" rules={rules}>
                    <RangePicker style={{width: '18vw'}}/>
                </Form.Item>

                <Button onClick={this.handleToady} style={{margin: '0 5px'}}>今日</Button>
                <Button onClick={this.handleSevenDay} style={{margin:'0 5px'}}>近7日</Button>
                <Button onClick={this.handleThirtyDay} style={{margin:'0 5px'}}>近30日</Button>
                <Button onClick={this.handleOneYear} style={{margin:'0 5px'}}>近一年</Button>
            </Form.Item>

        )
    }

}

TimeRangeSelector.contextType = FormContext;

export default TimeRangeSelector
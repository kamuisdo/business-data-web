import React from "react";
import {DatePicker, Form, Button} from 'antd';
import moment from 'moment';
import FormContext from '../SearchForm/formContext'
import './index.less'

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
        this.context.current.setFieldsValue({
            timeRange: [moment(), moment()]
        });
    }

    // 设置时间为近7日
    handleSevenDay() {
        this.context.current.setFieldsValue({
            timeRange: [moment().subtract(1, 'days'), moment()]
        });
    }

    // 设置时间为近30日
    handleThirtyDay() {
        this.context.current.setFieldsValue({
            timeRange: [moment().subtract(30, 'days'), moment()]
        });
    }

    // 设置时间为近一年
    handleOneYear() {
        this.context.current.setFieldsValue({
            timeRange: [moment().subtract(1, 'years'), moment()]
        });
    }


    render() {
        let {label='时间',required} = this.props;
        return (
            <Form.Item label={label} required={required} className="timeRange-wrapper">
                <Form.Item name="timeRange">
                    <RangePicker style={{width: '18vw'}} />
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
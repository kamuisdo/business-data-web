import React from "react";
import {Form,Button} from 'antd'
import './index.less'
import FormContext from './formContext'
import dayjs from "dayjs";

export default class SearchForm extends React.Component{
    constructor(props) {
        super(props);
        this.formRefs = React.createRef();
        this.initialValues = {};
        this.handleReset = this.handleReset.bind(this)
    }

    handleReset(){
        let {onReset} = this.props;
        this.formRefs.current.resetFields()
        if(onReset){ onReset(this.initialValues) }
    }

    render() {
        let {children,buttonText="生成表格",layout="inline",initialValues={},onFinish,...other} = this.props;
        initialValues = Object.assign({ timeType:'day' },initialValues)
        this.initialValues = initialValues
        let onFinishFn = onFinish ? (values)=>{
            // 全局转换value的值
            if(values.timeRange && values.timeRange.length){
                values.beginTime = dayjs(values.timeRange[0]).format('YYYY-MM-DD')
                values.endTime = dayjs(values.timeRange[1]).format('YYYY-MM-DD')
            }
            return onFinish(values)
        } : ()=>{}

        return (
            <FormContext.Provider value={this.formRefs}>
                <Form className="searchForm"
                      ref={this.formRefs}
                      {...other}
                      onFinish={onFinishFn}
                      initialValues={initialValues}
                      layout={layout}>
                    {children}
                    <Form.Item>
                        <div style={{ paddingLeft:'70px' }}>
                            <Button type="primary" htmlType="submit">{buttonText}</Button>
                            <Button type="text" className="searchForm-reset-btn" onClick={this.handleReset}>重置</Button>
                        </div>
                    </Form.Item>
                </Form>
            </FormContext.Provider>
        )
    }
}
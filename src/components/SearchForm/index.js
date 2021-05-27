import React from "react";
import {Form,Button} from 'antd'
import './index.less'
import FormContext from './formContext'
import dayjs from "dayjs";
import EE from "../../utils/eventEmitter";
import eventName from '../../utils/eventName'
import { v4 as uuidv4 } from 'uuid'

export default class SearchForm extends React.Component{
    constructor(props) {
        super(props);
        this.formRefs = React.createRef();
        this.initialValues = {};
        this.handleReset = this.handleReset.bind(this)
        this.formId = uuidv4()
    }

    handleReset(){
        let {onReset} = this.props;
        // antd form.resetFields 会重新加载组件
        // 使用 setFieldsValue 不会重新加载组件
        // 根据dom获取表单中的field
        // this.formRefs.current.resetFields()
        // this.formRefs.current.resetFields()
        console.log('----- SearchForm handleReset ------')
        let fields = this.getformfield()
        let resetData = {}
        fields.forEach((v)=>{
            resetData[v] = undefined
        })
        this.formRefs.current.setFieldsValue(Object.assign(resetData,this.initialValues))
        // console.log(this.initialValues)
        // console.log(this.formRefs.current.getFieldsValue(true))
        // console.log(this.formRefs.current.getFieldValue('provinceCode'))
        if(onReset){ onReset(this.initialValues) }
        EE.emit(`${eventName.FormRestPrefix}${this.formId}`)
    }

    // 获取子组件的field
    getformfield(){
        // let formDom = document.getElementsByClassName(`form-${this.formId}`)
        let label = document.querySelectorAll(`.form-${this.formId} .ant-form-item-label>label`)
        console.log(label)
        // let fields = label.map((el)=>{
        //     return el.getAttribute('for')
        // })
        let fields = []
        label.forEach((el)=>{
            let attr = el.getAttribute('for')
            if(attr){
                fields.push(attr)
            }
            console.log(el.getAttribute('for'))
        })
        // console.log(fields)
        return fields
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
            <FormContext.Provider value={{ formRefs: this.formRefs,formId: this.formId }}>
                <Form className={`searchForm form-${this.formId}`}
                      ref={this.formRefs}
                      {...other}
                      onFinish={onFinishFn}
                      initialValues={initialValues}
                      layout={layout}>
                    {children}
                    <Form.Item>
                        <div style={{ paddingLeft:'80px' }}>
                            <Button type="primary" htmlType="submit">{buttonText}</Button>
                            <Button type="text" className="searchForm-reset-btn" onClick={this.handleReset}>重置</Button>
                        </div>
                    </Form.Item>
                </Form>
            </FormContext.Provider>
        )
    }
}
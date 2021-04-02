import React from "react";
import {Form,Select,Button} from 'antd'
import './index.less'
import FormContext from './formContext'

export default class SearchForm extends React.Component{
    constructor(props) {
        super(props);
        this.formRefs = React.createRef();
        this.handleReset = this.handleReset.bind(this)
    }

    handleReset(){
        this.formRefs.current.resetFields()
    }

    render() {
        let {children,buttonText="生成表格",layout="inline",...other} = this.props;
        return (
            <FormContext.Provider value={this.formRefs}>
                <Form className="searchForm"
                      ref={this.formRefs}
                      {...other}
                      layout={layout}>
                    {children}
                    <Form.Item style={{width:'100%'}}>
                        <Button type="primary" htmlType="submit">{buttonText}</Button>
                        <Button type="text" onClick={this.handleReset}>重置</Button>
                    </Form.Item>
                </Form>
            </FormContext.Provider>
        )
    }
}
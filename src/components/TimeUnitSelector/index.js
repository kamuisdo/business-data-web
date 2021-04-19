import React from "react";
import {Form, Select} from "antd";

const {Option} = Select;

export default class TimeUnitSelector extends React.Component{
    render() {
        let {data=['小时','天','月'],required,rules=[]} = this.props
        if(required){
            rules.push({ required:true })
        }
        return (
            <>
                <Form.Item
                    label="单位"
                    name="unit"
                    rules={rules}
                >
                    <Select style={{ width: '12vw' }}
                            placeholder="请选择时间单位"
                            {...this.props}>
                        {data.map((v)=>{
                            return <Option key={v} value={v}>{v}</Option>
                        })}
                    </Select>
                </Form.Item>
            </>
        )
    }
}
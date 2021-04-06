import React from "react";
import {Form, Select} from "antd";

const {Option} = Select;

export default class TypeSelector extends React.Component{
    render() {
        let {data=['物件数','LC No','系统','室内机'],required,rules=[]} = this.props
        if(required){
            rules.push({ required:true })
        }
        return (
            <>
                <Form.Item
                    label="类型"
                    name="type"
                    rules={rules}
                >
                    <Select style={{ width: '12vw' }}
                            placeholder="请选择类型"
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
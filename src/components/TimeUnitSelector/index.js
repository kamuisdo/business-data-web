import React from "react";
import {Form, Select} from "antd";
import { TimeTypeEnum } from '../../enum/timeType';

const {Option} = Select;

export default class TimeUnitSelector extends React.Component{
    render() {
        let {data=['小时','天','月'],required,rules=[]} = this.props
        if(required){
            rules.push({ required:true })
        }
        let t = TimeTypeEnum.toObjectArray();
        return (
            <>
                <Form.Item
                    label="单位"
                    name="timeType"
                    rules={rules}
                >
                    <Select style={{ width: '12vw' }}
                            placeholder="请选择时间单位"
                            {...this.props}>
                        {t.map((v)=>{
                            return <Option key={v.id} value={v.id}>{v.value}</Option>
                        })}
                    </Select>
                </Form.Item>
            </>
        )
    }
}
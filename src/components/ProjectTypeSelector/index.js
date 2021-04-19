import React from "react";
import { ProjectTypeEnum } from '../../enum/projectType'
import {Select} from 'antd'
const { Option } = Select;

export default class ProjectTypeSelector extends React.Component{
    render() {
        let list = ProjectTypeEnum.toObjectArray();
        let {placeholder='请选择物件类型',style,...rest} = this.props;
        let selectStyle = Object.assign({
            width:'12vw'
        },style)
        return (
            <Select allowClear={true} style={selectStyle} placeholder={placeholder} {...rest}>
                {list.map((v)=>{
                    return <Option key={v.id} value={v.id}>{v.value}</Option>
                })}
            </Select>
        )
    }
}
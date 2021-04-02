import React from "react";
import {Select,Button} from 'antd'
const { Option } = Select;

export default class ProjectTypeSelector extends React.Component{
    render() {
        let list = ['A1商店','A2餐馆，娱乐场所','A3多店铺','B1工厂，仓库','B2办公室','B3计算机房','C1政府机构','C2医院机构','C3学校，教育机构','C4银行机构','D1宾馆，旅社','E1私人住宅','ZZ其他']
        let {width=240,placeholder='请选择物件类型',...rest} = this.props;
        return (
            <Select style={{ width: {width} }} placeholder={placeholder} {...rest}>
                {list.map((v)=>{
                    return <Option key={v} value={v}>{v}</Option>
                })}
            </Select>
        )
    }
}
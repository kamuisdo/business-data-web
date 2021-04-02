import React from "react";
import * as api from '../../api/common'
import ApiSelect from "../ApiSelect";
import {Form,Select} from 'antd'
const { Option } = Select;

const areaMap = {
    '华东':['上海','江苏','安徽','浙江'],
    '华南':['云南','贵州','广西','广东','福建','海南'],
    '华北':['河北','山西','北京','天津','山东'],
    '中西部':['新疆','西藏','甘肃','青海','宁夏','陕西','河南','湖北','湖南','江西','四川','重庆'],
    '东北':['内蒙古','辽宁','黑龙江','吉林']
}

const provinceList = Object.keys(areaMap);

export default class AreaSelector extends React.Component{
    constructor(props) {
        super(props);
        this.handleAreaChange = this.handleAreaChange.bind(this)
        this.state = {
            area:null,
            provinceList:[],
            province:null,
            city:null
        }
        this.provinceRef = React.createRef()
        this.cityRef = React.createRef()
    }

    handleAreaChange(value){
        let provinceList = areaMap[value];
        this.setState({
            area:value,
            provinceList:provinceList
        })
    }



    render() {
        let {ifProvinceVisible=true,ifCityVisible=true} = this.props
        let {region,province,city} = this.state;
        return(
            <>
                <Form.Item
                    label="地区"
                    name="area"
                >
                    <ApiSelect
                        placeholder="请选择地区"
                        // onChange={this.handleAreaChange}
                        request={api.getRegionInfo}
                        textField="regionName"
                        valueField="regionCode"
                        cascadeBy={[this.provinceRef]}
                    />
                    {/*<Select style={{ width: '12vw' }} placeholder="请选择地区" onChange={this.handleAreaChange}>*/}
                    {/*    {provinceList.map((v)=>{*/}
                    {/*        return <Option key={v} value={v}>{v}</Option>*/}
                    {/*    })}*/}
                    {/*</Select>*/}
                </Form.Item>
                { ifProvinceVisible &&  <Form.Item
                    label="省"
                    name="province"
                >
                    <ApiSelect
                        placeholder="请选择省份"
                        ref={this.provinceRef}
                        // query={{region}}
                        request={api.getProvinceInfo}
                        textField="provinceName"
                        valueField="provinceCode"
                        cascading={true}
                        cascadeParams={(value)=>{ console.log(value);return{ region:value } }}
                    />
                    {/*<Select style={{ width: '12vw' }} disabled={!this.state.area} value={this.state.provinceVal}*/}
                    {/*        placeholder="请选择省份">*/}
                    {/*    { this.state.provinceList.map((v)=>{*/}
                    {/*        return <Option key={v} value={v}>{v}</Option>*/}
                    {/*    }) }*/}
                    {/*</Select>*/}
                </Form.Item>}
                { ifCityVisible && <Form.Item
                    label="市"
                    name="city"
                >
                    <Select style={{ width: '12vw' }} disabled={!this.state.provinceVal}
                            placeholder="请选择市">
                        { this.state.provinceList.map((v)=>{
                            return <Option key={v} value={v}>{v}</Option>
                        }) }
                    </Select>
                </Form.Item> }

            </>
        )
    }
}
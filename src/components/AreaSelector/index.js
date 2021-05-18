import React from "react";
import * as api from '../../api/common'
import ApiSelect from "../ApiSelect";
import {Form} from 'antd'


export default class AreaSelector extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            area:null,
            provinceList:[],
            province:null,
            city:null
        }
        this.areaRef = React.createRef()
        this.provinceRef = React.createRef()
        this.cityRef = React.createRef()
    }




    render() {
        let {ifProvinceVisible=true,ifCityVisible=true,areaRules,provinceRules,cityRules,ifAreaIncludeAll=false} = this.props
        return(
            <>
                <Form.Item
                    label="地区"
                    name="regionCode"
                    rules={areaRules}
                >
                    <ApiSelect
                        placeholder="请选择地区"
                        ref={this.areaRef}
                        requestFn={ifAreaIncludeAll ? api.getRegionInfoIncludeAll : api.getRegionInfo}
                        textField="text"
                        valueField="value"
                        cascadeBy={[this.provinceRef]}
                    />
                </Form.Item>
                { ifProvinceVisible &&  <Form.Item
                    label="省"
                    name="provinceCode"
                    rules={provinceRules}
                >
                    <ApiSelect
                        placeholder="请选择省份"
                        ref={this.provinceRef}
                        requestFn={api.getProvinceInfo}
                        textField="text"
                        valueField="value"
                        cascadeBy={[this.cityRef]}
                        cascading={this.areaRef}
                        cascadeParams={(value)=>{ return {regionCode:value} }}
                    />
                </Form.Item>}
                { ifCityVisible && <Form.Item
                    label="市"
                    name="cityCode"
                    rules={cityRules}
                >
                    <ApiSelect
                        placeholder="请选择市"
                        showSearch={true}
                        ref={this.cityRef}
                        requestFn={api.getCityInfo}
                        textField="text"
                        valueField="value"
                        cascadeBy={[this.projectTypeRef]}
                        cascading={this.provinceRef}
                        cascadeParams={(value)=>{ return {provinceCode:value} }}
                    />
                </Form.Item> }

            </>
        )
    }
}
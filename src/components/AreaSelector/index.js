import React from "react";
import * as api from '../../api/common'
import ApiSelect from "../ApiSelect";
import {Form} from 'antd'
import EE from '../../utils/eventEmitter'
import FormContext from '../SearchForm/formContext'
import eventName from "../../utils/eventName";

class AreaSelector extends React.Component{
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

    // reset(){
    //     // console.log(this.areaRef)
    //     console.log(this.provinceRef.current)
    //     // console.log(this.cityRef)
    //     if(this.provinceRef.current){
    //         this.provinceRef.current.reset()
    //     }
    //
    // }
    //
    // componentDidMount() {
    //     let form = this.context ? this.context.current : null
    //     console.log('--- AreaSelector  componentDidMount -----')
    //     console.log(this.context)
    //     console.log(form)
    //     EE.on(`${eventName.FormRestPrefix}111`,()=>{
    //         this.reset()
    //     })
    //     if(form){
    //
    //         console.log(form.formId)
    //         // EE.on(`${eventName.FormRestPrefix}`)
    //     }
    //
    // }
    //
    // componentWillUnmount() {
    //
    // }


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
                        formfield="regionCode"
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
                        formfield="provinceCode"
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
                        formfield="cityCode"
                        cascadeBy={[this.projectTypeRef]}
                        cascading={this.provinceRef}
                        cascadeParams={(value)=>{ return {provinceCode:value} }}
                    />
                </Form.Item> }

            </>
        )
    }
}

AreaSelector.contextType = FormContext;

export default AreaSelector
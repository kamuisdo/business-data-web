import React from 'react'
import {Form} from "antd";
import ApiSelect from "../ApiSelect";
import * as api from "../../api/common";
import PropTypes from 'prop-types';


/**
 * 地区-》省-》市-》物件类型-》物件-》LC No-》系统
 */
export default class ProjectCascadeSelector extends React.Component{

    constructor(props) {
        super(props);
        this.areaRef = React.createRef()
        this.provinceRef = React.createRef()
        this.cityRef = React.createRef()
        this.projectTypeRef = React.createRef()
        this.projectRef = React.createRef()
        this.lcNoRef = React.createRef()
        this.systemRef = React.createRef()
        this.innerRef = React.createRef()
    }

    render() {
        let { areaRules,provinceRules,cityRules,projectRules,projectTypeRules,lcNoRules,systemRules } = this.props;
        return (
            <>
                <div className="searchForm-row">
                    <Form.Item
                        label="地区"
                        name="area"
                        rules={areaRules}
                    >
                        <ApiSelect
                            placeholder="请选择地区"
                            ref={this.areaRef}
                            requestFn={api.getRegionInfo}
                            textField="regionName"
                            valueField="regionCode"
                            cascadeBy={[this.provinceRef]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="省"
                        name="province"
                        rules={provinceRules}
                    >
                        <ApiSelect
                            placeholder="请选择省份"
                            ref={this.provinceRef}
                            requestFn={api.getProvinceInfo}
                            textField="provinceName"
                            valueField="provinceCode"
                            cascadeBy={[this.cityRef]}
                            cascading={true}
                            cascadeParams={(value)=>{ return{ region:value } }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="市"
                        name="city"
                        rules={cityRules}
                    >
                        <ApiSelect
                            placeholder="请选择市"
                            showSearch={true}
                            ref={this.cityRef}
                            requestFn={api.getCityInfo}
                            textField="cityName"
                            valueField="cityCode"
                            cascading={true}
                            cascadeParams={(value)=>{ return{ province:value } }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="物件类型"
                        name="projectType"
                        rules={projectTypeRules}
                    >
                        <ApiSelect
                            placeholder="请选择物件类型"
                            showSearch={true}
                            ref={this.projectTypeRef}
                            requestFn={api.getProjectType}
                            cascadeBy={[this.projectRef]}
                            textField="name"
                            valueField="value"
                        />
                    </Form.Item>
                </div>

                <div className="searchForm-row">
                    <Form.Item
                        label="物件"
                        name="project"
                        rules={projectRules}
                    >
                        <ApiSelect
                            placeholder="请选择物件"
                            showSearch={true}
                            ref={this.projectRef}
                            requestFn={api.getProjectType}
                            textField="name"
                            valueField="value"
                            cascading={true}
                            cascadeParams={(value)=>{
                                // 获取之前几个的值作为搜索条件
                                return {
                                    region:this.areaRef.current.state.value,
                                    province:this.provinceRef.current.state.value,
                                    city:this.cityRef.current.state.value,
                                    projectType:value
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="LCNo"
                        name="lcNo"
                        rules={lcNoRules}
                    >
                        <ApiSelect
                            placeholder="请选择LCNo"
                            showSearch={true}
                            ref={this.lcNoRef}
                            requestFn={api.getProjectType}
                            textField="name"
                            valueField="value"
                            cascading={true}
                            cascadeParams={(value)=>{
                                return { project:value }
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="系统"
                        name="system"
                        rules={systemRules}
                    >
                        <ApiSelect
                            placeholder="请选择系统"
                            showSearch={true}
                            ref={this.systemRef}
                            requestFn={api.getProjectType}
                            textField="name"
                            valueField="value"
                            cascading={true}
                            cascadeParams={(value)=>{
                                return { lcNo:value }
                            }}
                        />
                    </Form.Item>
                </div>

            </>
        )
    }

}

ProjectCascadeSelector.propTypes = {
    areaRules:PropTypes.array,
    provinceRules:PropTypes.array,
    cityRules:PropTypes.array,
    projectTypeRules:PropTypes.array,
    projectRules:PropTypes.array,
    lcNoRules:PropTypes.array,
    systemRules:PropTypes.array
}

ProjectCascadeSelector.defaultProps = {
    areaRules:[{ required:true }],
    provinceRules:[{ required:true }],
    cityRules:[{ required:true }],
    projectTypeRules:[{ required:true }],
    projectRules:[{ required:true }],
    lcNoRules:[],
    systemRules:[]
}


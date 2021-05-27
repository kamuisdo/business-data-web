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
        let { areaRules,provinceRules,cityRules,projectRules,projectTypeRules,lcNoRules,systemRules,innerRules,hideFrom } = this.props;
        let ifHideProject = hideFrom === '物件'
        let ifHideLcNo = ['物件','LcNo'].indexOf(hideFrom) >= 0
        let ifHideSystem = ['物件','LcNo','系统'].indexOf(hideFrom) >= 0
        let ifHideInner = ['物件','LcNo','系统','内机'].indexOf(hideFrom) >= 0
        console.log(hideFrom);
        console.log(ifHideInner);
        return (
            <>
                <div className="searchForm-row">
                    <Form.Item
                        label="地区"
                        name="regionCode"
                        rules={areaRules}
                    >
                        <ApiSelect
                            placeholder="请选择地区"
                            ref={this.areaRef}
                            requestFn={api.getRegionInfo}
                            textField="text"
                            valueField="value"
                            formfield="regionCode"
                            cascadeBy={[this.provinceRef]}
                        />
                    </Form.Item>
                    <Form.Item
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
                    </Form.Item>
                    <Form.Item
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
                    </Form.Item>
                    <Form.Item
                        label="物件类型"
                        name="buildingType"
                        rules={projectTypeRules}
                    >
                        <ApiSelect
                            placeholder="请选择物件类型"
                            showSearch={true}
                            ref={this.projectTypeRef}
                            requestFn={api.getProjectType}
                            cascading={this.cityRef}
                            cascadeBy={[this.projectRef]}
                            textField="value"
                            valueField="id"
                            formfield="buildingType"
                        />
                    </Form.Item>
                </div>

                <div className="searchForm-row">
                    {
                        !ifHideProject && <Form.Item
                            label="物件"
                            name="buildingId"
                            rules={projectRules}
                        >
                            <ApiSelect
                                placeholder="请选择物件"
                                showSearch={true}
                                ref={this.projectRef}
                                requestFn={api.getProjectList}
                                textField="buildingName"
                                valueField="buildingId"
                                formfield="buildingId"
                                cascadeBy={[this.lcNoRef]}
                                cascading={this.projectTypeRef}
                                cascadeParams={(value)=>{
                                    // 获取之前几个的值作为搜索条件
                                    return {
                                        regionCode:this.areaRef.current.state.value,
                                        provinceCode:this.provinceRef.current.state.value,
                                        cityCode:this.cityRef.current.state.value,
                                        buildingType:value
                                    }
                                }}
                            />
                        </Form.Item>
                    }
                    {
                        !ifHideLcNo && <Form.Item
                            label="LCNo"
                            name="terminalId"
                            rules={lcNoRules}
                        >
                            <ApiSelect
                                placeholder="请选择LCNo"
                                showSearch={true}
                                ref={this.lcNoRef}
                                requestFn={api.getLcNoList}
                                textField="lcNo"
                                valueField="terminalId"
                                formfield="terminalId"
                                cascadeBy={[this.systemRef]}
                                cascading={this.projectRef}
                                cascadeParams={(value)=>{
                                    return { buildingId:value }
                                }}
                            />
                        </Form.Item>
                    }
                    {
                        !ifHideSystem && <Form.Item
                            label="系统"
                            name="lineId"
                            rules={systemRules}
                        >
                            <ApiSelect
                                placeholder="请选择系统"
                                showSearch={true}
                                ref={this.systemRef}
                                requestFn={api.getSystemList}
                                textField="lineName"
                                valueField="lineId"
                                formfield="lineId"
                                cascading={this.lcNoRef}
                                cascadeBy={[this.innerRef]}
                                cascadeParams={(value)=>{
                                    return { terminalId:value }
                                }}
                            />
                        </Form.Item>
                    }
                    {
                        !ifHideInner && <Form.Item
                            label="内机"
                            name="unitId"
                            rules={innerRules}
                        >
                            <ApiSelect
                                placeholder="请选择室内机"
                                showSearch={true}
                                ref={this.innerRef}
                                requestFn={api.getInnerList}
                                textField="unitId"
                                valueField="unitId"
                                formfield="unitId"
                                cascading={this.systemRef}
                                cascadeParams={(value)=>{
                                    return { lineId:value }
                                }}
                            />
                        </Form.Item>
                    }

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
    systemRules:PropTypes.array,
    innerRules:PropTypes.array,
    hideFrom:PropTypes.string
}

ProjectCascadeSelector.defaultProps = {
    areaRules:[{ required:true }],
    provinceRules:[{ required:true }],
    cityRules:[{ required:true }],
    projectTypeRules:[{ required:true }],
    projectRules:[{ required:true }],
    lcNoRules:[],
    systemRules:[],
    innerRules:[]
}


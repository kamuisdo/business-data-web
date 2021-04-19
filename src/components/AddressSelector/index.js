import React from 'react';
import { Form, Select, Cascader } from 'antd';
import './index.less'
const { Option } = Select;


/**
 * 省、市、项目 联动下拉框
 */
export default class AddressSelector extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            provinceList:[],
            cityList:[],
            projectList:[],
            province:null,
            city:null,
            project:''

        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        // 获取省份数据
    }

    handleChange(type,value,option){
        console.log(`AddressSelector handleChange`)
        console.log(type,value,option);
        this.props.onChange(type,value)
    }

    render() {
        let {fieldName,labelText,onChange} = this.props;
        return (
            <>
                <Form.Item name="provinceCode" label="省">
                    {/*<Cascader onChange={onChange} />*/}
                    <Select
                        style={{width:180}}
                        // value={this.state.province}
                        className="addressSelectorItem"
                        placeholder="请选择省份"
                        onChange={this.handleChange.bind(this,'province')}
                        allowClear
                    >
                        <Option value="上海市">上海市</Option>
                        <Option value="北京市">北京市</Option>
                        <Option value="广东省">广东省</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="cityCode" label="市">
                    <Select
                        style={{width:180}}
                        placeholder="请选择市"
                        // value={this.state.city}
                        onChange={this.handleChange.bind(this,'city')}
                        allowClear
                    >
                        <Option value="上海">上海</Option>
                        <Option value="北京">北京</Option>
                        <Option value="广州">广州</Option>
                        <Option value="珠海">珠海</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="Project" label="项目">
                    <Select
                        style={{width:180}}
                        // value={this.state.project}
                        placeholder="请选择项目"
                        onChange={this.handleChange.bind(this,'project')}
                        allowClear
                    >
                        <Option value="项目1">项目1</Option>
                        <Option value="项目2">项目2</Option>
                    </Select>
                </Form.Item>
            </>
        )
    }
}
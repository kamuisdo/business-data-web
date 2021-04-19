import React from "react";
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray'


import {Button,Divider, Select} from "antd";

const {Option} = Select;

// 递归调用cascadeByList
function cascadeAll(byList,currentVal){
    if(byList && byList.length > 0){
        byList.map((ref)=>{
            if(ref&&ref.current&&ref.current.cascadeChange){
                ref.current.cascadeChange(currentVal);
                cascadeAll(ref.current.props.cascadeBy,null)
            }
        })
    }
}

/**
 * 包装ant Select 请求远程API，显示loading，搜索时加入节流
 */
export default class ApiSelect extends React.Component{

    constructor(props) {
        super(props);
        let {cascading,disabled,initialParams,cascadeParams} = this.props;
        // 取到初始的cascading的值
        let cascadingVal = cascading && cascading.current && cascading.current.state ? cascading.current.state.value : null;
        this.cascadingVal = cascadingVal;
        // 判断初始的cascadingVal是否有值
        let hasCascadingVal = cascadingVal !== undefined && cascadingVal !== null
        this.hasCascadingVal = hasCascadingVal;
        this.state = {
            loading:hasCascadingVal, // 没有联动的话就直接请求数据
            ifError:false,
            apiDisabled: cascading ? ( hasCascadingVal ? disabled : true ) : disabled,
            value:null,
            data:[]
        }
        // 初始的参数，应对cascading的Select在已经有值的情况下，加载了监听他的Select，此Select应该根据初始值获取下拉框数据，接触disable状态
        // 如果有初始值并且设置返回初始值参数的方法则调用，生成默认的cascadeParamsData
        // initialParams 默认取cascadeParams
        let initialParamsFn = initialParams || cascadeParams;
        this.cascadeParamsData = hasCascadingVal && initialParamsFn ? initialParamsFn(cascadingVal) : {};
        this.loadData = this.loadData.bind(this)
        this.cascadeOnChange = this.cascadeOnChange.bind(this)
        this.cascadeChange = this.cascadeChange.bind(this)
    }


    componentDidMount() {
        // console.log(this.hasCascadingVal)
        let {cascading} = this.props;
        if(!cascading || this.hasCascadingVal){
            this.loadData()
        }
    }


    loadData(){
        let {requestFn,query,valueField} = this.props;
        let cascadeParamsData = this.cascadeParamsData;
        this.setState({
            loading:true
        })
        requestFn(Object.assign(cascadeParamsData,query)).then((data)=>{
            if(!isArray(data)){ throw new Error('APISelect Error：requestFn需要返回数组')}
            data = data.map((v)=>{
                return Object.assign(v,{ key:v[valueField] })
            })
            this.setState({
                loading:false,
                apiDisabled:false,
                value:null, // 加载成功之后重置原来的选中的值
                data:data
            })
        }).catch((err)=>{
            this.setState({
                loading:false,
                apiDisabled:false,
                ifError:true
            })
        })
    }

    // 需要被联动组件ref调用
    cascadeChange(value){
        // console.log(`---- ${this.props.id} cascadeChange ----`)
        if(!value){
            this.setState({
                apiDisabled:true,
                value:null, // 加载成功之后重置原来的选中的值
            })
        }else {
            let params = this.props.cascadeParams ? this.props.cascadeParams(value): {};
            this.cascadeParamsData = params
            this.loadData()
        }
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    cascadeOnChange(value,option){
        let {cascadeBy=[],onChange=()=>{}} = this.props;
        // console.log(`---- ${this.props.id} cascadeOnChange ----`)
        // console.log(value,option)
        onChange(value,option)
        this.setState({
            value
        })
        // 调用所有联动的
        cascadeAll(cascadeBy,value)
        // cascadeBy.map((ref)=>{
        //     console.log('---- 联动调用 ----')
        //     console.log(ref)
        //     if(ref.current.cascadeChange){
        //         ref.current.cascadeChange(value)
        //     }
        // })
    }




    render() {
        let {data,loading,apiDisabled,value} = this.state;
        let {valueField,textField,dropdownRender,style,disabled,cascading,cascadeBy,cascadeParams,requestFn,allowClear,...rest} = this.props;
        let apiDropDownRender = (menu)=>{
            let {loading,ifError} = this.state;
            let menuDom = dropdownRender ? dropdownRender(menu) : menu;
            let text = ifError ? '数据获取失败，重新获取':'刷新';
            let errorNode = <div><Button size="small" danger={ifError} onClick={this.loadData} type="link">{text}</Button></div>
            let successNode = (
                <div>
                    {menuDom}
                    <Divider style={{ margin: '4px 0' }} />
                    <Button size="small" danger={ifError} onClick={this.loadData} type="link">{text}</Button>
                </div>
            )
            return loading ? <div>数据加载中</div> :( ifError ? errorNode : successNode )
        }
        let apiStyle = Object.assign({
            width:'12vw'
        },style)

        return (
            <>
                <Select {...rest}
                        value={value}
                        style={apiStyle}
                        dropdownRender={apiDropDownRender}
                        onChange={this.cascadeOnChange}
                        allowClear={allowClear !== false}
                        disabled={apiDisabled}
                        optionFilterProp="children"   // 搜索文本不搜索value
                        loading={loading}>
                    {
                        data.map((item)=>{
                            let val = item[valueField]
                            let text = item[textField]
                            return <Option key={val} value={val}>{text}</Option>
                        })
                    }
                </Select>
            </>
        )
    }
}

ApiSelect.propTypes = {
    valueField:PropTypes.string.isRequired,
    textField:PropTypes.string.isRequired,
    requestFn:PropTypes.func.isRequired,
    query:PropTypes.object,
    cascading:PropTypes.object,   // 根据那个APISelect的实例联动，refs对象
    cascadeBy:PropTypes.array,   // 被那些组件联动
    cascadeParams:PropTypes.func,   // 获取联动组件的请求参数，返回对象
}

ApiSelect.defaultProps = {
    valueField:'id',
    textField:'value'
}


import React from "react";
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray'


import {Button,Divider, Select} from "antd";

const {Option} = Select;

/**
 * 包装ant Select 请求远程API，显示loading，搜索时加入节流
 */
export default class ApiSelect extends React.Component{

    constructor(props) {
        super(props);
        let {cascading,disabled} = this.props;
        this.state = {
            loading:!cascading, // 没有联动的话就直接请求数据
            ifError:false,
            apiDisabled:cascading ? true : disabled,
            cascadeParamsData:{},
            data:[]
        }
        this.loadData = this.loadData.bind(this)
        this.cascadeOnChange = this.cascadeOnChange.bind(this)
        this.cascadeChange = this.cascadeChange.bind(this)
    }


    componentDidMount() {
        if(!this.props.cascading){
            this.loadData()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData()
    }

    loadData(){
        let {request,query} = this.props;
        let {cascadeParamsData} = this.state;
        request(Object.assign(cascadeParamsData,query)).then((data)=>{
            if(!isArray(data)){ throw new Error('APISelect Error：request需要返回数组')}
            this.setState({
                loading:false,
                data:data
            })
        }).catch((err)=>{
            this.setState({
                loading:false,
                ifError:true
            })
        })
    }

    // 需要被联动组件ref调用
    cascadeChange(value){
        let params = this.props.cascadeParams(value);
        this.setState({
            cascadeParamsData:params
        })
        this.loadData()
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    cascadeOnChange(value,option){
        let {cascadeBy=[],onChange} = this.props;
        onChange(value,option)
        // 调用所有联动的
        cascadeBy.map((ref)=>{
            ref.current.cascadeChange(value)
        })
    }


    render() {
        let {data,loading,apiDisabled} = this.state;
        let {valueField,textField,dropdownRender,style,disabled,cascading,cascadeBy,...rest} = this.props;
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
                        style={apiStyle}
                        dropdownRender={apiDropDownRender}
                        onChange={this.cascadeOnChange}
                        disabled={apiDisabled}
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
    request:PropTypes.func.isRequired,
    query:PropTypes.object,
    cascading:PropTypes.bool,   // 是否跟随某个selector联动
    cascadeBy:PropTypes.array,   // 被那些组件联动
    cascadeParams:PropTypes.func,   // 获取联动组件的请求参数，返回对象
}

ApiSelect.defaultProps = {
    valueField:'id',
    textField:'value'
}


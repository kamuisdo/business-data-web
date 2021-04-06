import React from "react";
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray'


import {Button,Divider, Select} from "antd";

const {Option} = Select;

// 递归调用cascadeByList
function cascadeAll(byList,currentVal){
    if(byList && byList.length > 0){
        byList.map((ref)=>{
            if(ref.current.cascadeChange){
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
        let {cascading,disabled} = this.props;
        this.state = {
            loading:!cascading, // 没有联动的话就直接请求数据
            ifError:false,
            apiDisabled:cascading ? true : disabled,
            value:null,
            data:[]
        }
        this.cascadeParamsData = {}
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
        // this.loadData()
        // console.log('---- componentDidUpdate -----')
        // console.log(prevState)
        // console.log(prevProps)
        // console.log(snapshot)

    }

    loadData(){
        let {requestFn,query} = this.props;
        let cascadeParamsData = this.cascadeParamsData;
        this.setState({
            loading:true
        })
        requestFn(Object.assign(cascadeParamsData,query)).then((data)=>{
            if(!isArray(data)){ throw new Error('APISelect Error：requestFn需要返回数组')}
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
            let orgParams = this.cascadeParamsData;
            let newParams = this.props.cascadeParams(value);
            if(orgParams !== newParams){
                this.cascadeParamsData = newParams
                this.loadData()
            }
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
        let {valueField,textField,dropdownRender,style,disabled,cascading,cascadeBy,cascadeParams,requestFn,...rest} = this.props;
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
    requestFn:PropTypes.func.isRequired,
    query:PropTypes.object,
    cascading:PropTypes.bool,   // 是否跟随某个selector联动
    cascadeBy:PropTypes.array,   // 被那些组件联动
    cascadeParams:PropTypes.func,   // 获取联动组件的请求参数，返回对象
}

ApiSelect.defaultProps = {
    valueField:'id',
    textField:'value'
}


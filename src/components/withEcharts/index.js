import React from 'react';
import * as echarts from "echarts";
import {Button} from 'antd'
import deepmerge from "deepmerge";
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import ErrorChart from "../ErrorChart";

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function myMerge(obj,defaultOpt){
    if(isArray(obj)){
        return obj.map((v)=>{
            return deepmerge(defaultOpt,v)
        })
    }
    if(isPlainObject(obj)){
        return deepmerge(defaultOpt,obj)
    }
    return obj
}

/**
 * 配置echarts通用的配置
 * 实现window.resize时的重新渲染
 * @param WrappedComponent
 * @returns {WithEcharts}
 */
export default function withEcharts(WrappedComponent){
    class WithEcharts extends React.Component{

        constructor(props) {
            super(props);
            this.instanceRef = React.createRef()
            this.chartResize = this.chartResize.bind(this);
            this.getOptionWithDefault = this.getOptionWithDefault.bind(this)
            this.initEcharts = this.initEcharts.bind(this)
            this.state = {
                ifError:false
            }
            this.handleReload = this.handleReload.bind(this)
            // this.handleRef = this.handleRef.bind(this)
        }

        componentDidMount() {
            // console.log(`----- ${WithEcharts.displayName} componentDidMount -----`)
            // console.log(this.instanceRef)
            window.addEventListener('resize', this.chartResize);
        }

        // componentDidUpdate(prevProps, prevState, snapshot){
        //     // 比较query是不是发生变化，query变化了之后，调用组件的loadData方法
        //     // console.log('---- WithEcharts componentDidUpdate -----')
        //     // console.log(prevProps)
        //     // console.log(this.props)
        //     if(this.props.query && (prevProps.query !== this.props.query)){
        //         if(!this.instanceRef.current.loadData){
        //             throw new Error(`withEcharts组件需要实现loadData方法`)
        //         }
        //        // this.instanceRef.current.loadData()
        //     }
        // }


        chartResize(){
            // console.log(`----- ${WithEcharts.displayName} withEcharts chartResize -----`)
            // console.log(this.instanceRef.current)
            let instance = this.instanceRef.current ? this.instanceRef.current.instance : null;
            if(instance){
                instance.resize()
            }
        }


        // 获取默认的全局echarts设置
        getOptionWithDefault(opt={}){

            let defaultOpt = {
                grid:{
                    // 使得图表撑满整个div
                    top:"80px",
                    left:"50px",
                    right:"50px",
                    bottom:"50px",
                    backgroundColor: '#fff',
                    width:"auto", //图例宽度
                    height:"65%", //图例高度
                },
                title:{         // 默认title在左上角
                    top:0,
                    left:'left',
                    textStyle:{
                        color:'#1B253A',
                        fontWeight:'bold',
                        fontSize:14
                    }
                },
                tooltip: {      // 默认x轴触发
                    trigger: 'axis'
                },
                legend:{
                    right:20,
                    top: 'top',
                    orient:'horizontal',
                    icon:'circle',
                    itemHeight:10,
                    itemWidth:10,
                    textStyle:{
                        color:'#7A8392'
                    }
                }
            }
            let yAxisDefaultOpt = {
                splitLine:{
                    lineStyle:{
                        color:['#E5E9ED'],
                        type:'dashed',
                        opacity:0.8
                    }
                }
            }
            // 柱状图默认设置
            let barSeriesDefaultOpt = {
                itemStyle: {
                    borderRadius: 3
                },
                barWidth:6  //柱状图的宽度
            }
            // 折线图默认设置
            let lineSeriesDefaultOpt = {
                symbolSize:7,
                lineStyle:{
                    width: 1
                }
            }
            // 先把最外层没有数组的合并掉
            let commonMerged = deepmerge(defaultOpt,opt)
            // 合并Y轴设置
            commonMerged.yAxis = myMerge(commonMerged.yAxis,yAxisDefaultOpt)
            // 合并图表设置
            if(commonMerged.series && commonMerged.series.length>0){
                commonMerged.series = commonMerged.series.map((seriesItem)=>{
                    if(seriesItem.type === 'bar'){
                        return deepmerge(barSeriesDefaultOpt,seriesItem)
                    }
                    if(seriesItem.type === 'line'){
                        return deepmerge(lineSeriesDefaultOpt,seriesItem)
                    }
                    return seriesItem
                })
            }

            return commonMerged
        }

        // echarts实例化
        initEcharts(dom,theme=null,opt={locale:'ZH'}){
            return echarts.init(dom,theme,opt)
        }


        // 加载失败之后重新加载
        handleReload(){
            this.setState({ ifError:false })
        }
        //
        // handleRef(el){
        //     console.log(`----- ${WithEcharts.displayName} handleRef -----`)
        //     console.log(el)
        //     this.instanceRef = el
        // }

        componentWillUnmount() {
            window.removeEventListener('resize', this.chartResize)
            this.setState = (state,callback)=>{
                return;
            };
        }


        render() {
            // console.log(`withEcharts render`)
            let {requestFn,...rest} = this.props;
            // 对请求数据的方法加工loading效果和错误处理
            let tempFn = requestFn
            if(requestFn){
                tempFn = (...arg)=>{
                    // console.log(`----- ${WithEcharts.displayName} requestFn -----`)
                    // console.log(that.instanceRef)
                    // console.log(that.instanceRef.current)
                    // console.log(arg)
                    let instance = arg[0]
                    let params = arg[1]
                    instance.showLoading()
                    return requestFn(params).then((data)=>{
                        instance.hideLoading();
                        return data
                    }).catch((err)=>{
                        console.log(`----- ${WithEcharts.displayName} requestFn Catch -----`)
                        instance.hideLoading();
                        this.setState({ ifError:true })
                    })
                }
            }
            let errorNode = <ErrorChart handleClick={this.handleReload}/>
            // console.log('-------- withEcharts render --------')

            return this.state.ifError ? errorNode : <WrappedComponent {...rest}
                                                                      requestFn={tempFn}
                                                                      initEcharts={this.initEcharts}
                                                                      getOptionWithDefault={this.getOptionWithDefault}
                                                                      ref={this.instanceRef}/>
        }
    }

    WithEcharts.displayName = `withEcharts(${getDisplayName(WrappedComponent)})`;

    return WithEcharts;
}
import React from 'react';
import * as echarts from "echarts";
import deepmerge from "deepmerge";
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'

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
        }

        componentDidMount() {
            window.addEventListener('resize', this.chartResize);
            this.loading()
        }

        componentDidUpdate(prevProps, prevState, snapshot){
            this.loading()
        }

        componentWillUnmount() {
            // console.log('withEcharts componentWillUnmount')
            window.removeEventListener('resize', this.chartResize)
        }

        chartResize(){
            let instance = this.instanceRef.current.instance;
            if(!instance){
                throw new Error(`withEcharts Error: 被包装的组件必须要有instance实例属性指向echarts实例`)
            }
            instance.resize()
        }

        loading(){
            // let instance = this.instanceRef.current.instance;
            // let {seriesData} = this.props;
            // // series props 指定是null的时候才执行加载动画
            // if(seriesData === null){
            //     instance.showLoading()
            // }else {
            //     instance.hideLoading()
            // }
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

        render() {
            // console.log(`withEcharts render`)
            return <WrappedComponent {...this.props}
                                     initEcharts={this.initEcharts}
                                     getOptionWithDefault={this.getOptionWithDefault}
                                     ref={this.instanceRef}/>
        }
    }

    WithEcharts.displayName = `withEcharts(${getDisplayName(WrappedComponent)})`;

    return WithEcharts;
}
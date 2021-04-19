import React from "react";
import withEcharts from "../../../components/withEcharts";
import PropTypes from 'prop-types'
import ErrorChart from "../../../components/ErrorChart";
import max from 'lodash/max'
import min from 'lodash/min'
import maxBy from 'lodash/maxBy'
import throttle from 'lodash/throttle'
import { Slider } from 'antd';

class AirMap extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
        this.state = { time:null }
        this.sliderKey = []
        this.handleSliderChange = this.handleSliderChange.bind(this)
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault,id,title,data,sensor,unitText } = this.props;
        let chartDom = document.getElementById(id);
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let that = this;
        if(data === null){
            myChart.showLoading();
            return
        }
        if(data === false){
            return;
        }
        // 生成xy轴
        let xData = this.createAxis('x',sensor);
        let yData = this.createAxis('y',sensor)
        // 默认展示第一天
        let firstDay = data[0].data[0][0];
        this.setState({ time:firstDay })
        // 根据Day获取数据
        let dayData = this.getDataByDay(data,firstDay)
        // 计算可视化的最大值和最小值
        let {maxVal,minVal} = this.getMaxMin(dayData)
        let {series} = this.updateSeries(dayData,firstDay);
        let option = getOptionWithDefault({
            grid:{
                // 使得图表撑满整个div
                // top:"80px",
                left:"20px",
                right:"20px",
                // bottom:"50px",
                // backgroundColor: '#fff',
                // width:"auto", //图例宽度
                // height:"65%", //图例高度
            },
            title:{
                text:title
            },
            legend:{
                show:false
            },
            tooltip: {
                trigger: 'item',
                formatter: (params)=>{
                    console.log(params)
                    let {seriesName,data,marker} = params;
                    let sensorItem = that.getSensorNameByPosition(sensor,data[0],data[1])
                    let sensorName = sensorItem ? sensorItem.name : 'Error'
                    return `${seriesName}<br>${marker}${sensorName}：${data[2]}${unitText}`
                }
            },
            yAxis: [
                {
                    type: 'category',
                    data:yData,
                    axisLine:{
                        show:false
                    },
                    splitArea: {
                        show: true
                    }
                }
            ],
            xAxis: {
                type: 'category',
                data:xData,
                axisLine:{
                    show:false
                },
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: minVal,
                max: maxVal,
                calculable: true,
                orient: 'horizontal',
                right: 'right',
                top: 'top',
                itemWidth:8,
                itemHeight:200,
                formatter: function (value) {
                    return `${Math.floor(value)}${unitText}`
                },
                inRange: {
                    color: ["#42B0F5", "#86CEFA", "#F9FC0F", "#FD4400"]
                }
            },
            series: series
        })
        console.log(option)
        myChart.setOption(option);

        this.initXAxisChart()
    }


    // 根据sensor数据得到xy轴
    createAxis(key,sensor){
        let temp = sensor.map((v)=>{ return v.position })
        let maxVal = maxBy(temp,[key])
        let t = [];
        for(let i=0;i<=maxVal;i++){
            t.push(i)
        }
        return t
    }

    // 根据坐标返回传感器名称
    getSensorNameByPosition(sensor,x,y){
        return sensor.find((v)=>{
            return v.position.x === x && v.position.y === y
        })
    }

    // 设置参数
    updateSeries(dayData,defaultDay){
        let {getDefaultSeriesOpt,sensor} = this.props
        let day = this.state.time || defaultDay;
        let data = dayData.map((v,i)=>{
            let position = sensor[i].position;
            let disabled = sensor[i].disabled;
            let val = disabled ? '-' : v;
            return [position.x,position.y,val]
        })
        let series = [{
            data,
            type: 'heatmap',
            label: {
                show: true
            },
            name:day
        }]
        return getDefaultSeriesOpt({series})
    }


    // 获取当天的传感器的数据
    getDataByDay(data,day){
        let index = null;
        let t = data.map((v)=>{
            let list = v.data;
            // 没有index就先找index
            if(index===null){
                for(let i=0;i<list.length;i++){
                    if(list[i][0] === day){
                        index = i
                    }
                }
            }
            return list[index][1]
        })
        return t
    }

    // 获取当前时间的最大值和最小值
    // dayData是一天的数据
    getMaxMin(dayData){
        let maxVal = max(dayData)
        let minVal = min(dayData)
        return { maxVal,minVal }
    }

    // slider的值发生变化时，更新热力图
    handleSliderChange(value){
        let that = this;
        let t = throttle((value)=>{
            let {data} = that.props
            let time = that.sliderKey[value];
            that.setState({ time })
            let dayData = this.getDataByDay(data,time)
            let {maxVal,minVal} = this.getMaxMin(dayData)
            let {series} = this.updateSeries(dayData);
            that.instance.setOption({
                series,
                visualMap: {
                    min: minVal,
                    max: maxVal
                }
            });
        },1000)
        if(value){
            t(value)
        }

    }

    // 创建刻度echarts
    initXAxisChart(){
        let { initEcharts,id,data } = this.props;
        let chartDom = document.getElementById(`${id}_xAxis`);
        let myChart = initEcharts(chartDom);
        let seriesData = data&&data[0] ? data[0].data.map((v)=>{ return [v[0],'-'] }):[]
        let option = {
            grid:{
                // 使得图表撑满整个div
                // top:"80px",
                left:"20px",
                right:"0px",
                // bottom:"50px",
                // backgroundColor: '#fff',
                width:"auto", //图例宽度
                // height:"65%", //图例高度
            },
            legend:{
                show:false
            },
            yAxis: [
                {
                    type: 'category',
                    data:[],
                    axisLine:{
                        show:false
                    }
                }
            ],
            xAxis: {
                type: 'time',
                axisLine:{
                    show:true
                }
            },
            series: [{
                type:'line',
                data:seriesData
            }]
        }
        myChart.setOption(option)
    }

    render() {
        let {id,data,handleRefresh} = this.props;
        let {time} = this.state;
        // 获取时间刻度
        let sliderKey = data&&data[0] ? data[0].data.map((v)=>{ return v[0] }) : []
        this.sliderKey = sliderKey;
        return  (data===false) ? <ErrorChart handleClick={handleRefresh}/> : <div style={{position:'relative'}}>
            <div id={id} style={{height:'360px'}}></div>
            <div id={`${id}_xAxis`} style={{height:'80px',width:'calc(100% - 20px)',position:'absolute',zIndex:99,bottom: '-15px'}}></div>
            <span style={{ position:'absolute',bottom: '14px',color:'#7A8392'}}>{time}</span>
            <div style={{width:'calc(100% - 20px)',position:'absolute',marginLeft:'13px',zIndex:100,bottom:'-10px'}}>
                <Slider defaultValue={0}
                        tipFormatter={(value)=>{return sliderKey[value] }}
                        onChange={this.handleSliderChange}
                        min={0} max={sliderKey.length-1}/>
            </div>

        </div>
    }
}

export default class AirMapChart extends React.PureComponent{

    render() {

        let AirMapChart = withEcharts(AirMap)
        return (<AirMapChart {...this.props}/>)
    }
}

AirMapChart.propTypes = {
    id:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    sensor:PropTypes.array.isRequired,
    unitText:PropTypes.string.isRequired,
    data:PropTypes.any,
}
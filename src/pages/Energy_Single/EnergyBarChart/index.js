import React from "react";
import withEcharts from "../../../components/withEcharts";
import {TimeTypeEnum} from '../../../enum/timeType';
import dayjs from 'dayjs';

class EnergyBar extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidMount() {
        let { initEcharts,getOptionWithDefault,data } = this.props;
        let chartDom = document.getElementById('EnergyBarChart');
        let myChart = initEcharts(chartDom);
        let series = this.updateSeries(data)
        this.instance = myChart;
        let option = getOptionWithDefault({
            title:{
                text:'电力消耗可视化报表'
            },
            yAxis: [
                {
                    type: 'value',
                    boundaryGap: false,
                    name:'耗电量(kw.h)'
                },
                {
                    type: 'value',
                    boundaryGap: false,
                    name:'室外气温',
                    axisLabel:{
                        formatter:function (value){ return `${value}°` }
                    }
                }
            ],
            xAxis: {
                type: 'time',
                boundaryGap: false
            },
            series: series
        })
        myChart.setOption(option);

        if(data === null){
            myChart.showLoading();
        }else{
            myChart.hideLoading();
        }
        
    }

    // 设置line的参数
    updateSeries(data){
        if(!data || data.length === 0){
            return []
        }
        let {getDefaultSeriesOpt,query} = this.props;
        let warm =[]
        let cold = [];
        let temper =[];
        let format = TimeTypeEnum.get(query.timeType).format;
        data.forEach((v)=>{
            let time = dayjs(v.recordDate).format(format)
            warm.push([time,v.hotElectric])
            cold.push([time,v.coldElectric])
            temper.push([time,v.maxWeather])
        })
        let series = [
            {
                name:'暖房',
                type:'bar',
                yAxisIndex:0,
                itemStyle: {
                    color: '#FD507C',
                    borderRadius: 1,
                    opacity:0.5
                },
                barGap:'-100%',
                barWidth:2,
                data:warm
            },
            {
                name:'冷房',
                type:'bar',
                yAxisIndex:0,
                itemStyle: {
                    color: '#2B6AFF',
                    borderRadius: 1,
                    opacity:0.5
                },
                barWidth:2,
                data:cold
            },
            {
                name:'室外气温',
                type: 'line',
                yAxisIndex:1,
                itemStyle: {
                    color: '#B9B9B9'
                },
                lineStyle:{
                    width: 2
                },
                showSymbol: false,
                data:temper
            }
        ]
        return getDefaultSeriesOpt({ series }).series
    }

    render() {
        return (<div id="EnergyBarChart" style={{height:'360px',width:'100%'}}></div>)
    }
}

export default class EnergyBarChart extends React.PureComponent{

    render() {
        let EnergyBarChart = withEcharts(EnergyBar)
        return (<EnergyBarChart {...this.props}/>)
    }
}
import React from "react";
import withEcharts from "../../../components/withEcharts";

class OnlineCountBar extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault,data } = this.props;
        let chartDom = document.getElementById('OnlineCountBarChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let series = this.updateSeries(data)
        let option = getOptionWithDefault({
            title:{
                text:'在线数量分析表'
            },
            yAxis: [
                {
                    type: 'value',
                    boundaryGap: false,
                    name:'在线数量'
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
        let warm = [];
        let cold = []
        let temper = []
        data.forEach((t)=>{
            warm.push([t.recordDate,t.hot])
            cold.push([t.recordDate,t.cold])
            temper.push([t.recordDate,t.maxWeather])
        })
        let {getDefaultSeriesOpt} = this.props;
        // console.log(warm);
        // console.log(cold);
        // console.log(temper);
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
                barWidth:2,
                barGap:'-100%',
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
        return (<div id="OnlineCountBarChart" style={{height:'360px'}}></div>)
    }
}

export default class OnlineCountBarChart extends React.PureComponent{

    render() {
        let OnlineCountBarChart = withEcharts(OnlineCountBar)
        return (<OnlineCountBarChart {...this.props}/>)
    }
}
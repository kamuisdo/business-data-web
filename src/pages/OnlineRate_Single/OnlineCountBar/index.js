import React from "react";
import withEcharts from "../../../components/withEcharts";

class OnlineCountBar extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        let series = this.updateSeries();
        let option = {
            series: series
        }
        this.instance.setOption(option);
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('OnlineCountBarChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let series = this.updateSeries();
        let option = getOptionWithDefault({
            title:{
                text:'在线数量分析表'
            },
            // legend:{
            //     left:'center'
            // },
            // tooltip:{
            //   formatter:'{b0}: {c0}<br />{b1}: {c1}'
            // },
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

    }

    // 设置line的参数
    updateSeries(){
        let { seriesData } = this.props
        let { warm,cold,temper } = seriesData;
        return [
            {
                name:'暖房',
                type:'bar',
                yAxisIndex:0,
                itemStyle: {
                    color: '#FD507C',
                    borderRadius: 1
                },
                barWidth:2,
                data:warm
            },
            {
                name:'冷房',
                type:'bar',
                yAxisIndex:0,
                itemStyle: {
                    color: '#2B6AFF',
                    borderRadius: 1
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
    }

    render() {
        return (<div id="OnlineCountBarChart" style={{height:'360px'}}></div>)
    }
}

export default class OnlineCountBarChart extends React.Component{

    render() {
        let OnlineCountBarChart = withEcharts(OnlineCountBar)
        return (<OnlineCountBarChart {...this.props}/>)
    }
}
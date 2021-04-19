import React from "react";
import withEcharts from "../../../components/withEcharts";

class OnlineCountBar extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('OnlineCountBarChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
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
            series: []
        })
        myChart.setOption(option);
        this.loadData()
    }

    loadData(){
        let {query,requestFn} = this.props;
        return requestFn(this.instance,query).then((data)=>{
            this.updateSeries(data)
        })
    }

    // 设置line的参数
    updateSeries(data){
        let { warm,cold,temper } = data;
        let {getDefaultSeriesOpt} = this.props;
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
        this.instance.setOption(getDefaultSeriesOpt({ series }))
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
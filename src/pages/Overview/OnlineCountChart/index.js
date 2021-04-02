import React from "react";
import * as echarts from "echarts";
import withEcharts from "../../../components/withEcharts";

class OnlineCount extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        let series = this.updateSeries();
        let option = {
            series: series
        }
        console.log(option)
        this.instance.setOption(option);
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('onlineCountChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let series = this.updateSeries();
        let option = getOptionWithDefault({
            title:{
                text:'智能VRV在线数'
            },
            yAxis: [
                {
                    type: 'value',
                    boundaryGap: false,
                    name:'物件数(家)'
                },
                {
                    type: 'value',
                    boundaryGap: false,
                    name:'系统数(套)'
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
        let {seriesData} = this.props;
        if(!seriesData){ return  }
        let {sysData,projectData} = seriesData;
        let option = {
            type: 'line',
            smooth: true,
            showSymbol: false,
            sampling: 'average',
            lineStyle:{
                width: 1
            }
        }
        return [
            Object.assign({},option,{
                name:'系统数',
                yAxisIndex:1,
                itemStyle: {
                    color: '#2B6AFF'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(58,77,233,0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(58,77,233,0.01)'
                    }])
                },
                data:sysData
            }),
            Object.assign({},option,{
                name:'物件数',
                yAxisIndex:0,
                itemStyle: {
                    color: '#8c54ff'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(140,84,255,0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(140,84,255,0.01)'
                    }])
                },
                data:projectData
            })
        ]
    }

    render() {
        return (<div id="onlineCountChart" style={{height:'300px'}}></div>)
    }
}

export default class OnlineCountChart extends React.Component{

    render() {
        let OnlineCountChart = withEcharts(OnlineCount)
        return (<OnlineCountChart {...this.props}/>)
    }
}
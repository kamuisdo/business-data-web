import React from "react";
import * as echarts from "echarts";
import dayjs from "dayjs";

export default class TimeLineChart extends React.Component{
    constructor(props) {
        super(props);
        this.instance = null;
    }

    createData(){
        // 从2020年的1-1开始
        let orgDate = dayjs('2020-01-01');
        let orgVal = Math.floor(Math.random() * 300)
        let data = [[orgDate.format('YYYY/MM/DD'),orgVal]]
        for(let i=0;i<365;i++){
            data.push([
                orgDate.add(i+1,'day').format('YYYY/MM/DD'),
                orgVal+=Math.floor(Math.random() * 20)
            ]);
        }
        return data;
    }

    componentDidMount() {
        let chartDom = document.getElementById(this.props.id);
        let myChart = echarts.init(chartDom,null,{locale:'ZH'});
        this.instance = myChart;
        let option;
        let data1 = this.createData();
        let data2 = this.createData();

        option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            toolbox: {
                show:false,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'time',
                boundaryGap: false,
            },
            yAxis: {
                type: 'value',
                boundaryGap: false
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 20
            }, {
                start: 0,
                end: 20
            }],
            series: [
                {
                    name: '在线系统套数',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    data: data1
                },
                {
                    name: '在线室内机台数',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    data: data2
                }
            ]
        };

        option && myChart.setOption(option);
    }

    render() {
        let {id} = this.props;
        return (<div id={id} style={{width:'100%',height:'30vw'}} />)
    }
}
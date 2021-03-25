import React from "react";
import * as echarts from "echarts";
import dayjs from "dayjs";

export default class MultiBarChart extends React.Component{
    constructor(props) {
        super(props);
        this.instance = null
    }

    createData(amount=100){
        // 从2020年的1-1开始
        let orgDate = dayjs('2020-01-01');
        let orgVal = Math.floor(Math.random() * amount)
        let data = [[orgDate.format('YYYY/MM/DD'),orgVal]]
        for(let i=0;i<365;i++){
            data.push([
                orgDate.add(i+1,'day').format('YYYY/MM/DD'),
                Math.floor(Math.random() * amount)
            ]);
        }
        return data;
    }

    componentDidMount() {
        let chartDom = document.getElementById(this.props.id);
        let myChart = echarts.init(chartDom,null,{locale:'ZH'});
        this.instance = myChart;
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer:{
                    type:'shadow'
                }
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 20
            }, {
                start: 0,
                end: 20
            }],
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['冷房耗电量', '暖房耗电量', '合计耗电量']
            },
            xAxis: [
                {
                    type: 'time',
                    boundaryGap: false,
                    axisPointer: {
                        show:true,
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '耗电量',
                    boundaryGap: false,
                    axisLabel: {
                        formatter: '{value} kw·h'
                    }
                }
            ],
            series: [
                {
                    name: '冷房耗电量',
                    type: 'bar',
                    data: this.createData()
                },
                {
                    name: '暖房耗电量',
                    type: 'bar',
                    data: this.createData()
                },
                {
                    name: '合计耗电量',
                    type: 'bar',
                    data: this.createData(200)
                }
            ]
        };
        this.instance.setOption(option);
    }

    render() {
        let {id} = this.props;
        return (<div id={id} style={{width:'100%',height:'30vw'}} />)
    }
}
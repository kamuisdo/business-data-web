import React from "react";
import * as echarts from "echarts";
import dayjs from "dayjs";

function createRandom(n,m){
    return Math.floor(Math.random() * (m - n + 1)) + n
}

export default class StepLineChart extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null
    }

    createData(orgVal){
        // 从2020年的1-1开始
        let orgDate = dayjs('2020-01-01');
        // let orgVal = 20
        let data = [[orgDate.format('YYYY/MM/DD'),orgVal]]

        for(let i=0;i<365;i++){
            let nVal = orgVal + Math.floor(createRandom(-2,2));
            let val = Math.floor(Math.random()*10)%10 === 0 ? '-' : nVal;
            data.push([
                orgDate.add(i+1,'day').format('YYYY/MM/DD'),
                val
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
                show: true,
                feature: {
                    restore: {show: true},
                    brush: {
                        show: true,
                        type:['lineX','clear']
                    },

                }
            },
            brush:{
                show: true,
                toolbox:['lineX','rect','clear'],
                brushType:"rect",
                brushMode:'single',
                xAxisIndex: 0,
                throttleType: 'debounce',//开启选中延迟后调用回调延迟
                throttleDelay: 600
            },
            legend: {
                data: ['设定温度', '回风温度', '耗电量']
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
                    name: '温度',
                    min:15,
                    max:50,
                    boundaryGap: false,
                    axisLabel: {
                        formatter: '{value}°'
                    }
                },
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
                    name: '设定温度',
                    type: 'line',
                    step:'middle',
                    connectNulls:false,
                    showSymbol: false,
                    data: this.createData(20)
                },
                {
                    name: '回风温度',
                    type: 'line',
                    step:'middle',
                    connectNulls:false,
                    showSymbol: false,
                    data: this.createData(23)
                },
                {
                    name: '合计耗电量',
                    type: 'line',
                    yAxisIndex: 1,
                    connectNulls:false,
                    showSymbol: false,
                    data: this.createData(200)
                }
            ]
        };
        this.instance.setOption(option);

        this.instance.on('datazoom',(params)=>{
            console.log('--- datazoom ---')
            console.log(params)
        })

        this.instance.on('timelinechanged',(params)=>{
            console.log('--- timelinechanged ---')
            console.log(params)
        })

        this.instance.on('brushselected',(params)=>{
            console.log('--- brushselected ---')
            console.log(params)
        })

        this.instance.on('brush',(params)=>{
            console.log('--- brush ---')
            console.log(params)
        })

        this.instance.on('brushend',(params)=>{
            console.log('--- brushend ---')
            console.log(params)
        })
    }

    render() {
        let {id} = this.props;
        return (
            <>
                <p></p>
                <div id={id} style={{width:'100%',height:'30vw'}} />
            </>
        )
    }
}
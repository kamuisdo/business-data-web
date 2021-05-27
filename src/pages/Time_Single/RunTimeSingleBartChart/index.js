import dayjs from "dayjs";
import React from "react";
import withEcharts from "../../../components/withEcharts";
import { formatTimeData } from '../../../api/runtime';

class RunTimeSingleBar extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('RunTimeSingleBarChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let option = getOptionWithDefault({
            title:{
                text:'每日运转时长'
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
                    name:'在线时长(h)'
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
            console.log('---- 单对象运转时间 合并 ----')
            console.log(data)
            let temper = data[0].temper || data[1].timer
            let time = data[0].time || data[1].time
            time = time.map((v)=>{
                let temperData = temper.find((item)=>{ return item.recordDate === (v.RECORD_DATE || v.recordDate) })
                let thisTemper = temperData ? temperData.maxWeather : null
                v.temper = thisTemper
                return v
            })
            console.log(time)
            let formatted = formatTimeData(time,query)
            this.updateSeries(formatted)
        })
    }


    // formatData(data){
    //     let warm = []
    //     let cold = []
    //     data.forEach(item => {
    //         let time = dayjs(item._id).format('YYYY/MM/DD');
    //         warm.push([time,item.ihetim])
    //         cold.push([time,item.icotim])
    //     });
    //     console.log(cold);
    //     return {
    //         warm,
    //         cold
    //     }
    // }

    // 设置line的参数
    updateSeries(seriesData){
        let { warm,cold,temper } = seriesData;
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
        this.instance.setOption({ series })
    }

    render() {
        return (<div id="RunTimeSingleBarChart" style={{height:'360px',width:'100%'}}></div>)
    }
}

export default class RunTimeSingleBarChart extends React.PureComponent{

    render() {
        let RunTimeSingleBarChart = withEcharts(RunTimeSingleBar)
        return (<RunTimeSingleBarChart {...this.props}/>)
    }
}
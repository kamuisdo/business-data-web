import React from "react";
import * as echarts from "echarts";
import withEcharts from "../../../components/withEcharts";
import dayjs from "dayjs";

class OnlineCount extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('onlineCountChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
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
            series: []
        })
        myChart.setOption(option);

        this.loadData()

    }

    loadData(){
        let {query,requestFn} = this.props;
        return requestFn(this.instance,query).then((data)=>{
            let sysData = []
            let projectData = []
            data.forEach((v)=>{
                let time = dayjs(v.onlineDate).format('YYYY-MM-DD')
                sysData.push([time,v.lineNum])
                projectData.push([time,v.buildingNum])
            })
            this.updateSeries({ sysData,projectData })
        })
    }

    // 设置line的参数
    updateSeries(seriesData){
        let {sysData,projectData} = seriesData;
        let {getDefaultSeriesOpt} = this.props;
        let option = {
            type: 'line',
            smooth: true,
            showSymbol: false,
            sampling: 'average',
            lineStyle:{
                width: 1
            }
        }
        let series = [
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
        this.instance.setOption(getDefaultSeriesOpt({ series }))
    }

    render() {
        return (<div id="onlineCountChart" style={{height:'300px'}}></div>)
    }
}

export default class OnlineCountChart extends React.PureComponent{

    render() {
        let OnlineCountChart = withEcharts(OnlineCount)
        return (<OnlineCountChart {...this.props}/>)
    }
}
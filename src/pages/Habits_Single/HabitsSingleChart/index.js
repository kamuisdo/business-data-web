import React from "react";
import withEcharts from "../../../components/withEcharts";

class HabitsSingle extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('HabitsSingleChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let option = getOptionWithDefault({
            title:{
                text:'设定温度、回风温度以及耗电量统计'
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
                    name:'温度(°)'
                },
                {
                    type: 'value',
                    boundaryGap: false,
                    name:'耗电量(kw)'
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
    updateSeries(seriesData){
        let { setTemper,returnTemper,energy } = seriesData;
        let {getDefaultSeriesOpt} = this.props;
        let series = [
            {
                name:'设定温度',
                type:'line',
                yAxisIndex:0,
                itemStyle: {
                    color: '#FD507C',
                },
                showSymbol: false,
                data:setTemper
            },
            {
                name:'耗电量',
                type:'line',
                yAxisIndex:1,
                itemStyle: {
                    color: '#2B6AFF',
                },
                showSymbol: false,
                data:energy
            },
            {
                name:'回风温度',
                type: 'line',
                yAxisIndex:0,
                itemStyle: {
                    color: '#B9B9B9'
                },
                lineStyle:{
                    width: 2
                },
                showSymbol: false,
                data:returnTemper
            }
        ]
        // console.log(getDefaultSeriesOpt({ series }))
        this.instance.setOption(getDefaultSeriesOpt({ series }))
    }

    render() {
        return (<div id="HabitsSingleChart" style={{height:'360px',width:'100%'}}></div>)
    }
}

export default class HabitsSingleChart extends React.PureComponent{

    render() {
        let HabitsSingleChart = withEcharts(HabitsSingle)
        return (<HabitsSingleChart {...this.props}/>)
    }
}
import React from "react";
import withEcharts from "../../../components/withEcharts";

class EnergyErrLine extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('EnergyErrLineChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let option = getOptionWithDefault({
            title:{
                text:'EER_DAY'
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
                    name:'Error Rate'
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
        let {getDefaultSeriesOpt} = this.props;
        let series = [
            {
                name:'错误率',
                type: 'line',
                itemStyle: {
                    color: '#2B6AFF'
                },
                lineStyle:{
                    width: 1
                },
                showSymbol: false,
                data:seriesData
            }
        ]
        this.instance.setOption(getDefaultSeriesOpt({ series }))
    }

    render() {
        return (<div id="EnergyErrLineChart" style={{height:'360px',width:'100%'}}></div>)
    }
}

export default class EnergyErrLineChart extends React.PureComponent{

    render() {
        let EnergyErrLineChart = withEcharts(EnergyErrLine)
        return (<EnergyErrLineChart {...this.props}/>)
    }
}
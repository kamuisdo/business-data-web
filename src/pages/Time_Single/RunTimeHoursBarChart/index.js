import React from "react";
import withEcharts from "../../../components/withEcharts";

class RunTimeHoursBar extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('RunTimeHoursBarChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let xAxisData = [];
        for(let i=1;i<25;i++){
            xAxisData.push(`${i.toString()}时`)
        }
        let option = getOptionWithDefault({
            title:{
                text:'时刻运行时长'
            },
            // legend:{
            //     left:'center'
            // },
            // tooltip:{
            //   formatter:'{b0}: {c0}<br />{b1}: {c1}'
            // },
            yAxis: {
                type: 'value',
                boundaryGap: true,
                name:'总小时数(h)',
            },
            xAxis: {
                type: 'category',
                data:xAxisData,
                boundaryGap:  false
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
        let series = [
            {
                name:'此刻运转总小时',
                type:'bar',
                itemStyle: {
                    color: '#8C54FF',
                    borderRadius:3
                },
                barWidth:6,
                data:seriesData
            }
        ]
        this.instance.setOption({ series })
    }

    render() {
        return (<div id="RunTimeHoursBarChart" style={{height:'360px',width:'100%'}}></div>)
    }
}

export default class RunTimeHoursBarChart extends React.PureComponent{

    render() {
        let RunTimeHoursBarChart = withEcharts(RunTimeHoursBar)
        return (<RunTimeHoursBarChart {...this.props}/>)
    }
}
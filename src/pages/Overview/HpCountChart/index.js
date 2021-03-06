import React from "react";
import withEcharts from "../../../components/withEcharts";

/**
 * 匹数 数量 分析
 */
class HpCount extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('HpCountChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let option = getOptionWithDefault({
            grid:{
                // 使得图表撑满整个div
                right:"70px"
            },
            title:{
                text:'智能VRV匹数分析'
            },
            tooltip:{
                formatter:'匹数为{b}(hp)的数量：{c}'
            },
            yAxis: {
                name:'数量(台)',
                type: 'value',
                boundaryGap: false,
            },
            xAxis:{
                name:'匹数(HP)',
                type: 'category',
                data:[],
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
        // data = [69,130,122,115,586,312,150,65,122,58,40,51,20,123,45,234,567]
        let xData = []
        let seriesData = []
        data.forEach((v)=>{
            xData.push(v.hp)
            seriesData.push(v.lineNum)
        })
        let {getDefaultSeriesOpt} = this.props;
        let xAxis = {
            data:xData
        }
        let series = [{
            type:'bar',
            yAxisIndex:0,
            itemStyle: {
                color: '#2B6AFF',
            },
            data:seriesData
        }]
        this.instance.setOption(getDefaultSeriesOpt({ series,xAxis }))
    }

    render() {
        return (<div id="HpCountChart" style={{height:'360px'}}></div>)
    }
}

export default class HpCountChart extends React.PureComponent{

    render() {
        let HpCountChart = withEcharts(HpCount)
        return (<HpCountChart {...this.props}/>)
    }
}
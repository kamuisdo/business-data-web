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

    componentDidUpdate(prevProps, prevState, snapshot){
        let series = this.updateSeries();
        let option = {
            series: series
        }
        this.instance.setOption(option);
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('HpCountChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let series = this.updateSeries();
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
            xAxis: {
                name:'匹数(HP)',
                type: 'category',
                data:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                boundaryGap: false
            },
            series: series
        })
        myChart.setOption(option);

    }

    // 设置line的参数
    updateSeries(){
        let data = [69,130,122,115,586,312,150,65,122,58,40,51,20,123,45,234,567]
        return [
            {
                type:'bar',
                yAxisIndex:0,
                itemStyle: {
                    color: '#2B6AFF',
                },
                data:data
            },
        ]
    }

    render() {
        return (<div id="HpCountChart" style={{height:'360px'}}></div>)
    }
}

export default class HpCountChart extends React.Component{

    render() {
        let HpCountChart = withEcharts(HpCount)
        return (<HpCountChart {...this.props}/>)
    }
}
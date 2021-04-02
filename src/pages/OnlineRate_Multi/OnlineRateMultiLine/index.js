import React from "react";
import withEcharts from "../../../components/withEcharts";
import {onlineRateMultiLine} from '../../../api/onlineCountMulti'

/**
 * 多对象在线率折线图
 */
class OnlineRateMulti extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        this.updateSeries()
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('OnlineRateMultiChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let option = getOptionWithDefault({
            // grid:{
            //     // 使得图表撑满整个div
            //     right:"70px"
            // },
            title:{
                text:'在线率统计'
            },
            // tooltip: {
            //     trigger: 'axis'
            // },
            // tooltip:{
            //     formatter:'匹数为{b}(hp)的数量：{c}'
            // },
            yAxis: {
                name:'在线率',
                type: 'value',
                boundaryGap: false,
            },
            xAxis: {
                type: 'time',
                boundaryGap: false
            },
            series: []
        })
        myChart.setOption(option);

        this.updateSeries()

    }

    // 设置line的参数
    updateSeries(){
        let { selected } = this.props
        this.instance.showLoading()
        onlineRateMultiLine({selected}).then((data)=>{
            let series = data.map((data,index)=>{
                return {
                    type:'line',
                    name:index,
                    showSymbol:false,
                    smooth:true,
                    data:data
                }
            })
            this.instance.hideLoading()
            this.instance.setOption({ series: series });
        })
    }

    render() {
        return (<div id="OnlineRateMultiChart" style={{height:'360px'}}></div>)
    }
}

export default class OnlineRateMultiChart extends React.Component{

    render() {
        let OnlineRateMultiChart = withEcharts(OnlineRateMulti)
        return (<OnlineRateMultiChart {...this.props}/>)
    }
}
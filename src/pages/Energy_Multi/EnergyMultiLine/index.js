import React from "react";
import withEcharts from "../../../components/withEcharts";
import {onlineRateMultiLine} from '../../../api/onlineCountMulti'

/**
 * 多对象在线率折线图
 */
class EnergyLineMulti extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('EnergyLineMultiChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let option = getOptionWithDefault({
            // grid:{
            //     // 使得图表撑满整个div
            //     right:"70px"
            // },
            title:{
                text:'设备耗电量历史数据图'
            },
            // tooltip: {
            //     trigger: 'axis'
            // },
            // tooltip:{
            //     formatter:'匹数为{b}(hp)的数量：{c}'
            // },
            yAxis: {
                name:'耗电量(kw.h)',
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

        this.loadData()

    }

    loadData(){
        let {selected,requestFn} = this.props;
        return requestFn(this.instance,{ selected }).then((data)=>{
            console.log(data);
            this.updateSeries(data)
            this.instance.hideLoading()
        })
    }

    // 设置line的参数
    updateSeries(selected){
        let {getDefaultSeriesOpt} = this.props;
        this.instance.showLoading()
        let series = selected.map((data,index)=>{
            return {
                type:'line',
                name:index+1,
                showSymbol:false,
                smooth:true,
                data:data
            }
        })
        this.instance.setOption(getDefaultSeriesOpt({ series }))
    }

    render() {
        return (<div id="EnergyLineMultiChart" style={{height:'360px'}}></div>)
    }
}

export default class EnergyLineMultiChart extends React.PureComponent{

    render() {
        let EnergyLineMultiChart = withEcharts(EnergyLineMulti)
        return (<EnergyLineMultiChart {...this.props}/>)
    }
}
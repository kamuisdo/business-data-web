import React from "react";
import withEcharts from "../../../components/withEcharts";
import {formatEnergyData} from '../../../api/energy'
import findIndex from 'lodash/findIndex'

/**
 * 多对象在线率折线图
 */
class EnergyLineMulti extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault,data } = this.props;
        let chartDom = document.getElementById('EnergyLineMultiChart');
        let myChart = initEcharts(chartDom);
        let series = this.updateSeries(data)
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
            series: series
        })
        myChart.setOption(option);

        if(data === null){
            myChart.showLoading();
        }else{
            myChart.hideLoading();
        }

    }


    // 设置line的参数
    updateSeries(data){
        if(!data || data.length === 0){
            return []
        }
        let {getDefaultSeriesOpt,selected,query} = this.props;
        let series = [];
        for(let k in data){
            let index = findIndex(selected,(v)=>{ return v.key.toString() === k.toString() }) + 1;
            let t = formatEnergyData(query,data[k]).map((v)=>{ return [v.recordDate,v.electric] })
            series.push({
                type:'line',
                name:index,
                showSymbol:false,
                smooth:true,
                data:t
            })
        }
        return getDefaultSeriesOpt({ series }).series
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
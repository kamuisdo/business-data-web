import React from "react";
import withEcharts from "../../../components/withEcharts";
import findIndex from 'lodash/findIndex'
import {formatEnergyData} from '../../../api/energy'

/**
 * 多对象电量错误率
 */
class EnergyErrorLineMulti extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidMount() {
        let { initEcharts,getOptionWithDefault,data } = this.props;
        let chartDom = document.getElementById('EnergyErrorLineMultiChart');
        let myChart = initEcharts(chartDom);
        let series = this.updateSeries(data)
        this.instance = myChart;
        let option = getOptionWithDefault({
            // grid:{
            //     // 使得图表撑满整个div
            //     right:"70px"
            // },
            title:{
                text:'EER_DAY'
            },
            // tooltip: {
            //     trigger: 'axis'
            // },
            // tooltip:{
            //     formatter:'匹数为{b}(hp)的数量：{c}'
            // },
            yAxis: {
                name:'错误率',
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
            console.log(k)
            console.log(selected)
            let index = findIndex(selected,(v)=>{ return v.key.toString() === k.toString() }) + 1;
            console.log(index)
            let t = formatEnergyData(query,data[k]).map((v)=>{ return [v.recordDate,v.eer] })
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
        return (<div id="EnergyErrorLineMultiChart" style={{height:'360px'}}></div>)
    }
}

export default class EnergyErrorLineMultiChart extends React.PureComponent{

    render() {
        let EnergyErrorLineMultiChart = withEcharts(EnergyErrorLineMulti)
        return (<EnergyErrorLineMultiChart {...this.props}/>)
    }
}
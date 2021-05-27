import React from "react";
import withEcharts from "../../../components/withEcharts";
import {TimeTypeEnum} from '../../../enum/timeType';
import config from '../../../utils/config';
import dayjs from 'dayjs';
import isNumber from 'lodash/isNumber'

class EnergyErrLine extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidMount() {
        let { initEcharts,getOptionWithDefault,data } = this.props;
        let chartDom = document.getElementById('EnergyErrLineChart');
        let myChart = initEcharts(chartDom);
        let series = this.updateSeries(data)
        this.instance = myChart;
        let option = getOptionWithDefault({
            title:{
                text:'EER_DAY'
            },
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
            series: series
        })
        myChart.setOption(option);

        if(data === null){
            myChart.showLoading();
        }else{
            myChart.hideLoading();
        }

    }

    // 计算EER的值
    calcEER(v1,v2){
        if(v2 === 0){ return 0 }
        let t = v1/v2/config.err_day_params
        return isNumber(t) ? t.toFixed(2) : '-'
    }

    // 设置line的参数
    updateSeries(data){
        if(!data || data.length === 0){
            return []
        }
        let {getDefaultSeriesOpt,query} = this.props;
        let formatFn = TimeTypeEnum.get(query.timeType).formatFn;
        let cold = []
        let hot = []
        data.forEach((v)=>{
            let time = formatFn(v.recordDate)
            cold.push([time,this.calcEER(v.coolCapacity,v.coldElectric)])
            hot.push([time,this.calcEER(v.heatCapacity,v.hotElectric)])
        })
        
        let series = [
            {
                name:'冷房err_day',
                type: 'line',
                itemStyle: {
                    color: '#2B6AFF'
                },
                lineStyle:{
                    width: 1
                },
                showSymbol: false,
                data:cold
            },
            {
                name:'暖房err_day',
                type: 'line',
                itemStyle: {
                    color: '#FD507C'
                },
                lineStyle:{
                    width: 1
                },
                showSymbol: false,
                data:hot
            }
        ]
        return getDefaultSeriesOpt({ series }).series
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
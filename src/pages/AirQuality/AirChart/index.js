import React from "react";
import withEcharts from "../../../components/withEcharts";
import chartColor from "../../../enum/chartColor";
import PropTypes from 'prop-types'
import ErrorChart from "../../../components/ErrorChart";
import dayjs from 'dayjs'
import { ifNoData } from '../../../api/air'
import NoChart from "../../../components/NoChart";

class Air extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault,id,title,data,unitText,timeTypeFormat="YYYY/MM/DD" } = this.props;
        let chartDom = document.getElementById(id);
        if(!chartDom){ return; }
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        if(data === null){
            myChart.showLoading();
            return
        }
        if(data === false){
            return;
        }
        let that = this;
        let {series} = this.updateSeries();
        let option = getOptionWithDefault({
            grid:{
                // 使得图表撑满整个div
                left:"70px",
            },
            title:{
                text:title
            },
            legend:{
                show:false
            },
            tooltip: {
                formatter: (params)=>{
                    let date = dayjs(params[0].axisValueLabel).format(timeTypeFormat);
                    let unitText = that.props.unitText;
                    let itemDom = params.map((v)=>{
                        let {seriesName,marker,data} = v
                        return `<div style="width: 150px;height: 24px;">${marker}${seriesName}：${data[1]}${unitText}</div>`
                    })
                    let dom = `<div style="display: flex;flex-wrap: wrap;align-items: center;width: 450px;font-size: 12px;">${ itemDom.join('') }</div>`
                    return `${date}<br>${dom}`
                }
            },
            yAxis: [
                {
                    type: 'value',
                    boundaryGap: false,
                    axisLabel:{
                        formatter:`{value}${unitText}`
                    }
                }
            ],
            xAxis: {
                type: 'time',
                boundaryGap: false
            },
            series: series
        })
        // console.log(option)
        myChart.setOption(option);
    }

    // 设置line的参数
    updateSeries(){
        let {getDefaultSeriesOpt,data} = this.props
        let series = data.map((v,i)=>{
            let color = chartColor[i] || '#74BFDE'
            return {
                name:v.name,
                data:v.data,
                type: 'line',
                showSymbol: false,
                emphasis: {
                    focus: 'none'
                },
                itemStyle:{
                    color
                }
            }
        })
        return getDefaultSeriesOpt({series})
    }

    render() {
        let {id,data,handleRefresh,title} = this.props;
        console.log('----- AirChart -----')
        console.log(data)
        // console.log(ifNoData(data))
        return  (data===false) ? <ErrorChart handleClick={handleRefresh}/> : ifNoData(data) ? <><h4>{title}</h4><NoChart/></> : <div id={id} style={{height:'360px'}}></div>
    }
}

export default class AirChart extends React.PureComponent{

    render() {
        let AirChart = withEcharts(Air)
        let {chartRef,...rest} = this.props;
        return (<AirChart ref={chartRef} {...rest}/>)
    }
}

AirChart.propTypes = {
    id:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    unitText:PropTypes.string.isRequired,
    data:PropTypes.any,
}
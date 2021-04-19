import React from "react";
import withEcharts from "../../../components/withEcharts";

/**
 * 多对象电量错误率
 */
class EnergyErrorLineMulti extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('EnergyErrorLineMultiChart');
        let myChart = initEcharts(chartDom);
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
            series: []
        })
        myChart.setOption(option);

        this.loadData()

    }

    loadData(){
        let {selected,requestFn} = this.props;
        return requestFn(this.instance,{ selected }).then((data)=>{
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
        return (<div id="EnergyErrorLineMultiChart" style={{height:'360px'}}></div>)
    }
}

export default class EnergyErrorLineMultiChart extends React.PureComponent{

    render() {
        let EnergyErrorLineMultiChart = withEcharts(EnergyErrorLineMulti)
        return (<EnergyErrorLineMultiChart {...this.props}/>)
    }
}
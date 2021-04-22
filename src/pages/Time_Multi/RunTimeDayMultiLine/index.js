import React from "react";
import withEcharts from "../../../components/withEcharts";

/**
 * 多对象每日运转时长
 */
class RunTimeDayMulti extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('RunTimeDayMultiChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let option = getOptionWithDefault({
            // grid:{
            //     // 使得图表撑满整个div
            //     right:"70px"
            // },
            title:{
                text:'每日运行时长'
            },
            // tooltip: {
            //     trigger: 'axis'
            // },
            // tooltip:{
            //     formatter:'匹数为{b}(hp)的数量：{c}'
            // },
            yAxis: {
                name:'在线时长(h)',
                type: 'value',
                boundaryGap: false,
            },
            xAxis: {
                type: 'time',
                boundaryGap: false
            },
            color:['#ED6666','#5470C6','#FAC858'],
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
        return (<div id="RunTimeDayMultiChart" style={{height:'360px'}}></div>)
    }
}

export default class RunTimeDayMultiChart extends React.PureComponent{

    render() {
        let RunTimeDayMultiChart = withEcharts(RunTimeDayMulti)
        return (<RunTimeDayMultiChart {...this.props}/>)
    }
}
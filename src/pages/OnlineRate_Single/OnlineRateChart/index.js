import React from "react";
import withEcharts from "../../../components/withEcharts";
import {onlineRateMultiLine} from '../../../api/onlineCountMulti'

/**
 * 单对象在线率折线图
 */
class OnlineRate extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('OnlineRateChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let option = getOptionWithDefault({
            title:{
                text:'在线率统计'
            },
            tooltip:{
                formatter:function(params){
                    // console.log(params);
                    params = params[0]
                    let value = params.value[1]
                    let date = params.value[0];
                    return `${params.seriesName}<br/><span>${params.marker}${date}：${Math.floor(value*100)}%</span>`
                }
            },
            yAxis: {
                name:'在线率',
                type: 'value',
                boundaryGap: false,
                axisLabel:{
                    formatter:function (value, index) {
                        return Math.floor(value*100) + '%';
                    }
                }
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
        let {query,requestFn} = this.props;
        return requestFn(this.instance,query).then((data)=>{
            this.updateSeries(data)
        })
    }

    // 设置line的参数
    updateSeries(data){
        let {getDefaultSeriesOpt} = this.props;
        let series = [
            {
                type:'line',
                name:'在线率',
                showSymbol:false,
                smooth:true,
                itemStyle:{ color:'#2B6AFF' },
                data:data
            }
        ]
        this.instance.setOption(getDefaultSeriesOpt({ series }))
    }

    render() {
        return (<div id="OnlineRateChart" style={{height:'360px'}}></div>)
    }
}

export default class OnlineRateChart extends React.PureComponent{

    render() {
        let OnlineRateChart = withEcharts(OnlineRate)
        return (<OnlineRateChart {...this.props}/>)
    }
}
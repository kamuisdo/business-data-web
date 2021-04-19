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

        this.updateSeries()

    }

    // 设置line的参数
    updateSeries(){
        let { selected,query } = this.props
        this.instance.showLoading()
        onlineRateMultiLine(Object.assign({selected},query)).then((data)=>{
            let series = data.map((data,index)=>{
                return {
                    type:'line',
                    name:index+1,
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

export default class OnlineRateMultiChart extends React.PureComponent{

    render() {
        let OnlineRateMultiChart = withEcharts(OnlineRateMulti)
        return (<OnlineRateMultiChart {...this.props}/>)
    }
}
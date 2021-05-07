import React from "react";
import withEcharts from "../../../components/withEcharts";
import {onlineRateMultiLine} from '../../../api/onlineCountMulti'
import {formatDataByType} from '../../../api/onlineCountSingle';
import findIndex from 'lodash/findIndex'

/**
 * 多对象在线率折线图
 */
class OnlineRateMulti extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
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

        this.loadData()

    }

    loadData(){
        let {selected,requestFn,query,regionType} = this.props;
        let codeList = selected.map((v)=>{ return v.key })
        let t = Object.assign({ codeList:codeList },query,{ regionType })
        return requestFn(this.instance,t).then((data)=>{
            this.updateSeries(data)
            this.instance.hideLoading()
        })
    }

    // 设置line的参数
    updateSeries(data){
        let {getDefaultSeriesOpt,query,selected} = this.props;
        console.log(data);
        // let index = 1
        let series = []
        for(let k in data){
            let formattedData = formatDataByType(query,data[k])
            let kData = formattedData.map((v)=>{
                let rate = (v.on/v.sum).toFixed(2)
                return [v.recordDate,rate]
            })
            let index = findIndex(selected,(v)=>{ return v.key.toString() === k.toString() }) + 1;
            series.push({
                type:'line',
                name:index,
                showSymbol:false,
                smooth:true,
                data:kData               
            })
        }
        this.instance.showLoading()
        // let series = data.map((data,index)=>{
        //     return {
        //         type:'line',
        //         name:index+1,
        //         showSymbol:false,
        //         smooth:true,
        //         data:data
        //     }
        // })
        this.instance.setOption(getDefaultSeriesOpt({ series }))
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
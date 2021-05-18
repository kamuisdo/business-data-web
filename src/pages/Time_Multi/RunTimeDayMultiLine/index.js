import React from "react";
import withEcharts from "../../../components/withEcharts";
import { formatMultiTimeData,ifNoDataFn } from '../../../api/runtime'

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
        let {selected,requestFn,type,query} = this.props;
        let key = type === '物件' ? 'buildingIdArray' : type === 'LcNo' ? 'terminalIdArray' : 'lineIdArray';
        let idList = selected.map((v)=>{ return v.key })
        let t = Object.assign({ [key]:idList },query)
        return requestFn(this.instance,t,{ ifNoDataFn }).then((data)=>{
            data = data.map((v,i)=>{
                let returnData = v[selected[i].key]
                if(returnData.length){
                    let formattedData = formatMultiTimeData(returnData,query)
                    return formattedData
                }
                return []
                
            })
            // console.log(data)

            this.updateSeries(data)
            this.instance.hideLoading()
        })
    }

    // 设置line的参数
    updateSeries(selected){
        let {getDefaultSeriesOpt} = this.props;
        this.instance.showLoading()
        let series = selected.map((data,index)=>{
            // let index = findIndex(selected,(v)=>{ return v.key.toString() === k.toString() }) + 1;
            return {
                type:'line',
                name:index+1,
                showSymbol:false,
                smooth:true,
                data:data
            }
        })
        // series = series.sort(()=>{})
        // console.log('---- RunTimeDayMultiChart ------')
        // console.log(series);
        // console.log(getDefaultSeriesOpt({ series }));
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
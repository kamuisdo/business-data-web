import React from "react";
import withEcharts from "../../../components/withEcharts";
import { formatTimeDataToHour } from '../../../api/runtime'

/**
 * 多对象每日运转时长
 */
class RunTimeHoursMulti extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('RunTimeHoursMultiChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let xAxisData = [];
        for(let i=1;i<25;i++){
            xAxisData.push(`${i.toString()}时`)
        }
        let option = getOptionWithDefault({
            // grid:{
            //     // 使得图表撑满整个div
            //     right:"70px"
            // },
            title:{
                text:'时刻运行时长'
            },
            // tooltip: {
            //     trigger: 'axis'
            // },
            // tooltip:{
            //     formatter:'匹数为{b}(hp)的数量：{c}'
            // },
            yAxis: {
                name:'总小时数(h)',
                type: 'value',
                boundaryGap: false,
            },
            xAxis: {
                type: 'category',
                data:xAxisData,
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
        t.timeType = 'hour'
        return requestFn(this.instance,t).then((data)=>{
            data = data.map((v,i)=>{
                let returnData = v[selected[i].key]
                if(returnData.length){
                    let formattedData = formatTimeDataToHour(returnData,query)
                    return formattedData
                }
                return []
                
            })
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
        return (<div id="RunTimeHoursMultiChart" style={{height:'360px'}}></div>)
    }
}

export default class RunTimeHoursMultiChart extends React.PureComponent{

    render() {
        let RunTimeHoursMultiChart = withEcharts(RunTimeHoursMulti)
        return (<RunTimeHoursMultiChart {...this.props}/>)
    }
}
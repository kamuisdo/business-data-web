import React from "react";
import withEcharts from "../../../components/withEcharts";
import isNumber from 'lodash/isNumber';

class ProjectProvinceCount extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    // componentDidUpdate(prevProps, prevState, snapshot){
    //     let series = this.updateSeries();
    //     let option = {
    //         series: series
    //     }
    //     this.instance.setOption(option);
    // }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('ProjectProvinceCountChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let option = getOptionWithDefault({
            title:{
                text:'各地物件数排名'
            },
            legend:{
                left:'center'
            },
            tooltip:{
              formatter:(params)=>{
                //   console.log(params);
                  let provinceName = params[0].axisValue
                  let dom = params.map((v)=>{
                      let value = v.value
                      if(v.seriesType === 'line'){
                        value = isNumber(v.value) ? `${(v.value*100).toFixed(2)}%` : v.value
                      }
                      return `${v.marker} ${v.seriesName}：${value}`
                  })
                  dom = dom.join('<br/>')
                  return `${provinceName}<br/>${dom}`
              }
            },
            yAxis: [
                {
                    type: 'value',
                    boundaryGap: false,
                    name:'物件数(家)'
                },
                {
                    type: 'value',
                    boundaryGap: false,
                    name:'增长率',
                    axisLabel:{
                        formatter:function (value){ return `${value*100}%` }
                    }
                }
            ],
            xAxis: {
                type: 'category',
                // data:['上海','江苏','安徽','浙江'],
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
        let projectData = []
        let lastProjectData = []
        let rateData = [];
        let xAxisData = []
        data.forEach((v)=>{
            let buildingNum = v.buildingNum === null ? '-' : v.buildingNum
            let lastYearBuildingNum = v.lastYearBuildingNum === null ? '-' : v.lastYearBuildingNum
            let rate = 0
            if(isNumber(buildingNum) && isNumber(lastYearBuildingNum)){
                rate = lastYearBuildingNum === 0 ? 1 : buildingNum/lastYearBuildingNum - 1
            }else{
                rate = '-'
            }
            projectData.push(buildingNum)
            lastProjectData.push(lastYearBuildingNum)
            xAxisData.push(v.provinceName)
            // console.log(v.buildingNum,v.lastYearBuildingNum,v.buildingNum/v.lastYearBuildingNum);
            rateData.push(rate)
        })
        // console.log(rateData);
        let xAxis = {
            data:xAxisData
        }
        let series = [
            {
                name:'物件数',
                type:'bar',
                yAxisIndex:0,
                itemStyle: {
                    color: '#2B6AFF',
                },
                data:projectData
            },
            {
                name:'去年物件数',
                type:'bar',
                yAxisIndex:0,
                itemStyle: {
                    color: '#8C54FF',
                },
                data:lastProjectData
            },
            {
                name:'增长率',
                type: 'line',
                yAxisIndex:1,
                itemStyle: {
                    color: '#F7C137'
                },
                lineStyle:{
                    width: 1
                },
                data:rateData
            }
        ]
        this.instance.setOption(getDefaultSeriesOpt({ series,xAxis }))
    }

    render() {
        return (<div id="ProjectProvinceCountChart" style={{height:'360px'}}></div>)
    }
}

export default class ProjectProvinceCountChart extends React.PureComponent{

    render() {
        let ProjectProvinceCountChart = withEcharts(ProjectProvinceCount)
        return (<ProjectProvinceCountChart {...this.props}/>)
    }
}
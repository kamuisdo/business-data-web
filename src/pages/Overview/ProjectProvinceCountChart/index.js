import React from "react";
import withEcharts from "../../../components/withEcharts";
import projectType from "../../../enum/projectType";

class ProjectProvinceCount extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        let series = this.updateSeries();
        let option = {
            series: series
        }
        this.instance.setOption(option);
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('ProjectProvinceCountChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let series = this.updateSeries();
        let option = getOptionWithDefault({
            title:{
                text:'各地物件数排名'
            },
            legend:{
                left:'center'
            },
            // tooltip:{
            //   formatter:'{b0}: {c0}<br />{b1}: {c1}'
            // },
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
                data:['上海','江苏','安徽','浙江'],
                boundaryGap: false
            },
            series: series
        })
        myChart.setOption(option);

    }

    // 设置line的参数
    updateSeries(){
        let projectData = [69,130,46,115]
        let lastProjectData = [65,131,12,110]
        let rateData = [0.13,0.22,0.53,0.08];
        return [
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
    }

    render() {
        return (<div id="ProjectProvinceCountChart" style={{height:'360px'}}></div>)
    }
}

export default class ProjectProvinceCountChart extends React.Component{

    render() {
        let ProjectProvinceCountChart = withEcharts(ProjectProvinceCount)
        return (<ProjectProvinceCountChart {...this.props}/>)
    }
}
import React from "react";
import withEcharts from "../../../components/withEcharts";
import projectType from "../../../enum/projectType";

class ProjectTypeCount extends React.Component{

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
        let chartDom = document.getElementById('ProjectTypeCountChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let series = this.updateSeries();
        let option = getOptionWithDefault({
            grid:{
                // 使得图表撑满整个div
                height:"60%", //图例高度
            },
            title:{
                text:'物件类型概况'
            },
            legend:{
                left:'center'
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
                    name:'系统数(套)'
                }
            ],
            xAxis: {
                type: 'category',
                data:projectType,
                axisLabel: { interval: 0, rotate: 30 },
                boundaryGap: false
            },
            series: series
        })
        myChart.setOption(option);

    }

    // 设置line的参数
    updateSeries(){
        let projectData = [69,130,12,115,586,3,150,65,122,58,40,51,20]
        let sysData = [350,438,39,578,3561,43,936,761,1081,378,269,71,57]
        return [
            {
                name:'物件数',
                type:'bar',
                yAxisIndex:0,
                itemStyle: {
                    color: '#F18F1C',
                },
                data:projectData
            },
            {
                name:'系统数',
                type: 'line',
                yAxisIndex:1,
                itemStyle: {
                    color: '#2B6AFF'
                },
                lineStyle:{
                    width: 1
                },
                data:sysData
            }
        ]
    }

    render() {
        return (<div id="ProjectTypeCountChart" style={{height:'360px'}}></div>)
    }
}

export default class ProjectTypeCountChart extends React.Component{

    render() {
        let ProjectTypeCountChart = withEcharts(ProjectTypeCount)
        return (<ProjectTypeCountChart {...this.props}/>)
    }
}
import React from "react";
import * as echarts from 'echarts';
import './OnRateChart.less'
import withEcharts from '../../components/withEcharts'

class PieChart extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidMount() {
        let chartDom = document.getElementById(this.props.id);
        let myChart = echarts.init(chartDom);
        this.instance = myChart;
        let option;

        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: 'top',
                left: 'left',
                orient:'vertical',
                itemWidth:12,
                itemHeight:12,
                icon:'rect',
                padding:8
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    left: '20%',
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '12',
                            // fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 1048, name: '运行', itemStyle: { color: "rgb(127,206,127)"}},
                        {value: 735, name: '关机', itemStyle: { color: "rgb(191,191,191)"}},
                        {value: 180, name: '故障', itemStyle: { color: "rgb(231,88,88)"}}
                    ]
                }
            ]
        };

        option && myChart.setOption(option);
    }

    render() {
        let {id} = this.props;
        return (<div id={id} style={{width:'100%',height:'15vw'}} />)
    }
}

export default class OnRateChart extends React.Component{



    render() {
        let {title,data} = this.props;
        let PieWithEcharts = withEcharts(PieChart)
        return (
            <div className="onRateChartItem">
                <p className="onRateChartItem-title">{title}</p>
                <PieWithEcharts id={`${title}_chart`}/>
            </div>
        )
    }
}
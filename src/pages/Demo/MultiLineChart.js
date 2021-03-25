import React from "react";
import * as echarts from "echarts";
import dayjs from "dayjs";

export default class MultiLineChart extends React.Component{
    constructor(props) {
        super(props);
        this.instance = null;
        this.dataMap = {
            a:{
                text:'星巴克A店',
                color1:'rgb(203,9,9)',
                color2:'rgb(234,141,141)',
                color3:'rgb(234,144,144)'
            },
            b:{
                text:'星巴克B店',
                color1:'rgb(61,203,9)',
                color2:'rgb(19,200,100)',
                color3:'rgb(15,203,137)'
            },
            c:{
                text:'星巴克C店',
                color1:'rgb(9,119,203)',
                color2:'rgb(19,28,200)',
                color3:'rgb(81,15,203)'
            },
        }
        this.state = {
            unit:'day',
            day:''
        }
    }

    createData(amount=20){
        // 从2020年的1-1开始
        let orgDate = dayjs('2020-01-01');
        let orgVal = Math.floor(Math.random() * 300)
        let data = [[orgDate.format('YYYY/MM/DD'),orgVal]]
        for(let i=0;i<365;i++){
            data.push([
                orgDate.add(i+1,'day').format('YYYY/MM/DD'),
                orgVal+=Math.floor(Math.random() * amount)
            ]);
        }
        return data;
    }

    createDayData(amount=100){
        // 切换到天之后以小时为单位展示
        let orgT = dayjs(this.state.day);
        let orgVal = Math.floor(Math.random() * 100)
        let data = [[`${orgT.format('HH')}时`,orgVal]]
        for(let i=0;i<23;i++){
            data.push([
                orgT.add(i+1,'h').format('HH')+'时',
                Math.floor(Math.random() * amount)
            ]);
        }
        return data;
    }

    updateData(){
        let {selected} = this.props;
        let series = []
        let legend = []
        // let dataFn = this.state.unit === 'day' ? this.createData : this.createDayData;
        let dataFn = (arg)=>{
            return this.state.unit === 'day' ? this.createData(arg) : this.createDayData(arg)
        }
        for(let i=0;i<selected.length;i++){
            let k = selected[i];
            let kData = this.dataMap[k];
            series.push({
                name: `${kData.text}_制冷`,
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: dataFn(),
                itemStyle: {
                    color: kData.color2
                }
            })
            series.push({
                name: `${kData.text}_制热`,
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: dataFn(),
                itemStyle: {
                    color: kData.color3
                }
            })
            series.push({
                name: `${kData.text}_合计`,
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: dataFn(40),
                itemStyle: {
                    color: kData.color1
                }
            })
            legend.push(`${kData.text}_制冷`)
            legend.push(`${kData.text}_制热`)
            legend.push(`${kData.text}_合计`)
        }
        return {series,legend }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        // console.log('--- componentDidUpdate ---')
        // console.log(prevProps)
        // console.log(this.props);
        let {series,legend} = this.updateData();
        let option = {
            legend: {
                data: legend
            },
            series: series
        }
        this.instance.setOption(option);
    }

    componentDidMount() {
        let chartDom = document.getElementById(this.props.id);
        let myChart = echarts.init(chartDom,null,{locale:'ZH'});
        this.instance = myChart;

        this.setChartOption();

        myChart.on('click',(params)=>{
            if(this.state.unit==='hour'){
                return false
            }
            if(params.componentType === "series"){
                this.setState({day:params.data[0],unit:'hour'})
                this.setChartOption()
            }
        })
    }

    setChartOption(){
        let {series,legend} = this.updateData();

        let unitDayOpt = {
            xAxis: {
                type: 'time',
                boundaryGap: false,
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 20
            }, {
                start: 0,
                end: 20
            }],
        }

        let unitHourOpt = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
            },
        }

        let t = this.state.unit === 'day' ? unitDayOpt : unitHourOpt;

        let option = Object.assign({
            toolbox: {
                show:true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legend
            },
            yAxis: {
                type: 'value',
                boundaryGap: false
            },
            series: series
        },t)



        option && this.instance.setOption(option);
    }



    render() {
        let {id} = this.props;
        let {day} = this.state;
        return (
            <>
                { day.length > 0 && <p>时间范围：{day}</p> }
                <div id={id} style={{width:'100%',height:'30vw'}} />
            </>

            )
    }
}
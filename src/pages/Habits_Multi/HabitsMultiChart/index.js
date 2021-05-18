import React from "react";
import withEcharts from "../../../components/withEcharts";
import chartColor from "../../../enum/chartColor";
import { formatHabitsData } from '../../../api/habits';
import {Checkbox} from 'antd';
import './index.less'
import {ifNoDataFn} from "../../../api/runtime";
import NoChart from "../../../components/NoChart";

class HabitsMulti extends React.Component {

    constructor(props) {
        super(props);
        this.instance = null;
        this.state = {
            legend: []
        }
        this.onCheckChange = this.onCheckChange.bind(this)
        this.onClickLegendItem = this.onClickLegendItem.bind(this)
    }

    componentDidMount() {
        let {initEcharts, getOptionWithDefault} = this.props;
        let chartDom = document.getElementById('HabitsMultiChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let option = getOptionWithDefault({
            title: {
                text: '设定温度、回风温度以及耗电量统计'
            },
            legend: {
                show: false
            },
            // tooltip:{
            //   formatter:'{b0}: {c0}<br />{b1}: {c1}'
            // },
            yAxis: [
                {
                    type: 'value',
                    boundaryGap: false,
                    name: '温度(°)'
                },
                {
                    type: 'value',
                    boundaryGap: false,
                    name: '耗电量(kw)'
                }
            ],
            xAxis: {
                type: 'time',
                boundaryGap: false
            },
            color: chartColor,
            series: []
        })
        myChart.setOption(option);

        this.loadData()
    }

    loadData() {
        let {selected, requestFn,query,type} = this.props;
        let key = type === '物件' ? 'buildingIdArray' : type === 'LcNo' ? 'terminalIdArray' : 'lineIdArray';
        let idList = selected.map((v)=>{ return v.key })
        let t = Object.assign({ [key]:idList },query)
        let noDataDom = <div className='chart-box'><NoChart/></div>
        return requestFn(this.instance, t,{ ifNoDataFn,noDataDom }).then((data) => {
            data = data.map((v,i)=>{
                let returnData = v[selected[i].key]
                if(returnData.length){
                    let formattedData = formatHabitsData(returnData,query)
                    return formattedData
                }
                return []
                
            })
            this.updateSeries(data)
        })
    }

    // 设置line的参数
    updateSeries(selected) {
        let {getDefaultSeriesOpt} = this.props;
        let series = []
        selected.map((seriesData, index) => {
            let {setTemper, returnTemper, energy} = seriesData;
            let temp = [
                {
                    name: `设定温度${index + 1}`,
                    type: 'line',
                    yAxisIndex: 0,
                    itemIndex: index,
                    itemType: 'setTemper',
                    // itemStyle: {
                    //     color: '#FD507C',
                    // },
                    showSymbol: false,
                    data: setTemper
                },
                {
                    name: `耗电量${index + 1}`,
                    type: 'line',
                    yAxisIndex: 1,
                    itemIndex: index,
                    itemType: 'energy',
                    // itemStyle: {
                    //     color: '#2B6AFF',
                    // },
                    showSymbol: false,
                    data: energy
                },
                {
                    name: `回风温度${index + 1}`,
                    type: 'line',
                    yAxisIndex: 0,
                    itemIndex: index,
                    itemType: 'returnTemper',
                    // itemStyle: {
                    //     color: '#B9B9B9'
                    // },
                    showSymbol: false,
                    data: returnTemper
                }
            ]
            series = series.concat(temp)
        })
        let legend = []
        series = series.map((v, i) => {
            let color = chartColor[i]
            legend.push({
                name: v.name,
                color,
                index: i,
                itemIndex: v.itemIndex,
                itemType: v.itemType,
                selected: true
            })
            return Object.assign(v, {
                itemStyle: {
                    color: color
                }
            })
        })
        this.instance.setOption(getDefaultSeriesOpt({series}))
        this.setState({ legend })
    }

    // 根据legend状态计算checkbox的值
    getIfChecked(key) {
        let {legend} = this.state;
        if(legend.length > 0){
            let {selected} = this.props;
            let t = legend.filter((v) => {
                return v.selected && v.itemType === key
            })
            let indeterminate = t.length > 0 && t.length < selected.length
            let checked = t.length === selected.length
            return {
                indeterminate,
                checked
            }
        }
    }

    onCheckChange(e, key) {
        let checked = e.target.checked;
        let {legend} = this.state;
        legend = legend.map((v) => {
            if (v.itemType === key) {
                let actionType = checked ? 'legendSelect' : 'legendUnSelect'
                this.instance.dispatchAction({
                    type: actionType,
                    name: v.name
                })
                return Object.assign(v, {selected: checked})
            }
            return v
        })

        this.setState({legend})
    }

    onClickLegendItem(name){
        let {legend} = this.state;
        let legendVal = legend.find((v)=>{ return v.name === name })
        let actionType = legendVal.selected ? 'legendUnSelect' : 'legendSelect'
        let newSelected = !legendVal.selected;
        this.instance.dispatchAction({
            type: actionType,
            name: name
        })
        legend = legend.map((v)=>{
            if(v.name === name){
                return Object.assign(v,{selected:newSelected })
            }
            return v
        })
        this.setState({legend})
    }

    render() {
        let {selected} = this.props;
        let {legend} = this.state;
        let setTemperChecked = this.getIfChecked('setTemper')
        let energyChecked = this.getIfChecked('energy')
        let returnTemperChecked = this.getIfChecked('returnTemper')
        return (
            <div className="habits-multi-box">
                <div className="chart-box" style={{width: '60vw'}}>
                    <div id="HabitsMultiChart" style={{height: '360px', width: '100%'}}></div>
                </div>
                <div className="chart-box" style={{width: 'calc(100% - 60vw - 20px)',marginLeft:'20px'}}>
                    <p>对比指标</p>
                    {
                        legend.length > 0 && (
                            <>
                                <div className="checkbox-row">
                                    <div><Checkbox checked={setTemperChecked.checked}
                                                   onChange={(e)=>this.onCheckChange(e,'setTemper')}
                                                   indeterminate={setTemperChecked.indeterminate}>设定温度</Checkbox></div>
                                    <div><Checkbox checked={energyChecked.checked}
                                                   onChange={(e)=>this.onCheckChange(e,'energy')}
                                                   indeterminate={energyChecked.indeterminate}>耗电量</Checkbox></div>
                                    <div><Checkbox checked={returnTemperChecked.checked}
                                                   onChange={(e)=>this.onCheckChange(e,'returnTemper')}
                                                   indeterminate={returnTemperChecked.indeterminate}>回风温度</Checkbox>
                                    </div>
                                </div>
                                <div className="legend-item-box">
                                    {
                                        selected.map((v, i) => {
                                            let setTemper = legend[i * 3]
                                            let energy = legend[i * 3 + 1]
                                            let returnTemper = legend[i * 3 + 2]
                                            return (<div className="legend-item-row" key={i}>
                                                <span
                                                    onClick={()=>this.onClickLegendItem(setTemper.name)}
                                                    className={`legend-item ${setTemper.selected ? '' : 'legend-item-disabled'}`}>
                                                    <span className="legend-item-point"
                                                          style={{backgroundColor: `${setTemper.color}`}}></span>
                                                    {setTemper.name}
                                                </span>
                                                <span
                                                    onClick={()=>this.onClickLegendItem(energy.name)}
                                                    className={`legend-item ${energy.selected ? '' : 'legend-item-disabled'}`}>
                                                    <span className="legend-item-point"
                                                          style={{backgroundColor: `${energy.color}`}}></span>
                                                    {energy.name}
                                                </span>
                                                <span
                                                    onClick={()=>this.onClickLegendItem(returnTemper.name)}
                                                    className={`legend-item ${returnTemper.selected ? '' : 'legend-item-disabled'}`}>
                                                    <span className="legend-item-point"
                                                          style={{backgroundColor: `${returnTemper.color}`}}></span>
                                                    {returnTemper.name}
                                                </span>
                                            </div>)
                                        })
                                    }
                                </div>

                            </>
                        )
                    }

                </div>
            </div>
        )
    }
}

export default class HabitsMultiChart extends React.PureComponent {


    render() {
        let HabitsMultiChart = withEcharts(HabitsMulti)
        return (<HabitsMultiChart {...this.props}/>)
    }
}
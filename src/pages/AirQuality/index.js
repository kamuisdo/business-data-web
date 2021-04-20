import React from 'react'
import PageLayout from "../Layout";
import SearchForm from "../../components/SearchForm";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import chartColor from "../../enum/chartColor";
import {Button} from 'antd'
import AirChart from "./AirChart";
import AirMapChart from "./AirMap";
import * as api from '../../api/air'
import moment from "moment";
import './index.less'

// 默认近7日
let formInitialValues = { timeRange:[moment().subtract(7, 'days'), moment()] }

export default class AirQualityPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            // formData:formInitialValues,
            sensorCollapsed:true,
            sensor:[
                { name:'传感器1',position:{x:0,y:3} },
                { name:'传感器1',position:{x:1,y:3} },
                { name:'传感器1',position:{x:2,y:3} },
                { name:'传感器1',position:{x:3,y:3} },
                { name:'传感器1',position:{x:5,y:3} },
                { name:'传感器1',position:{x:6,y:3} },
                { name:'传感器1',position:{x:8,y:3} },
                { name:'传感器1',position:{x:10,y:3} },
                { name:'传感器1',position:{x:11,y:3} },
                { name:'传感器1',position:{x:12,y:3} },
                { name:'传感器1',position:{x:13,y:3} },
                { name:'传感器1',position:{x:14,y:3} },
                { name:'传感器1',position:{x:16,y:3} },
                //
                // { name:'传感器1',position:{x:0,y:2} },
                // { name:'传感器1',position:{x:1,y:2} },
                // { name:'传感器1',position:{x:2,y:2} },
                // { name:'传感器1',position:{x:3,y:2} },
                // { name:'传感器1',position:{x:5,y:2} },
                // { name:'传感器1',position:{x:6,y:2} },
                // { name:'传感器1',position:{x:7,y:2} },
                // { name:'传感器1',position:{x:10,y:2} },
                // { name:'传感器1',position:{x:11,y:2} },
                // { name:'传感器1',position:{x:13,y:2} },
                // { name:'传感器1',position:{x:14,y:2} },
                // { name:'传感器1',position:{x:16,y:2} },
                // { name:'传感器1',position:{x:18,y:2} },
                // { name:'传感器1',position:{x:10,y:2} },
                //
                // { name:'传感器1',position:{x:1,y:1} },
                // { name:'传感器1',position:{x:3,y:1} },
                // { name:'传感器1',position:{x:5,y:1} },
                // { name:'传感器1',position:{x:6,y:1} },
                // { name:'传感器1',position:{x:7,y:1} },
                // { name:'传感器1',position:{x:8,y:1} },
                // { name:'传感器1',position:{x:9,y:1} },
                // { name:'传感器1',position:{x:11,y:1} },
                // { name:'传感器1',position:{x:12,y:1} },
                // { name:'传感器1',position:{x:13,y:1} },
                // { name:'传感器1',position:{x:14,y:1} },
                // { name:'传感器1',position:{x:15,y:1} },
                // { name:'传感器1',position:{x:16,y:1} },
                // { name:'传感器1',position:{x:17,y:1} },
                // { name:'传感器1',position:{x:18,y:1} },
                //
                // { name:'传感器1',position:{x:1,y:0} },
                // { name:'传感器1',position:{x:2,y:0} },
                // { name:'传感器1',position:{x:3,y:0} },
                // { name:'传感器1',position:{x:5,y:0} },
                // { name:'传感器1',position:{x:7,y:0} },
                // { name:'传感器1',position:{x:9,y:0} },
                // { name:'传感器1',position:{x:10,y:0} },
                // { name:'传感器1',position:{x:11,y:0} },
                // { name:'传感器1',position:{x:12,y:0} },
                // { name:'传感器1',position:{x:13,y:0} },
                // { name:'传感器1',position:{x:14,y:0} },
                // { name:'传感器1',position:{x:15,y:0} },
                // { name:'传感器1',position:{x:16,y:0} },
                // { name:'传感器1',position:{x:17,y:0} }
            ].map((v,i)=>{
                let color = chartColor[i] || '#74BFDE'
                let disabled = false;
                return Object.assign(v,{ name:`传感器${i+1}`,color,disabled })
            }),
            co2Data:null,
            pm25Data:null,
            temperData:null,
            humidityData:null //湿度
        }
        this.handleItemEnable = this.handleItemEnable.bind(this)
        this.handleShowAll = this.handleShowAll.bind(this)
        this.updateCo2Data = this.updateCo2Data.bind(this)
        this.updatePm25Data = this.updatePm25Data.bind(this)
        this.updateTemperData = this.updateTemperData.bind(this)
        this.updateHumidityData = this.updateHumidityData.bind(this)
        this.handleFormSearch = this.handleFormSearch.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.co2Ref = React.createRef();
        this.pm25Ref = React.createRef();
        this.temperRef = React.createRef();
        this.humidityRef = React.createRef();
        this.formData = formInitialValues
    }

    componentDidMount() {
        this.updateCo2Data()
        // TODO 替换接口方法
        this.updatePm25Data()
        this.updateTemperData()
        this.updateHumidityData()
    }

    updateCo2Data(){
        this.updateData(api.getCo2,'co2Data')()
    }

    updatePm25Data(){
        this.updateData(api.getCo2,'pm25Data')()
    }

    updateTemperData(){
        this.updateData(api.getCo2,'temperData')()
    }

    updateHumidityData(){
        this.updateData(api.getCo2,'humidityData')()
    }

    updateData(apiFn,key){
        return ()=>{
            let {sensor} = this.state;
            let formData = this.formData;
            this.setState({ [key]:null })
            apiFn(Object.assign(formData,{ selected:sensor })).then((data)=>{
                this.setState({ [key]:data })
            }).catch((err)=>{
                this.setState({ [key]:false })
            })
        }
    }


    handleFormSearch(value){
        console.log(value)
        let formData = value;
        // this.setState({ formData:value });
        this.updateCo2Data()
        this.updatePm25Data()
        this.updateTemperData()
        this.updateHumidityData()
    }

    handleSearchChange(value){
        this.formData = value
    }

    handleItemEnable(name){
        let {co2Data,pm25Data,temperData,humidityData,sensor} = this.state;
        // 在有数据loading的时候，不可点击item
        if(co2Data&&pm25Data&&temperData&&humidityData
        ){
            // 找到这个sensor修改数据
            let newSensor = sensor.map((v)=>{
                if(v.name === name){
                    return Object.assign(v,{ disabled: !v.disabled })
                }
                return v
            })
            this.setState({ sensor:newSensor });
            // 切换所有图表的legend
            [this.co2Ref,this.pm25Ref,this.temperRef,this.humidityRef].forEach((ref)=>{
                ref.current.instanceRef.current.instance.dispatchAction({
                    type: 'legendToggleSelect',
                    name: name
                });
            })
        }
    }

    handleShowAll(){
        this.setState({
            sensorCollapsed:!this.state.sensorCollapsed
        })
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        let {sensorCollapsed,sensor,co2Data,pm25Data,temperData,humidityData} = this.state;
        let sensorBtnText = sensorCollapsed ? "显示全部":"收起"
        let co2Unit = 'ppm';
        let pm2Unit = 'μg/m³';
        let temperUnit = '℃';
        let humidityUnit = '%';
        return (
            <PageLayout title="空气质量报告：R&D 二楼办公室" className="air-quality-page">
                <SearchForm initialValues={formInitialValues} onFinish={this.handleFormSearch} onReset={this.handleSearchChange} onValuesChange={this.handleSearchChange}>
                    <div className="searchForm-row">
                        <TimeRangeSelector required={true}/>
                    </div>
                </SearchForm>
                <div>
                    <div className="chart-box" style={{ display:'flex',alignItems:'top',justifyContent:'space-between' }}>
                        <div className={`sensor-box ${sensorCollapsed?'sensor-box-collapsed':''}`}>
                            { sensor.map((v)=>{
                                return <div key={v.name} className={`sensor-item ${v.disabled ? 'sensor-item-disabled':''}`} onClick={()=>this.handleItemEnable(v.name)}>
                                    <span className="sensor-item-point" style={{ backgroundColor:`${v.color}` }}></span>
                                    {v.name}
                                </div> })
                            }
                        </div>
                        <Button type="link" onClick={this.handleShowAll}>{sensorBtnText}</Button>
                    </div>

                </div>
                <div style={{ display:'flex',flexWrap:'wrap' }}>
                    <div className="chart-box air-chart-box" style={{ marginRight:'20px' }}>
                        <AirChart id="co2Chart" title="CO2浓度" chartRef={this.co2Ref} data={co2Data} unitText={co2Unit} handleRefresh={this.updateCo2Data}/>
                    </div>
                    <div className="chart-box air-chart-box">
                        <AirChart id="pm25Chart" title="PM2.5" chartRef={this.pm25Ref} data={pm25Data} unitText={pm2Unit} handleRefresh={this.updatePm25Data}/>
                    </div>
                    <div className="chart-box air-chart-box" style={{ marginRight:'20px' }}>
                        <AirChart id="temperChart" title="温度" chartRef={this.temperRef} data={temperData} unitText={temperUnit} handleRefresh={this.updateTemperData}/>
                    </div>
                    <div className="chart-box air-chart-box">
                        <AirChart id="humidityChart" title="湿度" chartRef={this.humidityRef} data={humidityData} unitText={humidityUnit} handleRefresh={this.updateHumidityData}/>
                    </div>
                    <div className="chart-box air-chart-box" style={{ marginRight:'20px' }}>
                        <AirMapChart id="co2Map"
                                     title="CO2浓度地图"
                                     data={co2Data}
                                     sensor={sensor}
                                     unitText={co2Unit}
                                     handleRefresh={this.updateCo2Data}/>
                    </div>
                    <div className="chart-box air-chart-box">
                        <AirMapChart id="pm25Map"
                                     title="PM2.5浓度地图"
                                     data={pm25Data}
                                     sensor={sensor}
                                     unitText={pm2Unit}
                                     handleRefresh={this.updatePm25Data}/>
                    </div>
                    <div className="chart-box air-chart-box" style={{ marginRight:'20px' }}>
                        <AirMapChart id="temperMap"
                                     title="温度地图"
                                     data={temperData}
                                     sensor={sensor}
                                     unitText={temperUnit}
                                     handleRefresh={this.updateTemperData}/>
                    </div>
                    <div className="chart-box air-chart-box">
                        <AirMapChart id="humidityMap"
                                     title="PM2.5浓度地图"
                                     data={humidityData}
                                     sensor={sensor}
                                     unitText={humidityUnit}
                                     handleRefresh={this.updateHumidityData}/>
                    </div>
                </div>


            </PageLayout>
        )
    }
}
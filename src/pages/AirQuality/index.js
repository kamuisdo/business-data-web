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
import dayjs from 'dayjs';
import { TimeTypeEnum } from '../../enum/timeType'

// 默认近7日
let formInitialValues = { timeRange:[moment().subtract(7, 'days'), moment()] }


let sensorMacId = [
    { no:'test1',mac:'7C9EBD3F5368' },
    { no:'test2',mac:'246F28815B84' },
    { no:'1',mac:'A0000C6578D' },
    { no:'3',mac:'A0000C46AF9' },
    { no:'4',mac:'A0000382600' },
    { no:'5',mac:'A00003793EC' },
    { no:'6',mac:'A00008B91B8' },
    { no:'7',mac:'A00003793B0' },
    { no:'8',mac:'A0000C65761' },
    { no:'9',mac:'A00003856EC' },
    { no:'10',mac:'A0000C659CD' },
    { no:'11',mac:'A0000C3E7D1' },
    { no:'12',mac:'A0000C47059' },
    { no:'13',mac:'A000087EF18' },
    { no:'14',mac:'A0000EDA628' },
    { no:'15',mac:'A0000C2C0F1' },
    { no:'16',mac:'A0000CE1BB9' },
    { no:'17',mac:'A0000CE0F30' },
    { no:'18',mac:'A0000CE1F7D' },
    { no:'19',mac:'A0000C655ED' },
    { no:'20',mac:'A0000EDB73C' },
    { no:'21',mac:'A0000CE97BD' },
    { no:'22',mac:'A0000CE9981' },
    { no:'23',mac:'A0000CE99BD' },
    { no:'24',mac:'A00002AD1B4' },
    { no:'25',mac:'A0000CE1198' },
    { no:'26',mac:'A0000CEA8F9' },
    { no:'27',mac:'A0000CE0F64' },
    { no:'28',mac:'A000087FE58' },
    { no:'29',mac:'A00006BA87C' },
    { no:'30',mac:'A00002AE24C' },
    { no:'31',mac:'A000087EF34' },
    { no:'32',mac:'A0000EBA234' },
    { no:'33',mac:'A0000CE622D' },
    { no:'34',mac:'A0000C4753D' },
    { no:'35',mac:'A0000CEF009' },
    { no:'36',mac:'A0000C65A45' },
    { no:'37',mac:'A000087EF44' },
    { no:'38',mac:'A0000C46979' },
    { no:'39',mac:'A0000C34CA1' },
    { no:'40',mac:'A0000C4B479' },
    { no:'41',mac:'A000087F2D8' },
    { no:'42',mac:'A0000A2016C' },
    { no:'43',mac:'A0000672134' },
    { no:'51',mac:'A0000CE1138' },
    { no:'52',mac:'A00007A1D10' },
    { no:'53',mac:'A000043AF24' },
    { no:'54',mac:'A00008C8B7C' },
    { no:'55',mac:'A0000219C64' },
    { no:'56',mac:'A000038756C' },
    { no:'57',mac:'A0000161938' },
    { no:'58',mac:'A0000C2C899' },
    { no:'59',mac:'A00003857FC' },
    { no:'60',mac:'A00001AAE3C' },
    { no:'61',mac:'A0000161E3C' },
    { no:'62',mac:'A0000ECFF68' },
    { no:'63',mac:'A00001A391C' },
    { no:'64',mac:'A000025F120' },
    { no:'65',mac:'A000032A258' },
    { no:'66',mac:'A000038DCAC' },
    { no:'67',mac:'A000025F26C' },
    { no:'68',mac:'A000025BB30' },
    { no:'69',mac:'A00006725A0' },
    { no:'70',mac:'A0000385800' },
    { no:'71',mac:'A00002B1D90' },
    { no:'72',mac:'A00002AD238' },
    { no:'73',mac:'A00007A19A8' },
    { no:'74',mac:'A000025F128' },
    { no:'75',mac:'A00002ACD38' },
    { no:'76',mac:'A000021955C' },
    { no:'77',mac:'A00008A21D8' },
    { no:'78',mac:'A0000A1D18C' },
    { no:'79',mac:'A0000385A2C' },
    { no:'80',mac:'A000087F000' },
    { no:'81',mac:'A00002ABB68' },
    { no:'82',mac:'A00008C8BA8' },
    { no:'83',mac:'A00002ADB74' },
    { no:'84',mac:'A0000EB9864' },
    { no:'85',mac:'A0000C65AAD' },
    { no:'86',mac:'A0000C65701' },
    { no:'87',mac:'A0000CEBC85' },
]

let sensorPosition = [
    { no:'test1',position:{x:0,y:4} },
    { no:'test2',position:{x:1,y:4} },
    // { no:'87',position:{x:0,y:3} },
    // { no:'85',position:{x:1,y:3} },
    // { no:'11',position:{x:2,y:3} },
    // { no:'6',position:{x:3,y:3} },
    // { no:'82',position:{x:5,y:3} },
    // { no:'78',position:{x:6,y:3} },
    // { no:'80',position:{x:7,y:3} },
    // { no:'72',position:{x:8,y:3} },
    // { no:'63',position:{x:9,y:3} },
    // { no:'65',position:{x:10,y:3} },
    // { no:'56',position:{x:11,y:3} },
    // { no:'57',position:{x:12,y:3} },
    // { no:'59',position:{x:13,y:3} },
    // { no:'42',position:{x:14,y:3} },
    // { no:'38',position:{x:15,y:3} },
    // { no:'35',position:{x:16,y:3} },
    // { no:'30',position:{x:17,y:3} },
    // //
    // { no:'86',position:{x:0,y:2} },
    // { no:'4',position:{x:1,y:2} },
    // { no:'26',position:{x:2,y:2} },
    // { no:'3',position:{x:3,y:2} },
    // { no:'84',position:{x:5,y:2} },
    // { no:'77',position:{x:6,y:2} },
    // { no:'81',position:{x:7,y:2} },
    // { no:'71',position:{x:8,y:2} },
    // { no:'76',position:{x:9,y:2} },
    // { no:'62',position:{x:10,y:2} },
    // { no:'52',position:{x:11,y:2} },
    // { no:'53',position:{x:12,y:2} },
    // { no:'55',position:{x:13,y:2} },
    // { no:'41',position:{x:14,y:2} },
    // { no:'37',position:{x:15,y:2} },
    // { no:'34',position:{x:16,y:2} },
    // { no:'29',position:{x:17,y:2} },
    // //
    // { no:'14',position:{x:1,y:1} },
    // { no:'23',position:{x:2,y:1} },
    // { no:'7',position:{x:3,y:1} },
    // { no:'5',position:{x:4,y:1} },
    // { no:'79',position:{x:5,y:1} },
    // { no:'70',position:{x:6,y:1} },
    // { no:'69',position:{x:7,y:1} },
    // { no:'73',position:{x:8,y:1} },
    // { no:'64',position:{x:9,y:1} },
    // { no:'60',position:{x:10,y:1} },
    // { no:'68',position:{x:11,y:1} },
    // { no:'54',position:{x:12,y:1} },
    // { no:'51',position:{x:13,y:1} },
    // { no:'40',position:{x:14,y:1} },
    // { no:'36',position:{x:15,y:1} },
    // { no:'32',position:{x:16,y:1} },
    // { no:'28',position:{x:17,y:1} },
    //
    // { no:'17',position:{x:1,y:0} },
    // { no:'20',position:{x:2,y:0} },
    // { no:'8',position:{x:3,y:0} },
    // { no:'9',position:{x:4,y:0} },
    // { no:'83',position:{x:5,y:0} },
    // { no:'74',position:{x:7,y:0} },
    // { no:'75',position:{x:8,y:0} },
    // { no:'66',position:{x:9,y:0} },
    // { no:'67',position:{x:10,y:0} },
    // { no:'61',position:{x:11,y:0} },
    // { no:'58',position:{x:12,y:0} },
    // { no:'43',position:{x:13,y:0} },
    // { no:'39',position:{x:14,y:0} },
    // { no:'33',position:{x:15,y:0} },
    // { no:'31',position:{x:16,y:0} },
    // { no:'1',position:{x:17,y:0} }
].map((v,i)=>{
    let mac = sensorMacId.find((t)=>{ return t.no === v.no }).mac;
    let name = `传感器${v.no}`
    let color = chartColor[i] || '#74BFDE'
    let disabled = false;
    return Object.assign(v,{ name,mac,color,disabled })
})



export default class AirQualityPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            // formData:formInitialValues,
            sensorCollapsed:true,
            sensor:sensorPosition,
            co2Data:null,
            pm25Data:null,
            temperData:null,
            humidityData:null //湿度
        }
        this.handleItemEnable = this.handleItemEnable.bind(this)
        this.handleShowAll = this.handleShowAll.bind(this)
        // this.updateCo2Data = this.updateCo2Data.bind(this)
        // this.updatePm25Data = this.updatePm25Data.bind(this)
        // this.updateTemperData = this.updateTemperData.bind(this)
        // this.updateHumidityData = this.updateHumidityData.bind(this)
        this.handleFormSearch = this.handleFormSearch.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.co2Ref = React.createRef();
        this.pm25Ref = React.createRef();
        this.temperRef = React.createRef();
        this.humidityRef = React.createRef();
        this.formData = formInitialValues
        // 默认按照小时显示
        this.timeType = 'hour'  // 可选值：day,month,hour,min
        this.timeTypeFormat = TimeTypeEnum.get('hour').format
    }

    componentDidMount() {
        // this.updateCo2Data()
        // this.updatePm25Data()
        // this.updateTemperData()
        // this.updateHumidityData()

        this.loadData()
    }

    loadData(){
        let {sensor} = this.state;
        let formData = this.formData;
        this.setState({ 
            co2Data:null, 
            pm25Data:null, 
            temperData:null, 
            humidityData:null
        })
        let sensorList = sensor.map((v)=>{ return v.mac})
        // 默认按照小时显示
        let timeType = this.timeType
        let timeTypeFormat = this.timeTypeFormat
        api.getAirSensorData({
            beginTime:dayjs(formData.timeRange[0]).format('YYYY-MM-DD'),
            endTime:dayjs(formData.timeRange[1]).format('YYYY-MM-DD'),
            timeType,
            sensorList
        }).then((data)=>{
            let co2Data =[]
            let pm25Data = []
            let temperData =[]
            let humidityData = []
            // data.forEach((v)=>{
            //     sensorList = sensorList.concat(v.sensorList)
            // })
            // // 所有存在数据的时间点
            // let timeList = []
            // 先对data的collectTime排序
            data = data.sort((a,b)=>{ return dayjs(a.collectTime) - dayjs(b.collectTime)  })
            sensor.forEach((v)=>{
                // 应该能找到多个时间的数据
                let thisSensorData = data.filter((t)=>{ return v.mac === t.sensorMac })
                if(thisSensorData.length > 0){
                    console.log(v.mac);
                    console.log(thisSensorData.length);
                }
                // timeList = timeList.concat(thisSensorData.map((v)=>{return v.collectTime}))
                co2Data.push({
                    name:v.name,
                    data:thisSensorData.map((t)=>{ return [dayjs(t.collectTime).format(timeTypeFormat),t.co2] })
                })
                pm25Data.push({
                    name:v.name,
                    data:thisSensorData.map((t)=>{ return [dayjs(t.collectTime).format(timeTypeFormat),t.pm25] })
                })
                temperData.push({
                    name:v.name,
                    data:thisSensorData.map((t)=>{ return [dayjs(t.collectTime).format(timeTypeFormat),t.temp1] })
                })
                humidityData.push({
                    name:v.name,
                    data:thisSensorData.map((t)=>{ return [dayjs(t.collectTime).format(timeTypeFormat),t.humidity] })
                })
                // return Object.assign({},v,{ data:thisSensorData })
            })
            console.log(temperData);
            // console.log(pm25Data);
            // console.log(temperData);
            // console.log(humidityData);
            this.setState({ co2Data,pm25Data,temperData,humidityData })
        })
        // .catch((err)=>{
        //     console.log(err);
        //     this.setState({ co2Data:false,pm25Data:false,temperData:false,humidityData:false })
        // })
    }

    // updateCo2Data(){
    //     this.updateData(api.getCo2,'co2Data')()
    // }

    // updatePm25Data(){
    //     this.updateData(api.getCo2,'pm25Data')()
    // }

    // updateTemperData(){
    //     this.updateData(api.getCo2,'temperData')()
    // }

    // updateHumidityData(){
    //     this.updateData(api.getCo2,'humidityData')()
    // }

    // updateData(apiFn,key){
    //     return ()=>{
    //         let {sensor} = this.state;
    //         let formData = this.formData;
    //         this.setState({ [key]:null })
    //         apiFn(Object.assign(formData,{ selected:sensor })).then((data)=>{
    //             this.setState({ [key]:data })
    //         }).catch((err)=>{
    //             this.setState({ [key]:false })
    //         })
    //     }
    // }


    handleFormSearch(value){
        console.log(value)
        // let formData = value;
        this.formData = value
        this.loadData()
        // this.setState({ formData:value });
        // this.updateCo2Data()
        // this.updatePm25Data()
        // this.updateTemperData()
        // this.updateHumidityData()
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
                        <AirChart id="co2Chart" title="CO2浓度" timeTypeFormat={this.timeTypeFormat} chartRef={this.co2Ref} data={co2Data} unitText={co2Unit} handleRefresh={this.loadData}/>
                    </div>
                    <div className="chart-box air-chart-box">
                        <AirChart id="pm25Chart" title="PM2.5" timeTypeFormat={this.timeTypeFormat} chartRef={this.pm25Ref} data={pm25Data} unitText={pm2Unit} handleRefresh={this.loadData}/>
                    </div>
                    <div className="chart-box air-chart-box" style={{ marginRight:'20px' }}>
                        <AirChart id="temperChart" title="温度" timeTypeFormat={this.timeTypeFormat} chartRef={this.temperRef} data={temperData} unitText={temperUnit} handleRefresh={this.loadData}/>
                    </div>
                    <div className="chart-box air-chart-box">
                        <AirChart id="humidityChart" title="湿度" timeTypeFormat={this.timeTypeFormat} chartRef={this.humidityRef} data={humidityData} unitText={humidityUnit} handleRefresh={this.loadData}/>
                    </div>
                    <div className="chart-box air-chart-box" style={{ marginRight:'20px' }}>
                        <AirMapChart id="co2Map"
                                     title="CO2浓度地图"
                                     data={co2Data}
                                     sensor={sensor}
                                     unitText={co2Unit}
                                     handleRefresh={this.loadData}/>
                    </div>
                    <div className="chart-box air-chart-box">
                        <AirMapChart id="pm25Map"
                                     title="PM2.5浓度地图"
                                     data={pm25Data}
                                     sensor={sensor}
                                     unitText={pm2Unit}
                                     handleRefresh={this.loadData}/>
                    </div>
                    <div className="chart-box air-chart-box" style={{ marginRight:'20px' }}>
                        <AirMapChart id="temperMap"
                                     title="温度地图"
                                     data={temperData}
                                     sensor={sensor}
                                     unitText={temperUnit}
                                     handleRefresh={this.loadData}/>
                    </div>
                    <div className="chart-box air-chart-box">
                        <AirMapChart id="humidityMap"
                                     title="PM2.5浓度地图"
                                     data={humidityData}
                                     sensor={sensor}
                                     unitText={humidityUnit}
                                     handleRefresh={this.loadData}/>
                    </div>
                </div>


            </PageLayout>
        )
    }
}
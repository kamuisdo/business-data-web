import React from "react";
import withEcharts from "../../../components/withEcharts";
import numeral from 'numeral-es6';
import sumBy from 'lodash/sumBy';

/**
 * 每个LCNo连接的系统数
 */
class LcLinkCount extends React.Component{

    constructor(props) {
        super(props);
        this.instance = null;
        this.total = null
        // this.height = 360
        this.state = {
            height:360
        }
    }


    componentDidMount() {
        let { initEcharts,getOptionWithDefault } = this.props;
        let chartDom = document.getElementById('LcLinkCountChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let option = getOptionWithDefault({
            title:{
                text:'每个LCNo连接的系统数'
            },
            legend:{
                top:'center',
                left:'50%',
                orient:'vertical',
                // formatter: [
                //     '{a|这段文本采用样式a}',
                //     '{b|89.00%}这段用默认样式{c|这段用样式x}'
                // ].join('\n'),
                itemGap:20,
                // formatter: '{a|{name}} |{b|89.00%} |{c|3,213}',
                textStyle:{
                    rich:{
                        a:{
                            width:112,
                            align:'center',
                            color:'#1B253A'
                        },
                        b:{
                            width:60,
                            align:'center',
                            color:'#7A8392'
                        },
                        c:{
                            width:60,
                            align:'center',
                            color:'#1B253A'
                        }
                    }
                }
            },
            tooltip:{
                trigger: 'item'
            },

            color:['#2B6AFF','#F759AA','#FEAEDB','#FBD237','#94DFF3','#965DE7','#4ADE63'],
            series: []
        })
        myChart.setOption(option);
        this.loadData()
    }

    loadData(){
        let {query,requestFn} = this.props;
        this.total = null
        return requestFn(this.instance,query).then((data)=>{
            this.total = sumBy(data,'num')
            let height = 36*data.length > 360 ? 36*data.length : 360
            this.updateSeries(data)
            // console.log(height);
            this.instance.resize({ 
                height:height,
                animation:{ duration:0 } 
            })
            this.setState({ height })
        })
    }

    // 设置line的参数
    updateSeries(data){
        
        data = data.map((v)=>{
            return {
                value:v.num,
                name:`LCNo链接${v.lcNoToLineType}个系统`,
                percent:`${(v.num/this.total*100).toFixed(2)}%`
            }
        })
        let {getDefaultSeriesOpt} = this.props;
        let legend = {
            // formatter: `{a|{name}} |{b|${percent}} |{c|${value}}`,
            formatter:(name)=>{
                // console.log(...arguments);
                // console.log(name1,name2);
                let item = data.find((v)=>{ return v.name === name  })
                if(item){
                    return `{a|${name}} |{b|${item.percent}} |{c|${item.value}}`
                }else{
                    return ''
                }
                
            }
        }
        let series = [
            {
                name:'Lc No 连接数',
                type:'pie',
                radius: ['60%', '70%'],
                labelLine: {
                    show: false
                },
                label: {
                    show: false,
                    position: 'center'
                },
                itemStyle: {
                    borderRadius: 2,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                left:'-50%',
                data
                // data:[
                //     {value: 1048, name: 'LCNo链接1个系统'},
                //     {value: 735, name: 'LCNo链接2个系统'},
                //     {value: 580, name: 'LCNo链接3个系统'},
                //     {value: 484, name: 'LCNo链接4个系统'},
                //     {value: 302, name: 'LCNo链接5个系统'},
                //     {value: 486, name: 'LCNo链接6个系统'},
                //     {value: 300, name: 'LCNo链接7个系统'}
                // ]
            },
        ]

        this.instance.setOption(getDefaultSeriesOpt({ series,legend }))
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        let style = { height:`${this.height}px` }
        return (
            <div style={style}>
                <div className="LcLinkCountChart-text-box" style={{ position:"absolute",display:'flex',justifyContent:'center',flexDirection:'column',width:'50%',height:'100%' }}>
                    <div style={{ margin:'0 auto' }}>
                        <p style={{ color:'#7A8392',fontSize:'12px',textAlign:'center',margin:'0px' }}>系统总数</p>
                        <p style={{ fontSize:'24px',margin:'0px' }}>{ this.total ? numeral(this.total).format('0,0') : '' }</p>
                    </div>
                </div>
                <div id="LcLinkCountChart" style={style}></div>
            </div>
        )
    }
}

export default class LcLinkCountChart extends React.PureComponent{

    render() {
        let LcLinkCountChart = withEcharts(LcLinkCount)
        return (<LcLinkCountChart {...this.props}/>)
    }
}
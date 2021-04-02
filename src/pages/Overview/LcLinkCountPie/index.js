import React from "react";
import withEcharts from "../../../components/withEcharts";

/**
 * 每个LCNo连接的系统数
 */
class LcLinkCount extends React.Component{

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
        let chartDom = document.getElementById('LcLinkCountChart');
        let myChart = initEcharts(chartDom);
        this.instance = myChart;
        let series = this.updateSeries();
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
                formatter: '{a|{name}} |{b|89.00%} |{c|3,213}',
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
            series: series
        })
        myChart.setOption(option);

    }

    // 设置line的参数
    updateSeries(){
        return [
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
                data:[
                    {value: 1048, name: 'LCNo链接1个系统'},
                    {value: 735, name: 'LCNo链接2个系统'},
                    {value: 580, name: 'LCNo链接3个系统'},
                    {value: 484, name: 'LCNo链接4个系统'},
                    {value: 302, name: 'LCNo链接5个系统'},
                    {value: 486, name: 'LCNo链接6个系统'},
                    {value: 300, name: 'LCNo链接7个系统'}
                ]
            },
        ]
    }

    render() {
        return (
            <>
                <div className="LcLinkCountChart-text-box" style={{ position:"absolute",display:'flex',justifyContent:'center',flexDirection:'column',width:'50%',height:'100%' }}>
                    <div style={{ margin:'0 auto' }}>
                        <p style={{ color:'#7A8392',fontSize:'12px',textAlign:'center',margin:'0px' }}>系统总数</p>
                        <p style={{ fontSize:'24px',margin:'0px' }}>40,345</p>
                    </div>
                </div>
                <div id="LcLinkCountChart" style={{height:'360px'}}></div>
            </>
        )
    }
}

export default class LcLinkCountChart extends React.Component{

    render() {
        let LcLinkCountChart = withEcharts(LcLinkCount)
        return (<LcLinkCountChart {...this.props}/>)
    }
}
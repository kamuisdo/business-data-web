import React from "react";
import './index.less'
import numeral from 'numeral-es6';
import { chinaMapCount } from '../../../api/overview'

export default class ChinaMapCount extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            projectCount:0,
            lcCount:0,
            sysCount:0,
            innerCount:0
        }
    }

    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.query && (prevProps.query !== this.props.query)){
            this.loadData()
        }
    }

    loadData(){
        let {query} = this.props;
        chinaMapCount(query).then((data)=>{
            this.setState({
                projectCount:data.buildingNumTotal,
                lcCount:data.lcNoNumTotal,
                sysCount:data.lineNumTotal,
                innerCount:data.inunitNumTotal
            })
        }).catch((err)=>{
            this.setState({
                projectCount:'获取失败',
                lcCount:'获取失败',
                sysCount:'获取失败',
                innerCount:'获取失败',
            })
        })
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        let {projectCount,lcCount,sysCount,innerCount} = this.state;
        return (
            <>
                <h3>空调机安装数量</h3>
                <div className="china-map-count-item">
                    <span className='china-map-count-text'>物件数(家)</span>
                    <span className='china-map-count-count'>{numeral(projectCount).format('0,0')}</span>
                </div>
                <div className="china-map-count-item">
                    <span className='china-map-count-text'>LCNo数(台)</span>
                    <span className='china-map-count-count'>{numeral(lcCount).format('0,0')}</span>
                </div>
                <div className="china-map-count-item">
                    <span className='china-map-count-text'>系统数(套)</span>
                    <span className='china-map-count-count'>{numeral(sysCount).format('0,0')}</span>
                </div>
                <div className="china-map-count-item">
                    <span className='china-map-count-text'>内机数(台)</span>
                    <span className='china-map-count-count'>{numeral(innerCount).format('0,0')}</span>
                </div>
            </>
        )
    }
}
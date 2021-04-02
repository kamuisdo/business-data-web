import React from "react";
import './index.less'
import numeral from 'numeral-es6';

export default class ChinaMapCount extends React.Component{
    render() {
        let {projectCount=0,LcCount=0,SysCount=0,InnerCount=0} = this.props;
        return (
            <>
                <h3>空调机安装数量</h3>
                <div className="china-map-count-item">
                    <span className='china-map-count-text'>物件数(家)</span>
                    <span className='china-map-count-count'>{numeral(projectCount).format('0,0')}</span>
                </div>
                <div className="china-map-count-item">
                    <span className='china-map-count-text'>LCNo数(台)</span>
                    <span className='china-map-count-count'>{numeral(LcCount).format('0,0')}</span>
                </div>
                <div className="china-map-count-item">
                    <span className='china-map-count-text'>系统数(套)</span>
                    <span className='china-map-count-count'>{numeral(SysCount).format('0,0')}</span>
                </div>
                <div className="china-map-count-item">
                    <span className='china-map-count-text'>内机数(台)</span>
                    <span className='china-map-count-count'>{numeral(InnerCount).format('0,0')}</span>
                </div>
            </>
        )
    }
}
import React from "react";
import './OverallItem.less'

export default class OverallItem extends React.Component{
    render() {
        let {title,count,change} = this.props;
        return (
            <div className="overall-item">
                <p className="overall-item-title">{title}</p>
                <p className="overall-item-count">{count}</p>
                <p className="overall-item-change">{change}</p>
            </div>
        )
    }
}
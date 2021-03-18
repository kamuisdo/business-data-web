import React from 'react';
import './index.less'

export default class ContentWrapper extends React.Component{
    render() {
        let {title,children} = this.props;
        return (
            <div className="content-wrapper">
                <div className="content-wrapper-title"><span>{title}</span></div>
                <div className="content-wrapper-section">{children}</div>
            </div>
        )
    }
}
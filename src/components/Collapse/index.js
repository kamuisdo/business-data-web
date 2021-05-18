import React from "react";
import {Button} from 'antd'
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import './index.less'

export default class Collapse extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed:true
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(){
        this.setState({
            collapsed:!this.state.collapsed
        })
    }

    render() {
        let buttonText = this.state.collapsed ? '展开':'收起'
        let icon =  this.state.collapsed ? <DownOutlined/> : <UpOutlined/>
        let className = this.state.collapsed ? 'collapse-box-collapsed':''
        let {title,children} = this.props
        return (
            <div className={`collapse-box ${className}`}>
                <Button className="collapse-button" onClick={this.handleChange} style={{ position:'absolute' }} type='link'>{buttonText}{icon}</Button>
                { this.state.collapsed && <p className="collapse-title">{title}</p> }
                { !this.state.collapsed && <div className="collapse-content">{children}</div> }
            </div>
        )
    }
}
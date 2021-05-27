import React from "react";
import src from '../../assets/404@2x.png'
import {Button} from 'antd'
import './index.less'
import { withRouter } from 'react-router-dom'

class NotFound extends React.Component{

    goBack = ()=>{
        let {history} = this.props;
        history.goBack()
    }

    render() {
        return (
            <div className="notFound-page">
                <img src={src} />
                <p>您所查找的页面找不到了～</p>
                <Button type="link" onClick={this.goBack}>返回上一页</Button>
            </div>
        )
    }
}

export default withRouter(NotFound)
import React from "react";
import src from '../../assets/暂无数据@2x.png'
import {Button} from 'antd'

export default class ErrorChart extends React.Component{

    render() {
        let {height="360px",width="100%",handleClick} = this.props;
        let style = {
            height:height,
            width:width,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            margin:'0 auto'
        }
        return (
            <div style={style}>
                <div style={{ margin:'0 auto',width:'212px' }}>
                    <img width='212px' height='auto'  src={src} />
                    <Button onClick={handleClick} type='link'>数据加载失败，点击重新加载</Button>
                </div>
            </div>
        )
    }
}
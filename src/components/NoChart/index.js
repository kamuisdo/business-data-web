import React from "react";
import src from '../../assets/暂无数据@2x.png'

export default class NoChart extends React.Component{

    render() {
        let {height="360px",width="100%"} = this.props;
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
                    <p style={{color:'#7A8392',textAlign:'center'}}>暂无数据</p>
                </div>


            </div>
        )
    }
}
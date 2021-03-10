import React from "react";
import {Button} from "antd";
import PageLayout from "../Layout";
import MapCharts from "./MapCharts";
import withEcharts from '../../components/withEcharts'


class IndexContent extends React.Component{

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = { ifShow:true };
    }

    componentDidMount() {

    }

    onClick(){
        this.setState({ifShow: !this.state.ifShow})
    }

    render() {
        let MyMapChart = withEcharts(MapCharts)
        return (
            <div style={{height:'100%',width:'100%'}}>
                <Button onClick={this.onClick} type="primary">Button</Button>
                {this.state.ifShow && <MyMapChart/>}
            </div>
        )
    }
}

export default class Index extends React.Component{
    render() {
        return (<PageLayout content={ <IndexContent/> } />)
    }
}
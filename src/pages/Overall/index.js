import React from "react";
import {Button} from "antd";
import PageLayout from "../Layout";

class OverallContent extends React.Component{
    render() {
        return (
            <div><Button type="primary">Button</Button></div>
        )
    }
}

export default class Index extends React.Component{
    render() {
        return (<PageLayout content={"OverallContent"} />)
    }
}
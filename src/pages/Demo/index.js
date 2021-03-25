import React from "react";
import PageLayout from "../Layout";
import TimeLineChart from './TimeLineChart'
import MultiLineChart from "./MultiLineChart";
import MultiBarChart from './MultiBarChart'
import StepLineChart from './StepLineChart'
import {Form,Select,Button} from 'antd'
import './index.less'

export default class Demo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {multiValue:[]}
    }

    render() {

        const onFinish = (values) => {
            console.log(values);
            this.setState({ multiValue:[...values.project] })
        };

        return(
            <PageLayout>
                <div style={{ display:"flex",justifyContent:'space-between',flexWrap:"wrap" }}>
                    {/*<div className="demo-chart-box">*/}
                    {/*    <h1>时间轴伸缩demo</h1>*/}
                    {/*    <TimeLineChart id='timeLineDemo' />*/}
                    {/*</div>*/}
                    <div className="demo-chart-box">
                        <h1>柱状图伸缩（单对象耗电量分析）demo</h1>
                        <MultiBarChart id="multiBarChart"/>
                    </div>
                    <div className="demo-chart-box">
                        <h1>多选折线比较（多对象耗电量分析）Demo</h1>
                        <Form onFinish={onFinish}>
                            <Form.Item
                                label="请选择物件"
                                name="project"
                            >
                                <Select mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="物件名称">
                                    <Select.Option key="a">星巴克A店</Select.Option>
                                    <Select.Option key="b">星巴克B店</Select.Option>
                                    <Select.Option key="c">星巴克C店</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                            </Form.Item>
                        </Form>
                        {this.state.multiValue.length > 0 ?
                            <MultiLineChart id="multiLineDemo" selected={this.state.multiValue} />
                            : <p>选择物件之后展示图表</p>
                        }
                    </div>
                    <div className="demo-chart-box">
                        <h1>单对象设定温度与回风温度及耗电量分析</h1>
                        <StepLineChart id='stepLineChart'/>
                    </div>
                </div>
            </PageLayout>
        )
    }
}
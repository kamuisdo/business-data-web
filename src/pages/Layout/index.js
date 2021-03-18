import React from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import './index.css';
import {Link} from "react-router-dom"

const { Header, Sider, Content } = Layout;

export default class PageLayout extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        let toggleBtn = <span onClick={this.toggle} className="trigger" style={{padding:'24px'}}>{this.state.collapsed ? <MenuUnfoldOutlined/> :<MenuFoldOutlined/>}</span>
        let logoText = this.state.collapsed ? "商用":"大金商用事业数据";
        return (
            <Layout style={{minHeight: "100vw"}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="layout-logo">{logoText}</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="index" icon={<UserOutlined />}>
                            <Link to="/index" >全国数据统计</Link>
                        </Menu.Item>
                        <Menu.Item key="single" icon={<VideoCameraOutlined />}>
                            <Link to="/single" >单机搜索</Link>
                        </Menu.Item>
                        <Menu.Item key="sensor" icon={<UploadOutlined />}>
                            <Link to="/sensor" >传感器</Link>
                        </Menu.Item>
                        <Menu.Item key="outer" icon={<UploadOutlined />}>
                            <Link to="/outer" >室外机</Link>
                        </Menu.Item>
                        <Menu.Item key="inner" icon={<UploadOutlined />}>
                            <Link to="/inner" >室内机</Link>
                        </Menu.Item>
                        <Menu.Item key="xinfeng" icon={<UploadOutlined />}>
                            <Link to="/xinfeng" >新风机</Link>
                        </Menu.Item>
                        <Menu.Item key="error" icon={<UploadOutlined />}>
                            <Link to="/error" >异常</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {toggleBtn}
                    </Header>
                    <Content className="site-layout-background" style={{backgroundColor:'#fafafa',padding:'10px'}}>
                        {this.props.content}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
import React from 'react';
import { Layout, Menu,Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import './index.less';
import './ant_reset.less'
import {Link} from "react-router-dom"
import logo_heng from '../../assets/icon/logo-横@2x.png'
import logo_shu from '../../assets/icon/logo-竖@2x.png'
import overview_icon from '../../assets/icon/整体概览@2x.png'
import online_icon from '../../assets/icon/在线率统计@2x.png'
import energy_icon from '../../assets/icon/节能统计@2x.png'
import time_icon from '../../assets/icon/运转时间@2x.png'
import habits_icon from '../../assets/icon/使用习惯@2x.png'
import aq_icon from '../../assets/icon/空气质量@2x.png'
import search_icon from '../../assets/icon/物件查询@2x.png'
import store from 'store'
import storeKeyName from "../../utils/storeKeyName";
import { withRouter } from 'react-router-dom'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;



class PageLayout extends React.Component {
    state = {
        collapsed: false,
        defaultSelectedKeys:[window.location.hash.split('#/')[1]],
        selectedMenu:[window.location.hash.split('#/')[1]] // 默认展示整体数据
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleMenuSelect = (obj)=>{
        console.log(obj)
        this.setState({
            selectedMenu:obj.selectedKeys
        });
    }

    getOpenKeys(){
        if(this.state.selectedMenu[0].indexOf('-single')>=0){
            return [this.state.selectedMenu[0].split('-single')[0]]
        }
        if(this.state.selectedMenu[0].indexOf('-multi')>=0){
            return [this.state.selectedMenu[0].split('-multi')[0]]
        }
    }

    onLogOut = () => {
        // TODO 调用登出接口
        // 清除store里面的值
        store.set(storeKeyName.token,null)
        store.set(storeKeyName.user,null)
        let { history } = this.props
        history.push({pathname: '/login'})
    }

    render() {
        let { title,className='' } = this.props;
        let toggleBtn = <span onClick={this.toggle} className="trigger" style={{padding:'24px'}}>{this.state.collapsed ? <MenuUnfoldOutlined/> :<MenuFoldOutlined/>}</span>
        let logoText = this.state.collapsed ? <img src={logo_shu}/>:<img src={logo_heng}/>;
        // 选中子菜单时，去掉key中的-single或者-multi得到submenu的key
        let openKeys = this.getOpenKeys()
        let user = store.get(storeKeyName.user)
        let userName = user ? user.loginName : '未登录'
        return (
            <Layout style={{minHeight: "100vh"}}>
                <Sider theme="light" width="220px" trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="layout-logo">{logoText}</div>
                    <Menu
                        theme="light"
                        mode="inline"
                        // selectedKeys={this.state.selectedMenu}
                        defaultSelectedKeys={this.state.defaultSelectedKeys}
                        defaultOpenKeys={openKeys}
                        // onSelect={this.handleMenuSelect}
                        style={{  }}>
                        <Menu.Item key="overview" icon={<img className="menuIcon" src={overview_icon} />}>
                            <Link to="/overview" >整体概览</Link>
                        </Menu.Item>
                        <SubMenu key="online-rate" icon={<img className="menuIcon" src={online_icon} />} title="在线率统计">
                            <Menu.Item key="online-rate-single"><Link to="/online-rate-single" >单对象数据统计</Link></Menu.Item>
                            <Menu.Item key="online-rate-multi"><Link to="/online-rate-multi" >多对象数据对比</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="energy" icon={<img className="menuIcon" src={energy_icon} />} title="节能统计">
                            <Menu.Item key="energy-single"><Link to="/energy-single" >单对象数据统计</Link></Menu.Item>
                            <Menu.Item key="energy-multi"><Link to="/energy-multi" >多对象数据对比</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="time" icon={<img className="menuIcon" src={time_icon} />} title="运转时间统计">
                            <Menu.Item key="time-single"><Link to="/time-single" >单对象数据统计</Link></Menu.Item>
                            <Menu.Item key="time-multi"><Link to="/time-multi" >多对象数据对比</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="habits" icon={<img className="menuIcon" src={habits_icon} />} title="使用习惯">
                            <Menu.Item key="habits-single"><Link to="/habits-single" >单对象数据统计</Link></Menu.Item>
                            <Menu.Item key="habits-multi"><Link to="/habits-multi" >多对象数据对比</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="air-quality" icon={<img className="menuIcon" src={aq_icon} />}>
                            <Link to="/air-quality" >空气质量</Link>
                        </Menu.Item>
                        <Menu.Item key="project-query" icon={<img className="menuIcon" src={search_icon} />}>
                            <Link to="/project-query" >物件查询</Link>
                        </Menu.Item>
                        {/*<Menu.Item key="demo" icon={<img className="menuIcon" src={overview_icon} />}>*/}
                        {/*    <Link to="/demo" >demo页</Link>*/}
                        {/*</Menu.Item>*/}

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {toggleBtn}
                        <div className="header-right-box">
                            {/*<img className="avatar" src={store.get('userAvatar')}/>*/}
                            <p className="header-userName">{userName}</p>
                            <Button type="link" onClick={this.onLogOut} icon={<LogoutOutlined style={{ color:'#333' }} />}></Button>
                        </div>
                    </Header>
                    <Content className={`site-layout-background site-layout-content ${className}`}>
                        <div className="site-layout-content-wrapper">
                            { title&&title.length>0 && <h3 className="contentTitle">{title}</h3> }
                            {this.props.content ? this.props.content : this.props.children}
                        </div>

                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(PageLayout)
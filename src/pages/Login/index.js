import React from "react";
import './index.less'
import logo_heng from '../../assets/icon/logo-横@2x.png'
import { InfoOutlined,UserOutlined,LockOutlined } from '@ant-design/icons'
import { Form, Input, Button } from 'antd';
import { login } from '../../api/common'
import store from 'store'
import storeKeyName from "../../utils/storeKeyName";
import { withRouter } from 'react-router-dom'

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.formRef = React.createRef()
        this.onFinish = this.onFinish.bind(this)
        this.state = { loading:false }
    }

    onFinish(value){
        this.setState({ loading:true })
        login(value).then((data)=>{
            store.set(storeKeyName.token,data.token)
            store.set(storeKeyName.user,data)
            let { history } = this.props
            history.push({pathname: '/overview'})
        }).catch((e)=>{
            // 密码错误的时候重置密码框
            // console.log(e.message.split(':')[0])
            this.setState({ loading:false })
            if(e.message.split(':')[0] === '400003'){
                this.formRef.current.setFieldsValue({ password:undefined })
            }
        })
    }

    render() {
        let {loading} = this.state
        return (<div className="login-page">
            <div className="header-nav login-outer-wrapper">
                <div className="header-nav-box login-outer-box">
                    <img className="icon" src={logo_heng}/>
                    <p className="welcome-text">欢迎登陆</p>
                </div>
            </div>
            <div className="middle-content login-outer-wrapper">
                <div className="middle-content-box login-outer-box">
                    <div className="text-box">
                        <p className="bold-title">商用VRV</p>
                        <p className="bold-title">数据可视化后台</p>
                        <p className="sub-title">高效的商用数据分析平台，打造全面的数据展示界面</p>
                    </div>
                    <div className="login-form">
                        <div className="tip-box">
                            <span className="icon-box"><InfoOutlined style={{ color:'#fff',fontSize:'10px' }} /></span>
                            <span className="tip-text">为了数据安全，请不要随意将账户分享给他人。</span>
                        </div>
                        <div style={{ padding:'0 30px' }}>
                            <p className="login-title">账户登录</p>
                            <Form
                                name="basic"
                                onFinish={this.onFinish}
                                ref={this.formRef}
                                // onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    name="loginName"
                                    rules={[{ required: true, message: '请输入用户名' }]}
                                >
                                    <Input name="loginName" prefix={<UserOutlined style={{ color:"#BEBEBE" }} />} placeholder="请输入账户名称"/>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '请输入密码!' }]}
                                >
                                    <Input name="password" type="password" prefix={<LockOutlined style={{ color:"#BEBEBE" }} />} placeholder="请输入密码"/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" loading={loading} htmlType="submit" style={{ width:'100%',height:'36px',marginTop:'15px' }}>登录</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-content">
                <p className="bottom-text">@大金商用VRV数据可视化后台 2021</p>
            </div>
        </div>)
    }
}

export default withRouter(Login)
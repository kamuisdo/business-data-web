import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import store from 'store'
import storeKeyName from "../../utils/storeKeyName";

export default class AuthRouter extends React.Component{
    render() {
        const { location,config } = this.props;
        const { pathname } = location;
        const isLogin = !!store.get(storeKeyName.token)

        // 未登录 访问无需权限校验的地址
        const targetRouterConfig = config.find((v) => v.path === pathname);
        if(targetRouterConfig && !targetRouterConfig.auth && !isLogin){
            const { component } = targetRouterConfig;
            return <Route exact path={pathname} component={component} />
        }



        return (<></>)
    }
}
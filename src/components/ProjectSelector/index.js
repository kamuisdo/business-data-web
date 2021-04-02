import React from "react";
import {Select,Button} from 'antd'
import AreaSelector from "../AreaSelector";

const { Option } = Select;

/**
 * 地区 -> 省 -> 市 -> 物件类型 -> 物件 -> LC No -> 机型/内机编号
 */
export default class ProjectSelector extends React.Component{
    render() {
        return (
            <>
                <AreaSelector/>

            </>
        )
    }
}
import React from "react";
import { Table, Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons'

/**
 * 为表格提供暴露已选中行的功能
 * 为表格提供默认的配置项
 */
export default class SelectTable extends React.Component{
    constructor(props) {
        super(props);
        this.tableRefs = React.createRef();
        this.state = {
            currentPageSelected:[],
            totalSelected:[]    // 表格中累计被选中的
        }
        this.onSelectedChange = this.onSelectedChange.bind(this)
    }

    // 被render函数传入子组件
    onSelectedChange(selectedArray,ifSelected,currentSelected){
        let total = []
        if(ifSelected){
            // totalSelect中添加
            total = this.state.totalSelected.concat(selectedArray)
        }else {
            // totalSelect中移除
            total = this.state.totalSelected.filter((item)=>{
                return selectedArray.find((selected)=>{ return item.key === selected.key }) === undefined
            })
        }
        this.setState({
            currentPageSelected:currentSelected,
            totalSelected:total
        })
    }

    reset(){
        this.setState({
            currentPageSelected:[]
        })
    }

    render() {
        let {currentPageSelected,totalSelected} = this.state;
        let {render,handleClickAddBtn} = this.props;
        return (
            <>
                <div style={{ display:'flex',justifyContent:'left',paddingBottom:'10px' }}>
                    <Button onClick={(e) => handleClickAddBtn(totalSelected)} disabled={currentPageSelected.length===0} type="primary" icon={<PlusOutlined />}>添加</Button>
                    <p style={{ marginBottom:0,marginLeft:20,lineHeight:'32px',fontSize:'14px',color:'#7A8392' }}>已选中{currentPageSelected.length}个</p>
                </div>
                { render(this.onSelectedChange) }
            </>
        )
    }
}
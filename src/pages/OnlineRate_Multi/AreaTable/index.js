import React from "react";
import {Table} from "antd";
import { getRegionInfoAsync } from '../../../api/common'

export default class AreaTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedRows:[],
            selectedRowKeys:[]
        }
        this.onTableSelectChange = this.onTableSelectChange.bind(this)
        this.onTableSelect = this.onTableSelect.bind(this)
        this.onTableSelectAll = this.onTableSelectAll.bind(this)
    }

    onTableSelectChange(selectedRowKeys, selectedRows){
        // console.log('------ change -----')
        // console.log(selectedRowKeys)
        // console.log(selectedRows)
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    onTableSelect(record, selected, selectedRows, nativeEvent){
        console.log('------ select -----')
        console.log(record)
        console.log(selected)
        console.log(selectedRows)
        this.props.onSelect([record], selected,selectedRows)
    }

    onTableSelectAll(selected, selectedRows, changeRows){
        console.log('------ select all -----')
        console.log(selected)
        console.log(selectedRows)
        console.log(changeRows)
        this.props.onSelect(changeRows, selected,selectedRows)
    }

    render() {
        const { selectedRowKeys } = this.state;
        let columns = [{ title:'地区',dataIndex:'area' }]
        let areaList = getRegionInfoAsync()
        let dataSource = areaList.map((v,index)=>{
            return { key:v.value,area:v.text }
        })
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onTableSelectChange,
            onSelect: this.onTableSelect,
            onSelectAll:this.onTableSelectAll
        };
        return (<Table
            columns={columns}
            dataSource={dataSource}
            rowSelection={rowSelection}
            pagination={false}
            scroll={{ y: '200px' }}
        />)
    }
}
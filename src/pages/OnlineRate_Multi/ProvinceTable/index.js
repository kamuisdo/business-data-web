import React from "react";
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import * as api from '../../../api/common'

export default class ProvinceTable extends React.Component{
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
        let columns = [{ title:'省',dataIndex:'province' }]
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onTableSelectChange,
            onSelect: this.onTableSelect,
            onSelectAll:this.onTableSelectAll
        };
        const requestFn = (params, sorter, filter)=>{
            let t = Object.assign({},this.props.formData,params)
            console.log(t)
            return api.getProvinceInfo(t).then((data)=>{
                return {
                    data: data.map((v)=>{return { key:v.value,province:v.text }}),
                    success: true,
                    total: data.total
                }
            })
        }
        return (<ProTable
            actionRef={this.props.actionRef}
            columns={columns}
            rowSelection={rowSelection}
            request={requestFn}
            pagination={false}
            search={false}
            options={false}
            tableAlertRender={false}
            scroll={{ y: '200px' }}
        />)
    }
}
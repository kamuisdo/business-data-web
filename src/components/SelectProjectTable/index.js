import React from "react";
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import * as api from '../../api/common'
import PropTypes from 'prop-types';

/**
 * 用来被选中的 物件、LcNo、系统 表格展示
 */
export default class SelectProjectTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedRows:[],
            selectedRowKeys:[]
        }
        this.onTableSelectChange = this.onTableSelectChange.bind(this)
        this.onTableSelect = this.onTableSelect.bind(this)
        this.onTableSelectAll = this.onTableSelectAll.bind(this)
        this.map = {
            project:{
                requestFn:api.getProjectList,
                keyField:'buildingId',
                columns:[{ title:'物件名称',dataIndex:'buildingName' }]
            },
            lcNo:{
                requestFn:api.getLcNoList,
                keyField:'terminalId',
                columns:[{ title:'LcNo名称',dataIndex:'lcNo' }]
            },
            system:{
                requestFn:api.getSystemList,
                keyField:'lineId',
                columns:[{ title:'系统名称',dataIndex:'lineName' }]
            }
        }
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
        let {type,query,actionRef} = this.props;
        console.log('select table render');
        console.log(type);
        console.log(query);
        let columns = this.map[type].columns
        let fn = this.map[type].requestFn
        let keyField = this.map[type].keyField
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onTableSelectChange,
            onSelect: this.onTableSelect,
            onSelectAll:this.onTableSelectAll
        };
        const requestFn = (params, sorter, filter)=>{
            let t = Object.assign({},query,params)
            console.log('---- requestFn ------')
            console.log(type);
            return fn(t).then((data)=>{
                data = data.map((v)=>{ return Object.assign(v,{ key:v[keyField] }) })
                return {
                    data: data,
                    success: true,
                    // total: data.total
                }
            })
        }
        // let pagination = {
        //     pageSize:10
        // }
        let time = Date.now()
        return (<ProTable
            actionRef={actionRef}
            columns={columns}
            rowSelection={rowSelection}
            request={requestFn}
            pagination={false}
            search={false}
            options={false}
            tableAlertRender={false}
            scroll={{ y: '300px' }}
        />)
    }
}

SelectProjectTable.propTypes = {
    type:PropTypes.oneOf(['project', 'lcNo', 'system', 'inner']).isRequired,
    query:PropTypes.object,
    actionRef:PropTypes.object.isRequired,
    onSelect:PropTypes.func.isRequired
}
import React from 'react'
import SearchForm from "../../components/SearchForm";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import AreaSelector from "../../components/AreaSelector";
import ProjectTypeSelector from "../../components/ProjectTypeSelector";
import PageLayout from "../Layout";
import {Form, Input} from "antd";
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {getProjectTableList} from '../../api/common'
import NoChart from "../../components/NoChart";
import ErrorChart from "../../components/ErrorChart";
import ProjectDetail from "./ProjectDetail";
import dayjs from "dayjs";
import {ProjectTypeEnum} from '../../enum/projectType'

import './index.less'

export default class ProjectQueryPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this)
        this.refreshTable = this.refreshTable.bind(this)
        this.handleSelectItem = this.handleSelectItem.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.state = {
            ifInit: false,
            ifError: false,
            pageMode: 'list', // list or detail
            selected: null,
        }
        this.formData = null
        this.actionRef = React.createRef()
    }

    handleSearch(value) {
        this.formData = value
        if (this.state.ifInit) {
            this.actionRef.current.reload()
        } else {
            this.setState({ifInit: true})
        }
    }

    refreshTable() {
        this.setState({
            ifError: false
        })
    }

    // 点击Table展示详情
    handleSelectItem(record) {
        this.setState({
            pageMode: 'detail',
            selected: record
        })
    }

    handleBack() {
        this.setState({
            pageMode: 'list'
        })
    }

    render() {
        let {ifInit, ifError, pageMode, selected} = this.state;
        let that = this;
        let columns = [
            {
                title: '物件ID',
                dataIndex: 'snPk',
                render(text, record, index) {
                    return <span onClick={() => {
                        return that.handleSelectItem(record)
                    }} className="table-item">{text}</span>
                }
            },
            {title: '物件名称', dataIndex: 'buildingName'},
            {title: '物件类型',dataIndex: 'buildingSort'},
            {title: '地址',dataIndex: 'address'},
            {title: 'LCNo数', dataIndex: 'comterminalNum'},
            {title: '系统数', dataIndex: 'lineNum'},
            {title: '内机数', dataIndex: 'inunitNum'},
            {title: '合计马力', dataIndex: 'powerNum'},
            {title: '创建时间', dataIndex: 'atStartDt'},
        ];
        const requestFn = (params, sorter, filter) => {
            let formData = that.formData;
            let page = { pageNum:params.current,pageSize:params.pageSize }
            let t = Object.assign({}, formData, page)
            return getProjectTableList(t).then((data) => {
                return {
                    data: data.list.map((v, i) => {
                        let address = []
                        if(v.regionName){ address.push(v.regionName) }
                        if(v.provinceName){ address.push(v.provinceName) }
                        if(v.cityName){ address.push(v.cityName) }
                        address = address.join(',')
                        let atStartDt = v.atStartDt?dayjs(v.atStartDt).format('YYYY/MM/DD'):'-';
                        let buildingSortTemp = ProjectTypeEnum.get(v.buildingSort);
                        let buildingSort = buildingSortTemp ? buildingSortTemp.value : '未知类型'
                        return Object.assign(v, {key: i,address,atStartDt,buildingSort })
                    }),
                    success: true,
                    total: data.pageInfo.total
                }
            }).catch((err) => {
                this.setState({ifError: true})
            })
        }
        let listPageStyle = pageMode === 'list' ? {display: 'block'} : {display: 'none'};
        let pageTitle = pageMode === 'list' ? '请选择查询条件' : null;
        return (
            <PageLayout title={pageTitle} className="project-query-page">
                <div style={listPageStyle}>
                    <div style={{display: 'block'}}>
                        <SearchForm buttonText="查询" onFinish={this.handleSearch}>
                            <div className="searchForm-row">
                                <TimeRangeSelector required/>
                            </div>
                            <div className="searchForm-row">
                                <AreaSelector
                                    areaRules={[{required: true}]}
                                    provinceRules={[{required: true}]}
                                />
                            </div>
                            <div className="searchForm-row">
                                <Form.Item
                                    label="物件类型"
                                    name="buildingType"
                                >
                                    <ProjectTypeSelector/>
                                </Form.Item>

                                <Form.Item
                                    label="物件"
                                    name="projectName"
                                >
                                    <Input style={{width: '12vw'}} placeholder="请输入物件名称"/>
                                </Form.Item>
                            </div>

                        </SearchForm>
                    </div>
                    <div className="chart-box">
                        { !ifInit ? <NoChart/> : (ifError ? <ErrorChart handleClick={this.refreshTable}/> :
                            <ProTable
                                className="project-list-table"
                                actionRef={this.actionRef}
                                bordered={false}
                                columns={columns}
                                request={requestFn}
                                pagination={{pageSize: 10}}
                                search={false}
                                options={false}
                                tableAlertRender={false}
                            />)}

                    </div>
                </div>
                {
                    pageMode === 'detail' && <ProjectDetail handleBack={this.handleBack} {...selected}/>
                }
            </PageLayout>
        )
    }
}
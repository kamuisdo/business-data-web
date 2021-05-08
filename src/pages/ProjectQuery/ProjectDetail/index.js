import React from 'react'
import {Button,Table} from 'antd'
import {LeftOutlined} from '@ant-design/icons'
import PropTypes from 'prop-types';
import {getBuildingDetailById} from '../../../api/common'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'
import ErrorChart from "../../../components/ErrorChart";
import './index.less'

export default class ProjectDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            ifError:false,
            detailData:[]
        }
        this.loadDetailData = this.loadDetailData.bind(this)
    }

    componentDidMount() {
        this.loadDetailData()
    }

    loadDetailData(){
        let {snPk} = this.props;
        this.setState({ loading:true,ifError:false })
        getBuildingDetailById({ buildingId:snPk }).then((data)=>{
            data = sortBy(data,['lcNo','lineId','modeltypeId'])
            data = data.map((v,i)=>{
                let lineTempName = `${v.lcNo}_${v.lineId}`    // 计算line的总数用
                return Object.assign({key:i,lineTempName},v)
            })
            let lcCount = this.getSortedDataCount(data,'lcNo')
            let lineCount = this.getSortedDataCount(data,'lineTempName')
            data = data.map((v,i)=>{
                let lcSpan = lcCount[v.lcNo].indexOf(i) === 0 ? lcCount[v.lcNo].length : 0;
                let lineSpan = lineCount[v.lineTempName].indexOf(i) === 0 ? lineCount[v.lineTempName].length : 0;
                return Object.assign({lcSpan,lineSpan},v)
            })
            this.setState({ loading:false,ifError:false,detailData:data })
        }).catch((err)=>{
            this.setState({ loading:false,ifError:true })
        })
    }

    getSortedDataCount(data,key){
        let t = {};
        data.forEach((v,i)=>{
            if(!t[v[key]]){
                t[v[key]] = []
            }
            t[v[key]].push(i)
        })
        return t
    }


    render() {
        let {snPk,buildingName,buildingSort,address,powerNum,atStartDt,handleBack} = this.props;
        let { loading,ifError,detailData } = this.state;
        let lcNoTotal = uniqBy(detailData,'lcNo').length;
        let lineTotal = uniqBy(detailData,'lineTempName').length;
        let render = (key)=>{
            return (text, row, index)=>{
                return { children:text,
                    props:{ rowSpan:row[key] }
                }
            }
        }
        let columns = [
            { title:`LcNo(共${lcNoTotal}个)`,dataIndex: 'lcNo',render:render('lcSpan') },
            { title:`系统(共${lineTotal}个)`,dataIndex: 'lineName',render:render('lineSpan')},
            { title:`内机(共${detailData.length}个)`,dataIndex: 'modeltypeId' }
            ]
        return (
            <div className="project-detail-page">
                <div style={{ marginLeft:'-16px',marginBottom:'20px' }}>
                    <Button type="link" onClick={handleBack} icon={<LeftOutlined />}>返回</Button>
                </div>
                <div className="chart-box">
                    <p className="project-name">{snPk}</p>
                    <div className="project-info-box">
                        <div className="project-info-item">
                            <span className="project-info-label">物件名称：</span>
                            <span className="project-info-text">{buildingName}</span>
                        </div>
                        <div className="project-info-item">
                            <span className="project-info-label">物件类型：</span>
                            <span className="project-info-text">{buildingSort}</span>
                        </div>
                        <div className="project-info-item">
                            <span className="project-info-label">地址：</span>
                            <span className="project-info-text">{address || '-'}</span>
                        </div>
                        <div className="project-info-item">
                            <span className="project-info-label">合计马力：</span>
                            <span className="project-info-text">{powerNum || '-'}</span>
                        </div>
                        <div className="project-info-item">
                            <span className="project-info-label">创建时间：</span>
                            <span className="project-info-text">{atStartDt|| '-'}</span>
                        </div>
                    </div>
                    { ifError ? <ErrorChart handleClick={this.loadDetailData}/> :
                        <Table columns={columns} loading={loading} dataSource={detailData} pagination={false} bordered/>
                    }
                </div>
            </div>
        )
    }
}

ProjectDetail.propTypes = {
    snPk:PropTypes.any.isRequired, //物件id
    buildingName:PropTypes.string, //物件名称
    buildingSort:PropTypes.string,//物件类型
    // regionName:PropTypes.string,
    // provinceName:PropTypes.string,
    // cityName:PropTypes.string,
    address:PropTypes.string,
    powerNum:PropTypes.any,  // 合计马力
    atStartDt:PropTypes.any  //创建时间
}

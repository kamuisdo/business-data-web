import React from "react";
import {CloseOutlined} from '@ant-design/icons'
import uniqBy from 'lodash/uniqBy'
import './index.less'

export default class SelectTableItem extends React.Component{

    constructor(props) {
        super(props);
        this.onRemoveItem = this.onRemoveItem.bind(this)
    }

    onRemoveItem(key){
        this.props.onRemoveItem(key)
    }

    formatSelected(){
        let {selected=[],nameField="key"} = this.props
        if(selected.length>1){
            return uniqBy(selected,nameField)
        }
        return selected
    }

    render() {
        let {nameField="key"} = this.props
        let selected = this.formatSelected();
        return (
            <div className="select-table-item-box">
                {
                    selected.map((v)=>{
                        return (
                            <div key={v.key} className="select-table-item-item">
                                <span>{v[nameField]}</span>
                                <span className="select-table-item-remove" onClick={this.onRemoveItem.bind(this,v.key)}><CloseOutlined style={{ color:"#999",fontSize:'12px' }}/></span>
                            </div>
                        )
                    })
                }
                {selected.length>0 && <div className="select-table-item-item" style={{ color:'#7A8392' }}>共{selected.length}个</div>}
            </div>
        )
    }
}
import React from 'react';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/**
 * 配置echarts通用的配置
 * 实现window.resize时的重新渲染
 * @param WrappedComponent
 * @returns {WithEcharts}
 */
export default function withEcharts(WrappedComponent){
    class WithEcharts extends React.Component{

        constructor(props) {
            super(props);
            this.instanceRef = React.createRef()
            this.chartResize = this.chartResize.bind(this);
        }

        componentDidMount() {
            // console.log('withEcharts componentDidMount');
            window.addEventListener('resize', this.chartResize);
        }

        componentWillUnmount() {
            // console.log('withEcharts componentWillUnmount')
            window.removeEventListener('resize', this.chartResize)
        }

        chartResize(){
            let instance = this.instanceRef.current.instance;
            if(!instance){
                throw new Error(`withEcharts Error: 被包装的组件必须要有instance实例属性指向echarts实例`)
            }
            instance.resize()
        }

        render() {
            // console.log(`withEcharts render`)
            return <WrappedComponent {...this.props} ref={this.instanceRef}/>
        }
    }

    WithEcharts.displayName = `withEcharts(${getDisplayName(WrappedComponent)})`;

    return WithEcharts;
}
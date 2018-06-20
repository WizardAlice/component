import React, { Component } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'

class ChartMoadl extends Component{
  constructor(props, context){
    super(props, context)
  }
  render(){
    return <Modal visible={this.props.visible} footer={null} onCancel={this.props.close} closable={false} width='95%'>
      <ReactEcharts theme='my_theme' notMerge={true}  option={this.props.option} className='react_for_echarts' style={{height: document.documentElement.clientHeight-200, width: document.documentElement.clientWidth-300}}/>
    </Modal>
  }
}

ChartMoadl.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  option: PropTypes.object
}

export default ChartMoadl


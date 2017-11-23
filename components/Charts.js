import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'
import { chartOption } from '../controller/method'

echarts.registerTheme('my_theme', {
  legend: {
    padding: 50
  },
  dataRange: {
    padding: 200
  }
})


export default class Allbook extends Component{
  constructor(props, context){
    super(props, context)
    this.state = {
      option: chartOption({
        ratio: this.props.ratio,
        legendDate: this.props.data[0].legend,
        x: this.props.data[1],
        y: this.props.data[2].yAxis,
        seriesData: this.props.data[2].data
      })
    }
  }
  componentWillReceiveProps(newxProps) {
    // let echarts_instance = this.echarts_react.getEchartsInstance()
    this.setState({
      option: chartOption({
        ratio: newxProps.ratio,
        legendDate: newxProps.data[0].legend,
        x: newxProps.data[1],
        y: newxProps.data[2].yAxis,
        seriesData: newxProps.data[2].data
      })
    })
    // echarts_instance.clear()
  }
  shouldComponentUpdate(nextProps, nextState){
    return this.props.data!==nextProps.data
  }
  render(){
    return <ReactEcharts theme='my_theme' notMerge={true}  option={this.state.option} style={{height: '800px', width: '100%'}} className='react_for_echarts' />
  }
}








import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'

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
      option: {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.props.data[0].legend.map((v)=> v.toString()),
          bottom: "80%",
          width: "80%"
        },
        toolbox: {
          feature: {
              saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            boundaryGap : this.props.data[1].boundaryGap,
            data : this.props.data[1].data
          }
        ],
        yAxis : [
          {
            type : this.props.data[2].yAxis
          }
        ],
        series : this.props.data[2].data.map((v) => Object.assign({}, v))
      }
    }
  }
  componentWillReceiveProps(newxProps) {
    // let echarts_instance = this.echarts_react.getEchartsInstance()
    if(newxProps.ratio){
      this.setState({
        option: {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: (params) => {
              let str = params[0].name.toString()
              params.map((v) => {
                str += "<br>"
                str += '<span style="display:inline-block;margin-left:5px;margin-right:5px;';
                str += 'border-radius:10px;width:9px;height:9px;';
                str += 'background-color:'+ v.color +'"></span>';
                str += v.seriesName.toString()
                str += " : "
                str += (v.value*100).toFixed(2)
                str += "%"
              })
              return str
            }
          },
          legend: {
            data: newxProps.data[0].legend.map((v)=> v.toString()),
            bottom: "80%",
            width: "80%"
          },
          toolbox: {
            feature: {
                saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : newxProps.data[1].boundaryGap,
              data : newxProps.data[1].data
            }
          ],
          yAxis : [
            {
              type : newxProps.data[2].yAxis,
              axisLabel: {
                formatter: (value, index) => {
                  return (value * 100).toFixed(2)  + '%'
                }
              }          
            }
          ],
          series : newxProps.data[2].data.map((v) => Object.assign({}, v))
        }
      })
    }
    else{
      this.setState({
        option: {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: newxProps.data[0].legend.map((v)=> v.toString()),
            bottom: "80%",
            width: "80%"
          },
          toolbox: {
            feature: {
                saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : newxProps.data[1].boundaryGap,
              data : newxProps.data[1].data
            }
          ],
          yAxis : [
            {
              type : newxProps.data[2].yAxis
            }
          ],
          series : newxProps.data[2].data.map((v) => Object.assign({}, v))
        }
      })
    }
    // echarts_instance.clear()
  }
  shouldComponentUpdate(nextProps, nextState){
    return this.props.data!==nextProps.data
  }
  render(){
    return <ReactEcharts theme='my_theme' notMerge={true}  option={this.state.option} style={{height: '800px', width: '100%'}} className='react_for_echarts' />
  }
}








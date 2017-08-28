import React, { Component } from 'react';
import moment from 'moment'
// import { connect } from 'dva';
import { DatePicker, Button, Switch, Spin } from 'antd'
import "antd/lib/button/style"
import "antd/lib/date-picker/style"
import "antd/lib/select/style"
import "antd/lib/switch/style"
import "antd/lib/spin/style"
import { getForm, getChart } from "./controller/fetchApi"
import Selects  from './components/Select'
import Charts from './components/Charts'
import Table from './components/Table'
import $ from 'jquery'

const dateFormat = 'YYYY/MM/DD'
const RangePicker = DatePicker.RangePicker

export default class Product extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      forms: [],
      body: [],
      columns: [],
      charts: [],
      from_date: "",
      end_date: "",
      tag: {},
      ratio_chart: [],
      ratio: false,
      loading: false
    }
  }

  getDate = (dates, dateStrings) => {
    this.setState({
      from_date: dateStrings[0],
      end_date: dateStrings[1]
    })
    return 
  }
  getTag = (v, name) => {
    let tag = this.state.tag
    for (let i in tag){
      if(v[v.length-1]=="明细"){
        if(i==name){
          tag[name] = v[v.length-1]
        }
        else if(tag[i]=="明细"){
          tag[i] = "全部"
        }
      }
      else if(v.length == 0){
        tag[name] = "全部"
      }
      else{
        tag[name] = v[v.length-1]
      }
    }
    this.setState({
      tag: tag
    })
    return 
  }
  getChart = () => {
    let result = {
      from_date: this.state.from_date,
      end_date: this.state.end_date,
      tag: this.state.tag
    }
    this.setState({
      loading: true
    })
    getChart(result).then((res)=>{
      let a = []
      if(res.body){
        res.columns.map((v) => {
          if(v.extra){
            a.push({
              title: v.title?v.title.toUpperCase():null,
              key: v.key,
              extra: v.extra.percents?"percents":(v.extra.thousands?"thousands":null)
            })
          }
          else{
            a.push({
              title: v.title?v.title.toUpperCase():null,
              extra: "",
              key: v.key
            })
          }
        })
      }
      this.setState({
        loading: false,
        charts: res.chart,
        ratio_chart: res.ratio_chart,
        columns: a,
        body: res.body
      })
    }).catch((error) => {
      console.log('Request failed', error);
      this.setState({
        loading: false
      })
    })
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    getForm().then((res) => {
      let a = {}
      if(res.forms){
        res.forms.map((v)=>{
          if(v.attributes.input_type=="select"){
            a[v.name] = v.attributes.default
          }
        })
      }
      this.setState({
        forms: res.forms?res.forms:[],
        from_date: res.forms?res.forms[0].attributes.from_date:"",
        end_date: res.forms?res.forms[0].attributes.end_date:"",
        tag: a,
        loading: false
      })
    })
  }
  onChange = (v) => {
    this.setState({
      ratio: v
    })
  }
  render() {
    return (
      <Spin tip="数据读取中..." spinning={this.state.loading} size="large">
        <div className="content">
          {
            this.state.forms.length==0?null:(
              <div className="formContent">
                <div className="form">
                  {
                    this.state.forms.map((v, index) => {
                      if(v.attributes.input_type == "datetime"){
                        return  <div className="rangePicker"  key={index}>
                                  <span className="formsLabel">{v.name}:</span>
                                  <RangePicker style={{'width': "70%"}} defaultValue={[moment(v.attributes.from_date, dateFormat), moment(v.attributes.end_date, dateFormat)]} ranges={{ "今天": [moment(), moment()], '这个月': [moment(), moment().endOf('month')] }} onChange={this.getDate}/>
                                </div>
                      }
                      else if(v.attributes.input_type == "select"){
                        return <Selects attributes={v.attributes} tagValue={this.state.tag[v.name]} tagchange={this.getTag} name={v.name} key={index}/>
                      }
                    })
                  }
                </div>
                <div className="searchButton">
                  <Button type="primary" icon="search" loading={this.state.loading} onClick={this.getChart}>
                    搜索
                  </Button>
                </div>
              </div>
            )
          }
          {
            this.state.charts.length==0?null:(
              <div className="EchartsReact">
                <div className="radioSwitch"><span>占比：</span><Switch defaultChecked={false} onChange={this.onChange} /></div>
                <Charts data={this.state.ratio?this.state.ratio_chart:this.state.charts} ratio={this.state.ratio} />
              </div>
            )
          }
          {
            this.state.body.length==0?null:(
              <div className="TableReact" >
                <Table columns={this.state.columns} data={this.state.body} style={{width: "90%", margin: "0 auto"}} pagination={false} scroll={{ y: 440 }}/>
              </div>
            )
          }
        </div>
      </Spin>
    )
  }
}












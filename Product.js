import React, { Component } from 'react';
import moment from 'moment'
// import { connect } from 'dva';
import { DatePicker, Button, Switch , Checkbox , Affix , Tabs } from 'antd'
import "antd/lib/button/style"
import "antd/lib/date-picker/style"
import "antd/lib/select/style"
import "antd/lib/switch/style"
import "antd/lib/spin/style"
import "antd/lib/modal/style"
import "antd/lib/affix/style"
import { getForm, getChart } from "./controller/fetchApi"
import { removeByValue , cloneObj } from "./controller/method"
import Selects  from './components/Select'
import Charts from './components/Charts'
import Table from './components/Table'
import $ from 'jquery'

import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const dateFormat = 'YYYY/MM/DD'
const monthFormat = 'YYYY/MM'
const { MonthPicker } = DatePicker
const RangePicker = DatePicker.RangePicker
const CheckboxGroup = Checkbox.Group
const TabPane = Tabs.TabPane

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
      action: "",
      table: null,
      report_date: "",
      loading: false,
      check_box: [],
      foot: [],
      hide_columns: null,
      nav: null,
      sqlError: false
    }
  }

  getDate = (dates, dateStrings) => {
    this.setState({
      from_date: dateStrings[0],
      end_date: dateStrings[1]
    })
    return 
  }
  getMonth = (dates,dataString) =>{
    this.setState({
      report_date: dataString
    })
    return 
  }
  getTag = (v, name, defaultValue, fn=()=>{} ) => {
    let tag = this.state.tag
    for (let i in tag){
      if(v[v.length-1]=="明细"){
        if(i==name){
          tag[name] = v[v.length-1]
        }
        // else if(tag[i]=="明细"){
        //   tag[i] = "全部"
        // }
      }
      else if(v.length == 0){
        tag[name] = defaultValue
      }
      else{
        tag[name] = v[v.length-1]
      }
    }

    if(name == "hist_solution_code"){   //纯为了方案时间转化率报表能操作某一个不能选择的checkbos
      if(v[v.length-1] != "全部汇总"){
        let check_box = cloneObj(this.state.check_box)
        check_box = removeByValue(check_box, "legacy_active_ct")
        this.setState({
          check_box: check_box
        })
      }
      else{
        let check_box = cloneObj(this.state.check_box)
        check_box.push("legacy_active_ct")
        this.setState({
          check_box: check_box
        })
      }
    }

    this.setState({
      tag: tag
    })
    fn()
    return 
  }

  hidedefaultChecks = () => {

  }

  getChart = () => {
    let result = {
      from_date: this.state.from_date,
      end_date: this.state.end_date,
      report_date: this.state.report_date,
      tag: this.state.tag,
      action: this.state.action,
      check_box: this.state.check_box
    }
    this.setState({
      loading: true
    })
    getChart(result).then((res)=>{
      let a = []
      if(res.body){
        if(Array.isArray(res.columns[2])){
          a = res.columns
        }
        else{
          res.columns.map((v) => {
            if(v.extra){
              a.push({
                title: v.title?v.title.toUpperCase():null,
                key: v.key,
                extra: {
                  percents: v.extra.percents?true:false,
                  thousands: v.extra.thousands?true:false,
                  cell_color: v.extra.cell_color?true:false,
                  limit: v.extra.limit?true:false,
                  recursion: v.extra.recursion?true:false,
                  changeable: v.extra.changeable?true:false,
                  recursion_lost: v.extra.recursion_lost?true:false
                }
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
      }
      this.setState({
        sqlError: false,
        table: res.table?res.table:null,
        charts: res.chart?res.chart:[],
        ratio_chart: res.ratio_chart?res.ratio_chart:[],
        columns: a,
        body: res.body?res.body:[],
        loading: false,
        recursion: res.recursion?res.recursion:null,
        foot: res.foot?res.foot:[],
        hide_columns: res.hide_columns?res.hide_columns:null,
        ratio: res.ratio?res.ratio:false
      })
    }).catch((error) => {
      console.log('Request failed', error)
      this.setState({
        loading: false,
        sqlError: true
      })
    })
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   return this.props.data!==nextProps.data
  // }


  componentDidMount() {
    this.setState({
      loading: true
    })
    Event.on('change_menu',(result) => {
      getForm(result.split("|")[0]).then((res) => {
        let a = {}
        let check_box = []
        if(res.forms){
          res.forms.map((v)=>{
            if(v.attributes.input_type=="select"){
              a[v.name] = v.attributes.default
            }
            if(v.attributes.input_type=="checkbox"){
              check_box = v.attributes.default
            }
          })
        }
        this.setState({
          forms: res.forms?res.forms:[],
          from_date: res.forms?res.forms[0].attributes.from_date:"",
          end_date: res.forms?res.forms[0].attributes.end_date:"",
          report_date: res.forms?(res.forms[0].attributes.defaultValue?res.forms[0].attributes.defaultValue.slice(0,7):null):null,
          tag: a,
          action: res.action,
          target: result,
          columns: [],  //用以切换界面的时候，下面的表格和图标数据清空
          charts: [],
          loading: false,
          check_box: check_box,
          nav: res.nav?res.nav:null
        })
      })
    }); 

    getForm("/seed/activity_situation_reports/form_part").then((res) => {
      let a = {}
      let check_box = []
      if(res.forms){
        res.forms.map((v)=>{
          if(v.attributes.input_type=="select"){
            a[v.name] = v.attributes.default
          }
          if(v.attributes.input_type=="checkbox"){
            check_box = v.attributes.default
          }
        })
      }
      this.setState({
        forms: res.forms?res.forms:[],
        from_date: res.forms?res.forms[0].attributes.from_date:"",
        end_date: res.forms?res.forms[0].attributes.end_date:"",
        report_date: res.forms?(res.forms[0].attributes.defaultValue?res.forms[0].attributes.defaultValue.slice(0,7):null):null,
        tag: a,
        action: res.action,
        loading: false,
        check_box: check_box,
        nav: res.nav?res.nav:null
      })
    })
  }


  onChange = (v) => {
    this.setState({
      ratio: v
    })
  }

  getCheckBox = (v) => {
    this.setState({
      check_box: v
    })
  }
  changeNav =(key) => {
    this.setState({
      action: key
    },()=> this.getChart())
  }

  render() {
    return (
        <div className="content">
          {this.state.sqlError?(
            <h5>数据库查询异常，请联系管理员</h5>
          ):null}
          {
            this.state.forms.length==0?null:(
              <Affix offsetTop={51}>
                <div className="formContent">
                  <div className="form">
                    {
                      this.state.forms.map((v, index) => {
                        if(v.attributes.input_type == "datetime"){
                          return  <div className="rangePicker"  key={index+this.state.target+"rangePicker"}>
                                    <span className="formsLabel">{v.attributes.label_text}:</span>
                                    <RangePicker style={{'width': "70%"}} value={[moment(this.state.from_date, dateFormat), moment(this.state.end_date, dateFormat)]} defaultValue={[moment(v.attributes.from_date, dateFormat), moment(v.attributes.end_date, dateFormat)]} ranges={{ "今日": [moment(), moment()], "昨日": [moment().subtract(1, 'days'), moment().subtract(1, 'days')], "近7日": [moment().subtract(6, 'days'),moment()], "近30日": [moment().subtract(29, 'days'),moment()]}} onChange={this.getDate}/>
                                  </div>
                        }
                        else if(v.attributes.input_type == "checkbox"){
                          return  <div className="checkbox"  key={index+this.state.target+"checkbox"}>
                                    <CheckboxGroup options={v.attributes.data} defaultValue={v.attributes.default} value={this.state.check_box} onChange={this.getCheckBox}/>
                                  </div>
                        }
                        else if(v.attributes.input_type == "datetime_month"){
                          return  <div className="rangePicker"  key={index+this.state.target+"_rangePicker"}>
                                    <span className="formsLabel">{v.attributes.label_text}:</span>
                                    <MonthPicker style={{'width': "70%"}} defaultValue={moment(v.attributes.defaultValue, monthFormat)} onChange={this.getMonth}/>
                                  </div>
                        }
                        else if(v.attributes.input_type == "select"){
                          return <Selects attributes={v.attributes} tagValue={this.state.tag[v.name]} tagchange={this.getTag} name={v.name} labelName={v.attributes.label_text} key={Math.random().toString(36).substr(2)}/>
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
              </Affix>
            )
          }
          {
            Object.is(this.state.nav, null) ? null:(
            <Tabs onChange={(k) => this.changeNav(k)}>
              {
                Object.keys(this.state.nav).map((v, index) => {
                  return <TabPane tab={v} key={this.state.nav[v]} />
                })
              }
            </Tabs>
          )}
          {
            this.state.charts.length==0?null:(
              <div className="EchartsReact">
                <div className="radioSwitch"><span>占比：</span><Switch defaultChecked={this.state.ratio} checked={this.state.ratio} onChange={this.onChange} /></div>
                <Charts data={this.state.ratio?this.state.ratio_chart:this.state.charts} ratio={this.state.ratio} />
              </div>
            )
          }
          {
            this.state.columns.length==0?null:(
              <div className="TableReact" >
                <Table hide_columns={this.state.hide_columns} columns={this.state.columns} flag={false} table={this.state.table} recursion={this.state.recursion} data={this.state.body} foot={this.state.foot} style={{width: "90%", margin: "0 auto"}} pagination={false} scroll={{ y: 440 }}/>
              </div>
            )
          }
        </div>
    )
  }
}












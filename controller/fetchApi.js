import { getUrl, objectToString, oneDate } from './getUrl' 
require('babel-polyfill')//此处全部引入，可以拆分
import 'whatwg-fetch' //此处全部引入，可以拆分

let url_head = "https://mantis.appleflying.com:7555/"
// let url_head = ""

export function getForm(url_string=null){
  let str = url_string ? (url_string+"/form_part.json") : (getUrl(window.location.href) ? getUrl(window.location.href) : "/ework/arrival_operate_reports/form_part.json")
  return fetch(url_head+str,{
    credentials : "include",
    mode: "cors",
    // headers: {
    //   "Content-Type": "application/json"
    // },
    method: "GET"
    }).then((res)=> {
      return res.json()
    }).then((data)=>{
      return {
        forms: data.form.form_items,
        action: data.form.action,
        nav: data.nav,
        body: data.body,
        columns: data.columns,
        exact: data.exact
      }
    })
}

//我这默认黑箱的情况下可怎么改名啊！！！
export function getChart({from_date = "", end_date = "", tag, action, report_date = "", check_box = [], time_situation = false, text = null}){
  let select = encodeURI(objectToString(tag)) 
  report_date = oneDate(report_date)
  check_box = (check_box.length == 0 ? "" : ("&report[check_box]="+check_box))
  let time_situation_str = time_situation ? "&report[time_situation]=true" : ""
  let text_str = text ?  `&report[text]=${text}` : ""
  let str = url_head+action+".json?"+"report[from_date]="+from_date+"&report[end_date]="+end_date+text_str+report_date+select+check_box+time_situation_str
  return fetch(str,{
  // return fetch("http://localhost:8888/suibian",{
    credentials : "include",
    mode: "cors",
    method: "GET",
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  }).then((res) => {
    return res.json()
  }).then((data) => {
    return {
      chart: data.chart,
      ratio_chart: data.ratio_chart,
      body: data.body,
      columns: data.columns,
      table: data.table,
      recursion: data.recursion,
      foot: data.foot,
      hide_columns: data.hide_columns,
      nav: data.nav,
      ratio: data.ratio,
      order_by: data.order_by,
      multiple_chart: data.multiple_chart,
      extra_downloads: data.extra_downloads
    }
  })
}

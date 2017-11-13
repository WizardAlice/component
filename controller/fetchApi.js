import { getUrl, objectToString, oneDate } from './getUrl' 
require('babel-polyfill')
import 'whatwg-fetch'

export function gettable(){
  return fetch("http://localhost:8000/chart",{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    // body: JSON.stringify(finalResult)
  }).then((res) => {
    return res.json()
  }).then((data) => {
    console.log(data)
    return {
      forms: data.form.form_items,
      body: data.body,
      columns: data.columns,
      charts: data.charts
    }
  })
}

// let url_head = "https://themis.didiman.com/"
let url_head = ""

export function getForm(str){
  // let str = getUrl(window.location.href)
  return fetch(url_head+str+".json",{
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
        nav: data.nav
      }
    })
}

//我这默认黑箱的情况下可怎么改名啊！！！
export function getChart({from_date = "", end_date = "", tag, action, report_date = "", check_box = []}){
  let select = objectToString(tag)
  report_date = oneDate(report_date)
  check_box = (check_box.length == 0 ? "" : ("&report[check_box]="+check_box))
  let str = url_head+action+".json?"+"report[from_date]="+from_date+"&report[end_date]="+end_date+report_date+select+check_box
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
      nav: data.nav
    }
  })
}

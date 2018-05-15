const list = {
  "seed": {
    "prop_attribute_reports": ["/seed/prop_attribute_reports/form_part.json", "终端属性"],
    "activity_situation_reports": ["/seed/activity_situation_reports/form_part.json", "用户概况"],
    "business_activation_reports": ["/seed/business_activation_reports/form_part.json", "业务线新增"],
    "activity_reports": ["/seed/activity_reports/form_part.json", "活跃用户"],
    "activation_new_reports": ["/seed/activation_new_reports/form_part.json", "新增用户"],
    "alive_reports": ["/seed/alive_reports/form_part.json", "留存用户"],
    "solution_reports": ["/seed/solution_reports/form_part.json", ""],
    "prop_reports": ["/seed/prop_reports/form_part.json", "终端厂商"],
    "prop_detail_reports": ["/seed/prop_detail_reports/form_part.json", "终端机型"],
    "prop_detail_monthly_reports": ["/seed/prop_detail_monthly_reports/form_part.json", "终端属性月汇总"],
    "conversion_reports": ["/seed/conversion_reports/form_part.json", "活跃跨业务线"],
    "invalid_activity_reports": ["/seed/invalid_activity_reports/form_part.json", "无效活跃"],
    "solution_ratio_reports": ["/seed/solution_ratio_reports/form_part.json", "方案成功占比"],
    "solutions_ratio_reports": ["/seed/solutions_ratio_reports/form_part.json", "方案事件占比"],
    "overline_service_reports": ["/seed/overline_service_reports/form_part.json", "种子跨业务线"],
    "solution_conversion_reports": ["/seed/solution_conversion_reports/form_part.json", "方案事件转化率"]
  },
  "dm": {
    "activity_reports": ["/dm/activity_reports/form_part.json", "DM活跃"],
    "alive_reports": ["/dm/alive_reports/form_part.json", "DM留存"]
  },
  "charge": {
    "activity_trend_reports": ["/charge/activity_trend_reports/form_part.json", "计费趋势"],
    "activation_reports": ["/charge/activation_reports/form_part.json", "计费新增"],
    "situation_reports": ["/charge/situation_reports/form_part.json", "计费概况"],
    "activity_reports": ["/charge/activity_reports/form_part.json", "计费活跃"],
    "activity_month_reports": ["/charge/activity_month_reports/form_part.json", "计费月报"],
    "alive_reports": ["/charge/alive_reports/form_part.json", "计费留存"]
  },
  "ework": {
    "conversion_reports": ["/ework/conversion_reports/form_part.json", "事件转化率"],
    "overline_service_reports": ["/seed/overline_service_reports/form_part.json", "种子跨业务线"],
    "conversion_reports": ["/seed/conversion_reports/form_part.json", "事件转化率"],
    "business_monthly_reports": ["/ework/business_monthly_reports/form_part.json", "每月商务完成情况统计"],
    "overline_service_mobile_reports": ["/ework/overline_service_mobile_reports/form_part.json", "移动版全业务线到达"],
    "arrival_operate_reports": ["/ework/arrival_operate_reports/form_part.json", "全业务线到达"]
  }
}

export function getUrl(str){
  // let url = str.split("?").shift().split("/")
  let fullurl = str.split("?")
  let url = fullurl.shift().split("/")
  let time_situation = fullurl.pop().split('&').pop()
  time_situation = time_situation ? `?${time_situation}` : ""
  let b = url.pop()   //得到后面的地址
  let a = url.pop()    //得到seed,charge之类的地址
  for(let i in list){
    if(i == a){
      for(let j in list[i]){
        if(j == b){
          $('.box-title').html(list[i][j][1])
          return list[i][j][0]+time_situation
        }
      }
    }
  }
}

export function objectToString(obj){
  let keys = Object.keys(obj)
  let str = ""
  keys.map((k) => {
    str += "&report["+k+"]"
    str += "="
    str += obj[k]
  })
  return str
}

export function oneDate(date){
  return date?("&report[report_date]="+date):""
}

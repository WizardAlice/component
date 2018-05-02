const list = {
  "seed": {
    "prop_attribute_reports": "/seed/prop_attribute_reports/form_part.json",
    "activity_situation_new_reports": "/seed/activity_situation_reports/form_part.json",
    "business_activation_new_reports": "/seed/business_activation_reports/form_part.json",
    "activity_new_reports": "/seed/activity_reports/form_part.json",
    "activation_new_impala_reports": "/seed/activation_new_reports/form_part.json",
    "alive_new_reports": "/seed/alive_reports/form_part.json",
    "solution_new_reports": "/seed/solution_reports/form_part.json",
    "prop_new_reports": "/seed/prop_reports/form_part.json",
    "prop_detail_new_reports": "/seed/prop_detail_reports/form_part.json",
    "prop_detail_monthly_new_reports": "/seed/prop_detail_monthly_reports/form_part.json",
    "conversion_new_reports": "/seed/conversion_reports/form_part.json",
    "invalid_activity_new_reports": "/seed/invalid_activity_reports/form_part.json",
    "solution_ratio_new_reports": "/seed/solution_ratio_reports/form_part.json",
    "solutions_ratio_new_reports": "/seed/solutions_ratio_reports/form_part.json",
    "overline_service_new_reports": "/seed/overline_service_reports/form_part.json",
    "solution_conversion_reports": "/seed/solution_conversion_reports/form_part.json",
    "solution_new_reports": "/seed/solution_conversion_reports/form_part.json",
    "lost_new_reports": "/seed/solution_conversion_reports/form_part.json",
    "pg_lost_new_reports": "/seed/solution_conversion_reports/form_part.json",
    "overline_service_new_reports": "/seed/overline_service_reports/form_part.json"
  },
  "dm": {
    "activity_new_reports": "/dm/activity_reports/form_part.json",
    "alive_new_reports": "/dm/alive_reports/form_part.json"
  },
  "charge": {
    "activity_trend_new_reports": "/charge/activity_trend_reports/form_part.json",
    "activation_new_reports": "/charge/activation_reports/form_part.json",
    "situation_new_reports": "/charge/situation_reports/form_part.json",
    "activity_new_reports": "/charge/activity_reports/form_part.json",
    "activity_month_new_reports": "/charge/activity_month_reports/form_part.json",
    "alive_new_reports": "/charge/alive_reports/form_part.json"
  },
  "ework": {
    "conversion_new_reports": "/ework/conversion_reports/form_part.json",
    "overline_service_new_reports": "/seed/overline_service_reports/form_part.json",
    "seed_conversion_reports": "/seed/conversion_reports/form_part.json",
    "business_monthly_new_reports": "/ework/business_monthly_reports/form_part.json",
    "overline_service_mobile_reports": "/ework/overline_service_mobile_reports/form_part.json",
    "arrival_operate_reports": "/ework/arrival_operate_reports/form_part.json"
  }
}

export function getUrl(str){
  // let url = str.split("?").shift().split("/")
  let fullurl = str.split("/index")
  let url = fullurl.shift().split("/")
  let time_situation = fullurl.pop()
  let b = url.pop()   //得到后面的地址
  let a = url.pop()    //得到seed,charge之类的地址
  for(let i in list){
    if(i == a){
      for(let j in list[i]){
        if(j == b){
          return list[i][j]+time_situation
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

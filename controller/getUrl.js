const list = {
  "seed": {
    "prop_attribute_reports": "/seed/prop_attribute_reports/form_part",
    "activity_situation_reports": "/seed/activity_situation_reports/form_part",
    "business_activation_reports": "/seed/business_activation_reports/form_part",
    "activity_reports": "/seed/activity_reports/form_part",
    "activation_new_reports": "/seed/activation_new_reports/form_part",
    "alive_reports": "/seed/alive_reports/form_part",
    "solution_reports": "/seed/solution_reports/form_part",
    "prop_reports": "/seed/prop_reports/form_part",
    "prop_detail_reports": "/seed/prop_detail_reports/form_part",
    "prop_detail_monthly_reports": "/seed/prop_detail_monthly_reports/form_part",
    "conversion_reports": "/seed/conversion_reports/form_part",
    "invalid_activity_reports": "/seed/invalid_activity_reports/form_part",
    "solution_ratio_reports": "/seed/solution_ratio_reports/form_part"
  },
  "dm": {
    "activity_reports": "/dm/activity_reports/form_part",
  },
  "charge": {
    "activity_trend_reports": "/charge/activity_trend_reports/form_part",
    "activation_reports": "/charge/activation_reports/form_part",
    "situation_reports": "/charge/situation_reports/form_part",
    "activity_reports": "/charge/activity_reports/form_part",
    "activity_month_reports": "/charge/activity_month_reports/form_part",
    "alive_reports": "/charge/alive_reports/form_part"
  }
}

export function getUrl(str){
  // let url = str.split("?").shift().split("/")
  let url = str.split("/index").shift().split("/")
  let b = url.pop()   //得到后面的地址
  let a = url.pop()    //得到seed,charge之类的地址
  for(let i in list){
    if(i == a){
      for(let j in list[i]){
        if(j == b){
          return list[i][j]
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

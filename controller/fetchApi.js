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

export function getForm(){
  return fetch("/seed/prop_reports/form_part",{
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
        forms: data.form.form_items
      }
    })
}

export function getChart({from_date, end_date, tag}){
  let linux_v = tag.linux_v
  let apil = tag.apil
  let ro_pd_brand = tag.brand
  let ro_pd_model = tag.model
  let ro_pd_cpu_abi = tag.abi
  let ro_yunos_sdk_version = tag.yunos_version
  let str = "/seed/prop_reports/index.json?"+"seed_prop_report[from_date]="+from_date+"&seed_prop_report[end_date]="+end_date+"&seed_prop_report[tag]="+tag.tag+"&seed_prop_report[linux_v]="+linux_v+"&seed_prop_report[apil]="+apil+"&seed_prop_report[ro_pd_brand]="+ro_pd_brand+"&seed_prop_report[ro_pd_model]="+ro_pd_model+"&seed_prop_report[ro_pd_cpu_abi]="+ro_pd_cpu_abi+"&seed_prop_report[ro_yunos_sdk_version]="+ro_yunos_sdk_version
  return fetch(str,{
  // return fetch("http://localhost:8888/suibian",{
    credentials : "include",
    mode: "cors",
    method: "GET",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return res.json()
  }).then((data) => {
    return {
      chart: data.chart,
      ratio_chart: data.ratio_chart,
      body: data.table.body,
      columns: data.table.columns,
      id: data.table.id
    }
  })
}

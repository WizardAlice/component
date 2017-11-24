export function getColor(radio, sum){
  if (!radio || radio == 0) {
    return "";
  } else {
    if(radio>1){
      radio = radio/sum
      var r = (-2 * parseInt(radio * 100)) + 182;
      var g = (-1 * parseInt(radio * 100)) + 242;
      var b = (-1 * parseInt(radio * 100)) + 243;
      return "rgb(" + r + "," + g + "," + b + ")";
    }else{
      var r = (-2 * parseInt(radio * 100)) + 182;
      var g = (-1 * parseInt(radio * 100)) + 242;
      var b = (-1 * parseInt(radio * 100)) + 243;
      return "rgb(" + r + "," + g + "," + b + ")";
    }
  }
}

export function changeCol(arr, a, b){
  let x,y = null
  arr.map((v,index) =>{
    if(v.key == a){
      x = index
    }
    if(v.key == b){
      y = index
    }
  })
  let temp = arr[x]
  let temp_ratio = arr[x+1]
  arr[x] = arr[y]
  arr[x+1] = arr[y+1]
  arr[y] = temp
  arr[y+1] = temp_ratio
  return arr
}

export function cloneObj(obj){
  var str, newobj = obj.constructor === Array ? [] : {};
  if(typeof obj !== 'object'){
    return;
  } else if(window.JSON){
    str = JSON.stringify(obj), //系列化对象
    newobj = JSON.parse(str); //还原
  } else {
    for(var i in obj){
      newobj[i] = typeof obj[i] === 'object' ? 
      cloneObj(obj[i]) : obj[i]; 
    }
  }
  return newobj;
}

export function handle_recursion(a, b){
  let res = (b ? (a/b) : 0)
  return res
}

export function handle_recursion_lost(a, b){
  let res = (b ? ((b-a)/b) :0)
  return res
}

export function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
  return arr
}

export function labelFormatter(params){
  if(params.value >500){
    return params.value
  }else{
    return ""
  }
}

export function labelFormatterRatio(params){
  if(params.value >0.05){
    return (params.value*100).toFixed(2).toString() + "%"
  }else{
    return ""
  }
}

export function chartOption({ratio = false, legendDate, x, y, seriesData}){
  let tooltip = {
    trigger: 'axis',
    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  }
  if(ratio === true){
    tooltip = Object.assign(tooltip, {
      formatter: (params) => {
        let str = params[0].name.toString()
        params.map((v) => {
          str += "<br>"
          str += '<span style="display:inline-block;margin-left:5px;margin-right:5px;';
          str += 'border-radius:10px;width:9px;height:9px;';
          str += 'background-color:'+ v.color +'"></span>';
          str += v.seriesName.toString()
          str += " : "
          if(v.value > 10){
            str += v.value
          }else{
            str += (v.value*100).toFixed(2) + "%"
          }
        })
        return str
      }
    })
  }

  let legend = {
    data : legendDate.map((v) => v.toString()),
    bottom: "80%",
    width: "80%"
  }

  let toolbox = {
    feature: {
      saveAsImage: {}
    }
  }
  let grid = {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  }
  let xAxis = {
    type : 'category',
    boundaryGap : x.boundaryGap,
    data : x.data
  }

  let yAxis = y.map((v) => {
    if (v.type == "value"){
      return {
        type : "value",
        axisLabel: {
          formatter: (value, index) => {
            if(ratio === true){
              return (value * 100).toFixed(2)  + '%'
            }else{
              return value
            }
          }
        }
      }
    }else if (v.type == 'right'){
      return { type: 'value' , name: v.name,
        axisLabel: {
        }
      }
    }
  })

  let series = seriesData.map((v) => {
    if(v.type == "bar"){
      if(ratio === true){
        return Object.assign({}, v, {
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: labelFormatterRatio
            }
          }
        })
      }else{
        return Object.assign({}, v, {
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: labelFormatter
            }
          }
        })
      }
    }else{
      return Object.assign({}, v)
    }
  })
  return {
    tooltip: tooltip,
    legend: legend,
    toolbox: toolbox,
    grid: grid,
    xAxis: xAxis,
    yAxis: yAxis,
    series: series
  }
}

export function toPercentsFormatter(type, value, index){
  if (type == "ratio"){   //在于使用了百分比时的y轴
    return (value * 100).toFixed(2)  + '%'
  }else if (type == "basic"){    //在于普通的y轴
    return value
  }
}

export function handleBarMark(params){
  if(params.value >500){
    return params.value
  }else{
    return ""
  }
}








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
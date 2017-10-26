// function fil(inputValue, option){
//     var list = inputValue.toString().toLowerCase().split(" ")
//     var res = true
//     list.map((v) => {
//       if(!option.toLowerCase().includes(v)){
//         res = false
//       }
//     })
//     return res
//   }

//   console.log(fil("ds as sss", "assdsss"))

// function fil(inputValue, option){
//  //你的代码
// }

// fil("alice eric paradiser", "alice_eric_paradiser") 返回true，因为后面的字符串包含前面字符串的三个部分
// fil("alice eric 123", "alice_eric_paradiser") 返回false，因为不包含123
// fil("alice eric", "alice_eric_paradiser") 返回true

function compact(arr){
  let res = []
  arr.map((v) => {
    if(!res.includes(v)){
      res.push(v)
    }
  })
  return res
}

function getFrequest(str){
  let arr = str.split("")
  arr = compact(arr)
}
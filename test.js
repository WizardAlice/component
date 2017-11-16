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





// function compact(arr){
//   let res = []
//   arr.map((v) => {
//     if(!res.includes(v)){
//       res.push(v)
//     }
//   })
//   return res
// }

// function getFrequest(str){
//   let arr = str.split("")
//   arr = compact(arr)
// }



let a = new Promise((resolve, reject) =>{
  setTimeout(resolve, 10, "大的")
})

let b = new Promise((resolve, reject) =>{
  resolve("小的")
})

Promise.race([a, b]).then((res) => {
  console.log(res)
})

// var p1 = new Promise(function(resolve, reject) { 
//     setTimeout(resolve, 500, "one"); 
// });

// var p2 = new Promise(function(resolve, reject) { 
//      
// });

// Promise.race([p1, p2]).then(function(value) {
//   console.log(value); // "two"
//   // 两个都完成，但 p2 更快
// })




























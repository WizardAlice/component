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
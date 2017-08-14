function getPercent(nums) {
	return (Math.round(nums * 10000)/100).toFixed(2) + '%';
}

console.log(getPercent(0.204546))
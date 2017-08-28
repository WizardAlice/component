import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'
import { Switch } from 'antd'

echarts.registerTheme('my_theme', {
  legend: {
    padding: 50
  },
  dataRange: {
    padding: 200
  }
})
let option = {
    title: {
        text: '堆叠区域图'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            },
            formatter: '{b}:\n{c}%'
        }
    },
    legend: {
         data:[
            "SzFRWL01_HU_DM_HGZ",
            "ShTJ02_HA_DM_HGZ",
            "GzXPWL03_HU_DM_HGZ",
            "ShYunK018_HU_DM_HGZ",
            "SzFRWL03_HU_DM_HGZ",
            "BjPP01_HU_DM_HGZ",
            "SzZYou02_HU_DM_HGZ",
            "ShJK03_HU_DM_HGZ",
            "ShZQKJ01_HU_DM_HGZ",
            "SzZYTX020_HU_DM_HGZ",
            "ZhWoYuSK01_HU_DM_HGZ",
            "ShYunK017_HU_DM_HGZ",
            "SzZhaiY04_HU_DM_HGZ",
            "ZhJYWL01_HU_DM_HGZ",
            "ShYunK016_HU_DM_HGZ",
            "BjXinX01_HU_DM_HGZ",
            "ShYiY05_HU_DM_HGZ",
            "ZhJYWL02_HU_DM_HGZ",
            "DgYYXX02_HU_DM_HGZ",
            "SzXQHD00_HU_DM_HGZ",
            "其它"
          ],
          bottom: "80%",
          width: "80%"
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : [
                "2017-08-11",
                "2017-08-12",
                "2017-08-13",
                "2017-08-14",
                "2017-08-15",
                "2017-08-16",
                "2017-08-17"
          ]
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel: {  
                  show: true,  
                  interval: 'auto',  
                  formatter: '{value} %'  
                },  
            show: true  
        }
    ],
    series : [
   {
     "name": "SzFRWL01_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       4772,
       4974,
       4972,
       4485,
       3964,
       3573,
       2972
     ]
   },
   {
     "name": "ShTJ02_HA_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       8281,
       8219,
       8339,
       10416,
       10439,
       10817,
       10021
     ]
   },
   {
     "name": "GzXPWL03_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       4243,
       3697,
       3650,
       3646,
       3532,
       3319,
       3276
     ]
   },
   {
     "name": "ShYunK018_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       2261,
       2316,
       2399,
       2245,
       2322,
       2293,
       2194
     ]
   },
   {
     "name": "SzFRWL03_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       4492,
       3910,
       3747,
       3742,
       3261,
       1063,
       768
     ]
   },
   {
     "name": "BjPP01_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       2611,
       2713,
       3021,
       2763,
       2661,
       2331,
       2075
     ]
   },
   {
     "name": "SzZYou02_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       11058,
       10743,
       17068,
       10757,
       9753,
       14346,
       16107
     ]
   },
   {
     "name": "ShJK03_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       4562,
       4604,
       4286,
       3560,
       3464,
       3267,
       2645
     ]
   },
   {
     "name": "ShZQKJ01_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       9494,
       8538,
       10624,
       19600,
       21286,
       11903,
       13324
     ]
   },
   {
     "name": "SzZYTX020_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       4875,
       4188,
       4001,
       4144,
       3490,
       3486,
       3513
     ]
   },
   {
     "name": "ZhWoYuSK01_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       3040,
       3121,
       3192,
       3791,
       3860,
       3763,
       3645
     ]
   },
   {
     "name": "ShYunK017_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       3308,
       3423,
       3460,
       4121,
       3743,
       3565,
       3540
     ]
   },
   {
     "name": "SzZhaiY04_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       14555,
       16836,
       16409,
       15370,
       12179,
       13607,
       9316
     ]
   },
   {
     "name": "ZhJYWL01_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       5687,
       4038,
       7203,
       7423,
       7881,
       6130,
       4637
     ]
   },
   {
     "name": "ShYunK016_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       4808,
       4453,
       4791,
       4340,
       4227,
       3730,
       3585
     ]
   },
   {
     "name": "BjXinX01_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       2147,
       3187,
       3676,
       3770,
       3734,
       2864,
       1987
     ]
   },
   {
     "name": "ShYiY05_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       6265,
       6315,
       6391,
       6463,
       6295,
       6143,
       6360
     ]
   },
   {
     "name": "ZhJYWL02_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       4905,
       3838,
       3531,
       3457,
       3437,
       3507,
       3512
     ]
   },
   {
     "name": "DgYYXX02_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       5357,
       3820,
       5238,
       6314,
       4500,
       4299,
       6800
     ]
   },
   {
     "name": "SzXQHD00_HU_DM_HGZ",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       2339,
       2415,
       2126,
       2004,
       2245,
       2278,
       2428
     ]
   },
   {
     "name": "其它",
     type:'line',
     stack: '总量',
     areaStyle: {normal: {}},
     "data": [
       33626,
       29271,
       28402,
       31168,
       30892,
       27736,
       32898
     ]
   }
]

};

export default class Allbook extends Component{
  onChange = (e) => {
    console.log(e)
  }
  render(){
    return <div className="EchartReact">
      <div className="radioSwitch"><span>百分比显示：</span><Switch defaultChecked={false} onChange={this.onChange} /></div>
      <ReactEcharts theme='my_theme' notMerge={true} ref={(e) => { this.echarts_react = e; }} style={{height: 800, overflow: "auto"}} option={option} />
    </div>
  }
}








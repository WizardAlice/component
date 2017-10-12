import React, { Component } from 'react';
import { Select } from 'antd'


//使用optionFilterProp属性，在初次拿到下拉框数据时，并不将其在下拉框中展示，而是放到过滤条件中
function cloneObj(obj){
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
const Option = Select.Option;
const OptGroup = Select.OptGroup
export default class Selects extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      FilterData : this.props.attributes.data[1][1],
      attributes : this.props.attributes,
      search : this.props.search
    }
  }
  onSearch = (v) => {  //因为终端属性已经满足需求了，所以只能写在不会造成影响的这里了。即所有具有伪搜索功能的下拉框，都需要以分组的形式，而相当于切换两个数组。而不需要的就不会绑定此函数，但是后期可能还需要避免多个select的关联带入到上面的select中
    if(v){
      let data = cloneObj(this.props.attributes)
      for (let i = 0; i < data.data.length-1; i++) {
        data.data.shift()
      }
      this.setState({
        attributes : data
      })
    }
    else{
      this.setState({
        attributes : this.props.attributes
      })
    }
  }
  render(){
    let attributes = this.state.attributes
    return (
      <div className="selectReact">
        <span className="formsLabel">{this.props.labelName}:</span>
        {
          Array.isArray(this.state.attributes.data[this.state.attributes.data.length-1])?
            <Select showSearch onChange={(v)=>this.props.tagchange(v, this.props.name,attributes.default,()=>this.onSearch(""))} onSearch={(v) => this.onSearch(v)} value={this.props.tagValue} tags={true} multiple={false} style={{ width: "70%" }} defaultValue={attributes.default} >
              {
                attributes.data.slice(0,this.props.attributes.data.length-1).map((vv, i) => {
                  return (<OptGroup label={vv[0]} key={i}>
                    {
                      vv[1].map((vvv, ii) => {
                        return <Option value={vvv} key={ii}>{vvv}</Option>
                      })
                    }
                  </OptGroup>)
                })
              }
            </Select>:
            <Select showSearch optionFilterProp="children" onChange={(v)=>this.props.tagchange(v, this.props.name,attributes.default)} value={this.props.tagValue} tags={true} multiple={false} style={{ width: "70%" }} defaultValue={attributes.default} >
              {
                attributes.data.map((vv, i) => {
                  return <Option value={vv} key={i}>{vv}</Option>
                })
              }
            </Select>
        }
      </div>
    )
  }
}




        // {
        //   Array.isArray(this.props.attributes.data[this.props.attributes.data.length-1])?
        //     <Select showSearch onChange={(v)=>this.props.tagchange(v, this.props.name)} onSearch={(v) => this.onSearch(v)} value={this.props.tagValue} tags={true} multiple={false} style={{ width: "70%" }} defaultValue={attributes.default} optionFilterProp="children" >
        //       {
        //         attributes.data.map((vv, i) => {
        //           return (<OptGroup label={vv[0]} key={i} refs="suibian">
        //             {
        //               vv[1].map((vvv, ii) => {
        //                 return <Option value={vvv} key={ii}>{vvv}</Option>
        //               })
        //             }
        //           </OptGroup>)
        //         })
        //       }
        //     </Select>:
        //     <Select showSearch optionFilterProp="children" onChange={(v)=>this.props.tagchange(v, this.props.name)} value={this.props.tagValue} tags={true} multiple={false} style={{ width: "70%" }} defaultValue={attributes.default} >
        //       {
        //         attributes.data.map((vv, i) => {
        //           return <Option value={vv} key={i}>{vv}</Option>
        //         })
        //       }
        //     </Select>
        // }



        // {
        //   Array.isArray(this.props.attributes.data[this.props.attributes.data.length-1])?
        //     <Select showSearch onChange={(v)=>this.props.tagchange(v, this.props.name)} value={this.props.tagValue} tags={true} multiple={false} style={{ width: "70%" }} defaultValue={attributes.default} optionFilterProp={this.state.FilterData} >
        //       {
        //         attributes.data[0][1].map((vvv, ii) => {
        //           return <Option value={vvv} key={ii}>{vvv}</Option>
        //         })
        //       }
        //     </Select>:
        //     <Select showSearch optionFilterProp="children" onChange={(v)=>this.props.tagchange(v, this.props.name)} value={this.props.tagValue} tags={true} multiple={false} style={{ width: "70%" }} defaultValue={attributes.default} >
        //       {
        //         attributes.data.map((vv, i) => {
        //           return <Option value={vv} key={i}>{vv}</Option>
        //         })
        //       }
        //     </Select>
        // }
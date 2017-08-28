import React, { Component } from 'react';
import { Select } from 'antd'

const Option = Select.Option;
const OptGroup = Select.OptGroup
export default class Selects extends Component {
  render(){
    let attributes = this.props.attributes
    return (
      <div className="selectReact">
        <span className="formsLabel">{this.props.name}:</span>
        {
          Array.isArray(this.props.attributes.data[this.props.attributes.data.length-1])?
            <Select showSearch onChange={this.props.tagchange} style={{ width: "80%" }} defaultValue={attributes.default} optionFilterProp="children" >
              {
                attributes.data.map((vv, i) => {
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
            <Select showSearch onChange={(v)=>this.props.tagchange(v, this.props.name)} value={this.props.tagValue} tags={true} multiple={false} style={{ width: "70%" }} defaultValue={attributes.default} optionFilterProp="children" >
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
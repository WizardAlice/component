import React, { Component } from 'react';
import { Select } from 'antd'

const Option = Select.Option;
const OptGroup = Select.OptGroup
export default class Selects extends Component {
  render(){
    let attributes = this.props.attributes
    return (
      <div style={{ width: "200" }}>
        {
          Array.isArray(this.props.attributes.data.pop())?
            <Select showSearch style={{ width: "80%" }} defaultValue={attributes.default} optionFilterProp="children" onChange={this.handleChange} filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
            <Select showSearch style={{ width: "80%" }} defaultValue={attributes.default} optionFilterProp="children" onChange={this.handleChange} filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
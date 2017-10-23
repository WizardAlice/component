import React, { Component } from 'react'
import { Menu, Icon } from 'antd'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class TopNav extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      current: "seed"
    }
  }
  handleClick = (e) => {
    this.setState({
      current: e.key
    })
  }
  render(){
    return (
      <div>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" >
          <Menu.Item key="tiger">
            TigerData
          </Menu.Item>
          <SubMenu title={<span><Icon type="seed" />实验室报表</span>}>
            <Menu.Item key="seed:1"><a href="/#/seed/activity_situation_reports">用户概括</a></Menu.Item>
            <Menu.Item key="seed:2"><a href="http://localhost:8000/#/seed/business_activation_reports">用户线新增</a></Menu.Item>
            <Menu.Item key="seed:3"><a href="http://localhost:8000/#/seed/activity_reports">活跃用户</a></Menu.Item>
            <Menu.Item key="seed:16"><a href="http://localhost:8000/#/seed/activation_new_reports">新增用户</a></Menu.Item>
            <Menu.Item key="seed:4"><a href="http://localhost:8000/#/seed/alive_reports">留存用户</a></Menu.Item>
            <Menu.Item key="seed:5"><a href="http://localhost:8000/#/seed/solution_reports">方案执行</a></Menu.Item>
            <Menu.Item key="seed:6">流失分析</Menu.Item>
            <Menu.Item key="seed:7">新事件流失分析</Menu.Item>
            <Menu.Item key="seed:8">新事件转换率</Menu.Item>
            <Menu.Item key="seed:9"><a href="http://localhost:8000/#/seed/prop_reports">终端厂商</a></Menu.Item>
            <Menu.Item key="seed:10"><a href="http://localhost:8000/#/seed/prop_attribute_reports">终端属性</a></Menu.Item>
            <Menu.Item key="seed:11"><a href="http://localhost:8000/#/seed/prop_detail_reports">终端机型</a></Menu.Item>
            <Menu.Item key="seed:12"><a href="http://localhost:8000/#/seed/prop_detail_monthly_reports">终端属性月汇总</a></Menu.Item>
            <Menu.Item key="seed:13"><a href="http://localhost:8000/#/seed/conversion_reports">活跃跨业务线</a></Menu.Item>
            <Menu.Item key="seed:14"><a href="http://localhost:8000/#/seed/invalid_activity_reports">无效活跃</a></Menu.Item>
            <Menu.Item key="seed:15"><a href="http://localhost:8000/#/seed/solution_ratio_reports">方案成功占比</a></Menu.Item>
          </SubMenu>
          <SubMenu title={<span><Icon type="charge" />计费报表</span>}>
            <Menu.Item key="charge:1">计费概括</Menu.Item>
            <Menu.Item key="charge:2">计费新增</Menu.Item>
            <Menu.Item key="charge:3">计费活跃</Menu.Item>
            <Menu.Item key="charge:4">计费月报</Menu.Item>
            <Menu.Item key="charge:5"><a href="http://localhost:8000/#/charge/activity_trend_reports">计费趋势</a></Menu.Item>
            <Menu.Item key="charge:6">计费留存</Menu.Item>
          </SubMenu>
          <SubMenu title={<span><Icon type="ework" />易打工</span>}>
            <Menu.Item key="ework:1">Option 1</Menu.Item>
            <Menu.Item key="ework:2">Option 2</Menu.Item>
          </SubMenu>
          <SubMenu title={<span><Icon type="DM" />DM报表</span>}>
            <Menu.Item key="DM:1"><a href="http://localhost:8000/#/dm/activity_reports">DM活跃</a></Menu.Item>
            <Menu.Item key="DM:2">Option 2</Menu.Item>
          </SubMenu>
          <SubMenu title={<span><Icon type="setting" />系统管理</span>}>
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </SubMenu> 
        </Menu>
        {
          this.props.children
        }
      </div>
    )
  }
}









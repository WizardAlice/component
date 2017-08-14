import React, { Component } from 'react';
import { Table } from 'antd'


const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

export default class Suibian extends Component {
	constructor(props){
		super(props)
		this.state={
			dataSource:[{
			  key: '1',
			  name: '胡彦斌',
			  age: 32,
			  address: '西湖区湖底公园1号'
			}, {
			  key: '2',
			  name: '胡彦祖',
			  age: 42,
			  address: '西湖区湖底公园1号'
			}],
			columns:[{
			  title: '姓名',
			  dataIndex: 'name',
			  key: 'name',
			}, {
			  title: '年龄',
			  dataIndex: 'age',
			  key: 'age',
			}, {
			  title: '住址',
			  dataIndex: 'address',
			  key: 'address',
			}]
		}
	}
	render(){
		return <Table dataSource={this.state.dataSource} columns={this.state.columns} pagination={false} />
	}
}
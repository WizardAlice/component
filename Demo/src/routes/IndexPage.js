import React, { Component } from 'react';
import moment from 'moment'
// import { connect } from 'dva';
import './IndexPage.css';
import { DatePicker, Button, Table } from 'antd'
import "antd/lib/button/style"
import "antd/lib/date-picker/style"
import "antd/lib/select/style"
import "antd/lib/table/style"
import { gettable } from "../controller/fetchApi"
import  Selects  from '../components/Select'

// function IndexPage() {
//   return (
//     <div className={styles.normal}>
//       <h1 className={styles.title}>Yay! Welcome to dva!</h1>
//       <div className={styles.welcome} />
//       <DatePicker />
//       <ul className={styles.list}>
//         <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
//         <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
//       </ul>
//     </div>
//   );
// }

// IndexPage.propTypes = {
// };

// export default connect()(IndexPage);

const dateFormat = 'YYYY/MM/DD'
const RangePicker = DatePicker.RangePicker

function getPercents(num) {
  return (Math.round(num * 10000)/100).toFixed(2) + '%';
}

function getThousands(num) {
  var number = new Number(num);
    var str = number.toString();
    var newstr = str.replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
        return s+','
    }) 
    
  return newstr;
}

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
  }),
};

export default class IndexPage extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      forms: [],
      body: [],
      columns: [],
      startTime: "",
      endTime: ""
    }
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  getDate = (dates, dateStrings) => {
    // this.setState({

    // })
    console.log(dateStrings)
  }
  componentDidMount() {
    gettable().then((res)=>{
      console.log(res)
      let a = []
      if(res.body){
        res.columns.map((v) => {
          if(v.extra){
            a.push({
              title: v.title.toUpperCase(),
              dataIndex: v.dataIndex,
              key: v.key,
              sorter: (a, b) => a[v.key] - b[v.key],
              render: (text, record, index) => {
                let inner = v.extra.percents?getPercents(text):(v.extra.thousands?getThousands(text):text)
                if(v.extra.href){
                  return <a href={v.extra.href} style={v.extra.style}>{inner}</a>
                }
                else{
                  return <span>{inner}</span>
                }
              }
            })
          }
          else{
            a.push({
              title: v.title.toUpperCase(),
              dataIndex: v.dataIndex,
              key: v.key,
            })
          }
        })
      }
      this.setState({
        forms: res.forms,
        body: res.body,
        columns: a
      })
      console.log(res)
    })
  } 
  render() {
    return (
      <div className="content">
        {
          this.state.forms.length==0?null:(
            <div className="formContent">
              <div className="form">
                {
                  this.state.forms.map((v, index) => {
                    if(v.attributes.input_type == "datetime"){
                      return <RangePicker defaultValue={moment(v.attributes.from_date, dateFormat)} key={index} ranges={{ "今天": [moment(), moment()], '这个月': [moment(), moment().endOf('month')] }} onChange={this.getDate}/>
                    }
                    else if(v.attributes.input_type == "select"){
                      return <Selects attributes={v.attributes} key={index}/>
                    }
                  })
                }
              </div>
              <div className="searchButton">
                <Button type="primary" shape="circle" icon="search"/>
              </div>
            </div>
          )
        }

            <div className="table">
              <Table columns={this.state.columns} dataSource={this.state.body} pagination={true} rowSelection={rowSelection} rowKey={(record) => record.id}/>
            </div>

      </div>
    )
  }
}












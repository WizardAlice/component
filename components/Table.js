import React,{Component} from 'react'
import { changeCol , cloneObj , handle_recursion , getColor , handle_recursion_lost } from '../controller/method'
import { Modal , Button } from 'antd'


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
export default class Table extends Component{
  constructor(props, context) {
    super(props, context)
    this.state = {
      list: typeof(this.props.columns[0]) == "string"? this.props.columns[2] : this.props.columns.map((v) => {
        let a = {}
        a.key = v.key,
        a.extra = v.extra
        return a
      }),
      table: this.props.table,
      id: Math.random().toString(36).substr(2),
      idTodestroy: "",
      visible: false,
      recursion: this.props.recursion,
      current: "",
      columns: this.props.columns,
      foot: this.props.foot,
      hide_columns: this.props.hide_columns
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.data!==nextProps.data){
      let idTodestroy = this.state.id
      let id = Math.random().toString(36).substr(2)
      this.setState({
        list: typeof(nextProps.columns[0]) == "string"? nextProps.columns[2] : nextProps.columns.map((v) => {
          let a = {}
          a.key = v.key,
          a.extra = v.extra
          return a
        }),
        table: nextProps.table,
        id: id,
        idTodestroy: idTodestroy,
        recursion: nextProps.recursion,
        columns: nextProps.columns,
        foot: nextProps.foot,
        hide_columns: nextProps.hide_columns
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if(this.props.data==nextProps.data && this.state.visible == nextState.visible){
      return false
    }else{
      if(this.props.data.length != 0){
        $("#"+nextState.idTodestroy).DataTable().destroy()
      }
      return true
    }
  }
  // // componentWillUpdate(nextProps, nextState){
  // //   $("#abc").DataTable().destroy()
  // // }
  componentDidMount(){
    if(this.props.data.length != 0){
      init_dataTables(this.state.id,{
        columnDefs: [{
          targets: this.state.hide_columns,
          visible: false
        }]
      })
    }
  }
  componentDidUpdate(){
    if(this.props.data.length != 0){
      init_dataTables(this.state.id,{
        columnDefs: [{
          targets: this.state.hide_columns,
          visible: false
        }]
      })
    } 
  }

  showData = (extra, base) => {
    if(extra.thousands){
      return getThousands(base)
    }else if(extra.percents){
      return getPercents(base)
    }else if(extra.limit){
      return base.toFixed(2)
    }else {
      return base
    }
  }

  addKeyListener = (v) => {
    this.setState({
      current: v
    })
    window.addEventListener('keypress', this.showModal)
  }

  RemoveKeyListener = () => {
    window.removeEventListener('keypress', this.showModal, false)
  }
  showModal = (v) => {
    if(window.event.key == "c"){
      this.setState({
        visible: true
      })
    }
  }

  getHead = (columns) => {
    if(typeof(columns[0]) == "string"){   //双重表头的情况下
      return (
        <thead>
          <tr>
            {columns[1].map((v,i) => {
              return  <th key={i} rowSpan={v[1].rowSpan.toString()} colSpan={v[1].colSpan.toString()} style={{textAlign: "center"}}>
                        {v[0]}
                      </th>
            })}
          </tr>
          <tr>
            {columns[2].map((v) => {
              return  <th key={v.key}>
                        {v.title}
                      </th>
            })}
          </tr>
        </thead>
      )
    }
    else{     //一般情况下
      return (
        <thead>
          <tr>
            {columns.map((v) => {
              return  <th key={v.key} onMouseEnter={(v.extra&&v.extra.changeable)?(() => this.addKeyListener(v.key)):(()=>{})} onMouseLeave={(v.extra&&v.extra.changeable)?(() => this.RemoveKeyListener(v.key)):(()=>{})}>
                        {v.title}
                      </th>
            })}
          </tr>
        </thead>
      )  
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  getBody = (body, columns) => {
    if(body.length == 0){
      return <tr><td colSpan={columns.length} style={{textAlign: "center"}}>无数据</td></tr>
    }
    if(this.state.table){    //xy轴都是固定的时候
      return (this.state.table.y.map((y,i1) => {
        return(
          <tr key={i1}>
            <td key={i1.toString()+"province"}>{y}</td>
            {
              this.state.table.x.map((x,i3) => {
                let base = ""
                body.map((v,i2) => {
                  if(v.province == y && v.report_date == x.value){
                    base = v.activity_nums
                  }
                  return
                })
                return (<td key={i3}>{this.showData(x.extra, base)}</td>)
              })
            }
          </tr>
        )
      }))
    }
    if(this.state.recursion){  //需要根据前面的列进行计算的时候
      return (body.map((v, index) => {
        let count = 0
        return (
          <tr key={index} style={v.style}>
            {
              this.state.list.map((vv, index1) => {
                if(vv.extra.recursion){
                  count += 1
                }
                let last = (vv.extra.recursion?(  count==1 ?  handle_recursion(v[this.state.list[index1-1].key], v[this.state.list[index1-2].key]) : handle_recursion(v[this.state.list[index1-1].key], v[this.state.list[index1-4].key])    ) : 
                  (vv.extra.recursion_lost ? (  count==1 ?  handle_recursion_lost(v[this.state.list[index1-2].key], v[this.state.list[index1-3].key]) : handle_recursion_lost(v[this.state.list[index1-2].key], v[this.state.list[index1-5].key])    ) : v[vv.key]))
                return  <td key={index1} style={vv.extra.cell_color?{backgroundColor: getColor(v[vv.key], v["main"])}:null}>
                          { vv.extra.recursion||vv.extra.recursion_lost ? ( this.showData(vv.extra, last) ) : 
                            v[vv.key] ? this.showData(vv.extra, last) :"" }
                        </td>
              })
            }
          </tr>
        )                                                                                 
      }))
    }
    else{   //一般情况下
      return (body.map((v, index) => {
        return (
          <tr key={index} style={v.style}>
            {
              this.state.list.map((vv, index1) => {
                return  <td key={index1} style={vv.extra.cell_color?{backgroundColor: getColor(v[vv.key], v["main"])}:null}>
                          {v[vv.key] ?(this.showData(vv.extra, v[vv.key])):""}
                        </td>
              })
            }
          </tr>
        )
      }))
    }
  }

  changeCol = (v) => {
    this.setState({
      columns: changeCol(this.state.columns, v, this.state.current),
      list: changeCol(this.state.list, v, this.state.current),
      visible: false,
      recursion: this.props.recursion
    })
  }

  renderChangeItems = (recursion) => {
    recursion = cloneObj(recursion)
    recursion.map((n, index) =>{
      if(n == this.state.current){
        recursion.splice(index, 1)
      }
    })
    return recursion.map((v) => {
      return (
        <Button style={{width: "32%", marginRight: "1%"}} ghost type="primary" onClick={() => this.changeCol(v)}>{v.replace(/_ct/, "")}</Button>
      )
    })
  }

  render(){
    return(
      <div >
        {this.state.recursion?(
          <Modal title="更换阶段顺序" 
            visible={this.state.visible}  
            onCancel={this.handleCancel}
            footer={[]}
          >
          {
            this.renderChangeItems(this.state.recursion)
          }
          </Modal>
        ):null}
        <table id={this.state.id} className="table table-bordered table-hover" cellspacing="0" width="100%">
          {this.getHead(this.state.columns)}
          <tbody>
            {this.getBody(this.props.data, this.state.columns)}
          </tbody>
          {this.state.foot? (
            <tfoot>
              {this.getBody(this.props.foot, this.state.columns)}
            </tfoot>
          ):null}
        </table>
      </div>
    )
  }
}
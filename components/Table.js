import React,{Component} from 'react'
import { getColor } from '../controller/method'

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
      idTodestroy: ""
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.data!==nextProps.data){
      let idTodestroy = this.state.id
      let id = Math.random().toString(36).substr(2)
      this.setState({
        list: typeof(this.props.columns[0]) == "string"? this.props.columns[2] : nextProps.columns.map((v) => {
          let a = {}
          a.key = v.key,
          a.extra = v.extra
          return a
        }),
        table: nextProps.table,
        id: id,
        idTodestroy: idTodestroy
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if(this.props.data==nextProps.data){
      return false
    }else{
      $("#"+nextState.idTodestroy).DataTable().destroy()
      return true
    }
  }
  // // componentWillUpdate(nextProps, nextState){
  // //   $("#abc").DataTable().destroy()
  // // }
  componentDidMount(){
    init_dataTables(this.state.id,{})
  }
  componentDidUpdate(){
    init_dataTables(this.state.id,{})
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

  getHead = (columns) => {
    if(typeof(columns[0]) == "string"){
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
    else{
      return (
        <thead>
          <tr>
            {columns.map((v) => {
              return  <th key={v.key}>
                        {v.title}
                      </th>
            })}
          </tr>
        </thead>
      )  
    }
  }

  getBody = (body, columns) => {
    if(body.length == 0){
      return <tr><td colSpan={columns.length} style={{textAlign: "center"}}>无数据</td></tr>
    }
    if(this.state.table){
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
    else{
      return (body.map((v, index) => {
          return (
            <tr key={index}>
              {
                this.state.list.map((vv, index1) => {
                  return  <td key={index1} style={vv.extra.cell_color?{backgroundColor: getColor(v[vv.key], v["main"])}:null}>
                            {v[vv.key]?(this.showData(vv.extra, v[vv.key])):""}
                          </td>
                })
              }
            </tr>
          )
        }))
    }
  }

  render(){
    return(
      <div >
        <table id={this.state.id} className="table table-bordered table-hover" cellspacing="0" width="100%">
          {this.getHead(this.props.columns)}
          <tbody>
            {this.getBody(this.props.data, this.props.columns)}
          </tbody>
        </table>
      </div>
    )
  }
}
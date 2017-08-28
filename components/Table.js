import React,{Component} from 'react'

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
      list: this.props.columns.map((v) => {
        let a = {}
        a.key = v.key,
        a.extra = v.extra
        return a
      })
    }
  }
  componentWillReceiveProps(newxProps) {
    this.setState({
      list: newxProps.columns.map((v) => {
        let a = {}
        a.key = v.key,
        a.extra = v.extra
        return a
      })
    })
  }
  shouldComponentUpdate(nextProps, nextState){
    return this.props.data!==nextProps.data
  }
  componentWillUpdate(nextProps, nextState){
    $("#abc").DataTable().destroy()
  }
  componentDidMount(){
    init_dataTables("abc",{})
  }
  componentDidUpdate(){
    init_dataTables("abc",{})
  }
  render(){
    return(
      <div >
        <table id="abc" className="table table-bordered table-hover" cellspacing="0" width="100%">
          <thead>
            <tr>
              {this.props.columns.map((v) => {
                return  <th key={v.key}>
                          {v.title}
                        </th>
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((v, index) => {
              return  <tr key={index}>
                        {
                          this.state.list.map((vv, index1) => {
                            return  <td key={index1}>
                                      {vv.extra=="thousands"?getThousands(v[vv.key]):(vv.extra=="percents"?getPercents(v[vv.key]):v[vv.key])}
                                    </td>
                          })
                        }
                      </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
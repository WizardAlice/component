import { connect } from 'react-redux'
import { closeChartsModal } from '../actions'
import ChartMoadl from '../components/ChartModal'

const mapStateToProps = (state, props) => {
  return {
    visible: state.chartsReducer.show,
    option: state.chartsReducer.option
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    close: (param) => {
      dispatch(closeChartsModal())
    }
  }
}

const ChartMoadls = connect(mapStateToProps, mapDispatchToProps)(ChartMoadl)

export default ChartMoadls
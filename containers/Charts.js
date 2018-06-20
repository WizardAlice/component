import { connect } from 'react-redux'
import { showChartsModal } from '../actions'
import Allbook from '../components/Charts'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (param) => {
      dispatch(showChartsModal(ownProps.data , param.name))
    }
  }
}

const state = {
  visible: false
}

const Charts = connect(() => state, mapDispatchToProps)(Allbook)

export default Charts
// import {  }

const chartsModal = (state = {show: false}, action) => {
  switch (action.type) {
    case 'SHOW_PIE_CHARTS':
      return {
        show: true,
        option: action.option
      }
    case 'CLOSE_PIE_CHARTS':
      return Object.assign({}, state, {show: false})
    default:
      return state
  }
}

export default chartsModal
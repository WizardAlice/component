import { handlePieOptions } from '../controller/method'

export const showChartsModal = (datas, name) => {
  return {
    type: 'SHOW_PIE_CHARTS',
    option: handlePieOptions(datas, name)
  }
}

export const closeChartsModal = () => {
  return {
    type: 'CLOSE_PIE_CHARTS'
  }
}



// export const setVisibilityFilter = filter => {
//   return {
//     type: 'SET_VISIBILITY_FILTER',
//     filter
//   }
// }

// export const toggleTodo = id => {
//   return {
//     type: 'TOGGLE_TODO',
//     id
//   }
// }
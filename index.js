import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Product from './Product'
// import TopNav from './components/TopNav'  //开发测试用，模拟路由
import FakerLayout from './components/FakerLayout'
import { Router, Route, hashHistory , IndexRedirect} from 'react-router'; //开发测试用，模拟路由
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reportReducer from './reducers'
// import Allbook from './test'

let store = createStore(reportReducer)

ReactDOM.render(( //开发测试用，模拟路由
  <Provider store={store} >
  	<Router history={hashHistory}>
      <Route path="/" component={FakerLayout}>
      	<IndexRedirect to="/seed/activity_situation_reports" />
      	<Route path="/seed/prop_attribute_reports" component={Product}/>
      	<Route path="/seed/activity_situation_reports" component={Product}/>
        <Route path="/seed/business_activation_reports" component={Product}/>
        <Route path="/seed/activity_reports" component={Product}/>
        <Route path="/seed/activation_new_reports" component={Product}/>
        <Route path="/seed/alive_reports" component={Product}/>
        <Route path="/seed/solution_reports" component={Product}/>
        <Route path="/seed/prop_reports" component={Product}/>
        <Route path="/seed/prop_detail_reports" component={Product}/>
        <Route path="/seed/prop_detail_monthly_reports" component={Product}/>
      	<Route path="/seed/conversion_reports" component={Product}/>
      	<Route path="/seed/invalid_activity_reports" component={Product}/>
      	<Route path="/seed/solution_ratio_reports" component={Product}/>
      	<Route path="/seed/solutions_ratio_reports" component={Product}/>
      	<Route path="/seed/overline_service_reports" component={Product}/>
      	<Route path="/seed/solution_conversion_reports" component={Product}/>
      	<Route path="/seed/solution_conversion_reports" component={Product}/>
      	<Route path="/seed/solution_conversion_reports" component={Product}/>
      	<Route path="/seed/solution_conversion_reports" component={Product}/>
      	<Route path="/seed/overline_service_reports" component={Product}/>
        <Route path="/seed/delivery_lost_ratio_reports" component={Product}/>

      	<Route path="/dm/activity_reports" component={Product}/>
        <Route path="/dm/alive_reports" component={Product}/>
      	
      	<Route path="/charge/activity_trend_reports" component={Product}/>
        <Route path="/charge/activation_reports" component={Product}/>
        <Route path="/charge/situation_reports" component={Product}/>
        <Route path="/charge/activity_reports" component={Product}/>
        <Route path="/charge/activity_month_reports" component={Product}/>
        <Route path="/charge/alive_reports" component={Product}/>

      	<Route path="/ework/conversion_reports" component={Product}/>
      	<Route path="/ework/business_monthly_reports" component={Product}/>
        <Route path="/ework/overline_service_mobile_reports" component={Product}/>
        <Route path="/ework/arrival_operate_reports" component={Product}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));

// ReactDOM.render(<Product />, document.getElementById('root')); //打包

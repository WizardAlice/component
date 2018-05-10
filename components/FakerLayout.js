import React, { Component } from 'react'

export default class FakerLayout extends Component {
  render(){
    return (
      <div>
        {
          this.props.children
        }
      </div>
    )
  }
}









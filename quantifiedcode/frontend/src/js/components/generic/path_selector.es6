import React from "react"
import Utils from "utils"
import {A} from "routing"

var PathSelector = React.createClass({
  displayName: 'PathSelector',

  propTypes: {
    //the path to be displayed
    path: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.node.isRequired,
      href: React.PropTypes.string
    })).isRequired,
    //the elements of the dropdown menu displayed after the last element
    childrenMenu: React.PropTypes.node
  },

  render: function(){
      var props = this.props
      var path = props.path

      var breadCrumbs = path.map(function(pathComponent, idx){
          if(pathComponent.hasOwnProperty("href")) {
            return <li key={idx}><A href={pathComponent.href}>{pathComponent.title}</A></li>
          } else {
            return <li key={idx}>{pathComponent.title}</li>
          }
      })

      var childrenMenu
      if (props.childrenDropdown && props.childrenDropdown.length) {
        childrenMenu =  <li className="path-dd">
            <div className="btn-group">
              <button className="btn-xs dropdown-toggle" data-toggle="dropdown">
                <span className="fa fa-chevron-right " />
              </button>
              <ul className="dropdown-menu">
                {this.props.childrenDropdown}
              </ul>
            </div>
          </li>
      }

      return <div className="path-selector">
          <ol className="path-list">
          {breadCrumbs}
          {childrenMenu}
          </ol>
        </div>

  }
})

export default PathSelector

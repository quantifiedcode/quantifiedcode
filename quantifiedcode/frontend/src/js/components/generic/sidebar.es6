import React from "react"
import Utils from "utils"
import UX from "ux"

var Sidebar = React.createClass({

    displayName: 'Sidebar',

    componentDidMount : function () {
      //UX.affixElement(".sidebar", ".footer", undefined, ".content", 2)
    },

    componentDidUpdate : function () {
      //UX.affixElement(".sidebar", ".footer", undefined, ".content", 2)
    },

    render : function(){
      return <div className="sidebar">
        {this.props.children}
      </div>
    },
})

export default Sidebar

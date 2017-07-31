import React from "react"
import Utils from "utils"
import UX from "ux"
var Toolbar = React.createClass({

    displayName: 'Toolbar',

    componentDidMount : function () {
      //UX.affixElement(".tb", ".footer")
    },

    componentDidUpdate : function () {
      //UX.affixElement(".tb", ".footer")
    },

    render : function(){

      return  <div className="toolbar clearfix">
          <div className="col-xs-12">
            <div className="element-wrapper top-radius-sm row">
              {this.props.children}
            </div>
          </div>
      </div>
    },
})

export default Toolbar

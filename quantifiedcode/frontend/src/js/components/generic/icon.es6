import React from "react"
    var Icon = React.createClass({

    displayName: 'Icon',

    render : function(){
      return <i className={"octicon octicon-" + this.props.name} />
    }
})

export default Icon

import React from "react"
import {A} from "routing"

var Breadcrumbs = React.createClass({

    displayName: 'Breadcrumbs',

    render : function(){
        var breadcrumbs = this.props.breadcrumbs.map(function(params,i){
            return <li className={i == this.props.breadcrumbs.length -1 ? 'active' : ''}>
                        <A href={params.url}>{params.name}</A>
                   </li>
        }.bind(this))
        return <ol className="breadcrumb">
            {breadcrumbs}
        </ol>
    }
})

export default Breadcrumbs

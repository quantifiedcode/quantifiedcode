import React from "react"
import {A} from "routing"

var Textfold = React.createClass({

    displayName: 'Textfold',

    getDefaultProps : function(){
      return {hidden : undefined,href   : '#',hrefClose : '#',collapsible: true}
    },

    getInitialState : function(){
      return {hidden : this.props.hidden !== undefined ? this.props.hidden : true}
    },

    hideContent : function(e){
      if (this.props.onHide !== undefined)
        this.props.onHide()
      if (this.props.hrefClose !== '#')
        return
      this.setState({hidden : true})
      e.preventDefault()
    },

    componentWillReceiveProps : function(props){
      if (props.hidden !== undefined && props.hidden != this.state.hidden)
        this.setState({hidden : props.hidden})
    },

    showContent : function(e){
      if (this.props.onShow !== undefined)
        this.props.onShow()
      if (this.props.href !== '#')
        return
      this.setState({hidden : false})
      e.preventDefault()
    },

    render : function(){
      var moreOrLess = <i className="more fa fa-chevron-right" />
      var contentDiv
      var onClick = this.showContent
      var href = this.props.href
      if (!this.state.hidden)
      {
        moreOrLess = <i className="fa fa-chevron-down more grey" />
        onClick = this.hideContent
        if (this.props.onShow !== undefined)
          this.props.onShow()
        contentDiv = <div className="content">{this.props.children}</div>
        if (this.props.hrefClose !== '#')
          href = this.props.hrefClose
      }
      if (!this.props.collapsible){
        href = '#'
      }

      if (this.props.collapsible)
        return <div className={"react-dropdown"+(this.props.extraClass !== undefined ? " "+this.props.extraClass : '')}>
            <div className="dd-header"><A className="more" href={href} onClick={onClick}>{moreOrLess} {this.props.description}</A></div>
            {contentDiv}
          </div>
      else
        return <div className={"react-dropdown"+(this.props.extraClass !== undefined ? " "+this.props.extraClass : '')}>
            <div className="dd-header"><A className="more">{moreOrLess} {this.props.description}</A></div>
            {contentDiv}
          </div>
    }
})

export default Textfold

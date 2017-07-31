import Utils from "utils"
import {redirectTo, makeUrl} from "routing"
import UserApi from "api/user"
import FormMixin from "components/mixins/form"
import FlashMessagesService from "flash_messages"
import React from "react"

var Logout = React.createClass({

    displayName: "Logout",

    componentWillMount : function(){
        this.flashMessagesService = FlashMessagesService.getInstance()
    },

    getInitialState :function(){
        return {loggedOut : false}
    },

    componentDidMount : function() {
        var confirmLogout = function() {
            Utils.logout()
            this.setState({loggedOut : true})
            redirectTo(makeUrl(this.props.baseUrl,{loggedOut : true}))
        }.bind(this)

        setTimeout(function(){
            UserApi.logout(confirmLogout, confirmLogout)
        }.bind(this),2000)
    },

    render: function () {
      if (this.state.loggedOut) {
        return <div className="row">
              <div className="col-xs-12">
                  <h3 className="alert alert-success">
                      You have been successfully logged out. Hope to see you again soon!
                  </h3>
              </div>
          </div>
      } else {
        return <div className="row">
              <div className="col-xs-12">
                  <h3 className="alert alert-info">
                      <i className="fa fa-refresh fa-spin" /> Please wait, logging you out...
                  </h3>
              </div>
          </div>
      }
    },

})

export default Logout

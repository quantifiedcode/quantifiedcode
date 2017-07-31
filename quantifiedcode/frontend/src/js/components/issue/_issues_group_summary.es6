import React from "react"
import IssueHelpers from "helpers/issue"
import Utils from "utils"

var IssuesGroupSummary = React.createClass({

    displayName: 'IssuesGroupSummary',

    render: function() {
        var props = this.props,
            state = this.state

        var filesCount = IssueHelpers.countFor(props.issues)[0],
            issuesCount = IssueHelpers.countFor(props.issues)[1]

        return <span className={"files-affected"} >{issuesCount} {Utils.pluralize(issuesCount,"issue")} in {filesCount} {Utils.pluralize(filesCount, "file")}.</span>
    }

})

export default IssuesGroupSummary

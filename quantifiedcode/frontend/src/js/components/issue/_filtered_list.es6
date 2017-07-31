import React from "react"
import Content from "components/generic/content"
import Toolbar from "components/generic/toolbar"
import Sidebar from "components/generic/sidebar"
import IssuesList from "components/issue/_list"
import IssuesFilters from "components/issue/_filters"
import PathIssueFilter from "components/issue/_path_issue_filter"
import Utils from "utils"
import IssueHelpers from "helpers/issue"

var FilteredIssueList = React.createClass({
    displayName: 'FilteredIssueList',

    propTypes: {
        //the summary containing the issues which should be displayed
        issuesSummary: React.PropTypes.any.isRequired,
        //the meta data for the found issues
        issuesData: React.PropTypes.any.isRequired,
        //the project for which the issues should be displayed
        project: React.PropTypes.any.isRequired,
        //the URL data
        data: React.PropTypes.any.isRequired,
        //the currently applied filters
        filters: React.PropTypes.object.isRequired,
        //the currently selected path
        path: React.PropTypes.string.isRequired,
        //the baseUrl used to build URLs
        baseUrl: React.PropTypes.string.isRequired,
        //the url parameters
        params: React.PropTypes.object.isRequired,
        //a callback which will be called in order to load additional information
        //as soon as an issue group is expanded
        loadIssues: React.PropTypes.func.isRequired,
        //a callback which is called when some of the underlying informations changed
        //and the list should be reloaded from the server
        onChange: React.PropTypes.func.isRequired,
        //an React component which should be rendered if there are no issues to be displayed
        emptyPlaceholder: React.PropTypes.node.isRequired,
        //additional filter boxes to be displayed in the filters column
        additionalFilters: React.PropTypes.node,
    },

    render : function(){
        var props = this.props

        var issues = IssueHelpers.generateIssuesFromSnapshotSummary(
                    props.issuesSummary, props.path, props.issuesData)

        var pathIssueFilter = <div className="col-xs-12 col-sm-6 no-padding"><PathIssueFilter
                params={props.params}
                baseUrl={props.baseUrl}
                path={props.path}
                filters={props.filters}
                issuesSummary={props.issuesSummary}
                issuesData={props.issuesData} />
            </div>

        var issuesFilters = <IssuesFilters issues={issues}
                                           params={props.params}
                                           baseUrl={props.baseUrl}
                                           filters={props.filters}
                                           additionalFilters={props.additionalFilters}
                                           dropdown={false} />

        var issuesList = <IssuesList data={props.data}
                                       onChange={props.onChange}
                                       emptyPlaceholder={props.emptyPlaceholder}
                                       showFilename={true}
                                       loadFileRevisionIssues={props.loadFileRevisionIssues}
                                       issues={issues}
                                       fileViewerHref={props.fileViewerHref}
                                       IssuesGroup={props.IssuesGroup}
                                       issuesGroupProps={props.issuesGroupProps}
                                       params={props.params}
                                       issuesData={props.issuesData}
                                       baseUrl={props.baseUrl}
                                       filters={props.filters}
                                       project={props.project} />

        return  <Content params={props.params}
                        baseUrl={props.baseUrl}
                        toolbarLeftContent={pathIssueFilter}
                        sidebarContent={issuesFilters}
                        content={issuesList}
                        pil = {true} />
    },
})

export default FilteredIssueList

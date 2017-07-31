import React from "react"
import Utils from "utils"
import {A, makeUrl, redirectTo} from "routing"
import Settings from "settings"
import ProjectApi from "api/project"
import FlashMessagesService from "flash_messages"

var ProjectHeader = React.createClass({

    displayName: 'ProjectHeader',

    componentWillMount : function(){
        this.flashMessagesService = FlashMessagesService.getInstance()
        //"?reanalyze=true" is used by the email templates in order
        //to trigger a new analysis.
        var props = this.props
        if(props.params.reanalyze) {
            this.analyzeProject()
            var params = props.params
            delete params.reanalyze
            var newUrl = makeUrl(props.baseUrl, params)
            //Due to an open bug in director, redirectTo does not work within
            //the first 500ms after page load (https://github.com/flatiron/director/pull/279).
            //Hence, I am using this workaround.
            setTimeout(function() {
                redirectTo(newUrl)
            }, 600)
        }
    },

    analyzeProject : function(e){
        var props = this.props
        if(e)
            e.preventDefault()
        Utils.trackEvent('Usage', 'Repo re-analyzed')
        var onSuccess = function(data){
            this.flashMessagesService.postMessage({type : "info",
                                               description : "The project has been queued for analysis."})
            if (props.onChange)
                props.onChange()
        }.bind(this)
        ProjectApi.analyze(props.project.pk,onSuccess)
    },

    render : function(){

        var props = this.props
        var projectInfo = []
        var projectDescription = []

        if (props.project.stats !== undefined && props.project.stats.contributors !== undefined)
          projectInfo.push(<li><span className="contributors">{props.project.stats.contributors} Contributors</span></li>)


        var props = this.props
        var providers = Settings.providers['project.header.info'] || []

        providers
          .filter(function(provider) {
            return provider.component.isApplicable(props.project)
          })
          .forEach(function (provider) {
            projectInfo.push(<provider.component project={props.project} {...props}/>)
          })

        var reanalyzeButton
        var queuePosition

        queuePosition = <span>You&#39;re at position {props.project.analysis_queue_position}</span>

        if (props.project.analysis_status == 'in_progress') {
            reanalyzeButton = <A onClick={this.analyzeProject} title="Request a re-analysis of the project"><i className="fa fa-refresh fa-spin" /> Analysis in progress</A>
        } else if ((!props.project.analyze) || props.project.analysis_priority == 0) {
            reanalyzeButton = <A onClick={this.analyzeProject} title="Request an analysis of the project"><i className="octicon octicon-sync"/> Check for new commits</A>
        } else {
            reanalyzeButton = <span><i className="octicon octicon-sync" /> Project queued for analysis: <strong>{queuePosition}</strong>.</span>
        }

        var url = makeUrl("/project/"+props.data.projectId,{},props.params)
        var projectHeader = <h1 className="pull-left" itemProp="name"><A itemProp="url" href={url}>{Utils.truncate(props.project.name,40)}</A></h1>

        providers = Settings.providers['project.header.description'] || []
        providers
          .filter(function(provider) {
            return provider.component.isApplicable(props.project)
          })
          .forEach(function (provider) {
            projectDescription.push(<provider.component project={props.project} {...props}/>)
          })

        var tagList = []

        if (props.project.tags && props.project.tags.length) {
            var tags = props.project.tags
            tagList = tags.slice(0,4).map(function(tag){return <li><span className="tag">{tag}</span></li>})
            if (["admin","owner"].some(role => props.project.user_role == role)){
                if(tags.length > 4) {
                  tagList.push(<li><A href={makeUrl("/project/"+props.project.pk+"/settings?tab=basics")}>more...</A></li>)
                } else {
                  tagList.push(<li><A href={makeUrl("/project/"+props.project.pk+"/settings?tab=basics")}><i className="fa fa-pencil" /></A></li>)
                }
            }
        }

        var fetchStatus = []
        providers = Settings.providers['project.header.fetchStatus'] || []
        providers
          .filter(function(provider) {
            return provider.component.isApplicable(props.project)
          })
          .forEach(function (provider) {
            fetchStatus.push(<provider.component project={props.project} {...props}/>)
          })

        return  <div className="project-header" itemScope itemType="http://schema.org/Code">
                    <div className="row">
                        <div className="col-xs-12 col-sm-9">
                            <div className="clearfix">
                                {projectHeader}
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-3">
                            <span className="qc-badge">
                                <A href={["admin","owner"].some(role => props.project.user_role == role) ? makeUrl('/project/'+props.project.pk+'/settings',{tab : 'badges'}) : makeUrl('/project/'+props.project.pk)}><img src={"/api/v1/project/"+props.project.pk+"/badge.svg"} /></A>
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <ul className="meta">
                                {fetchStatus}{projectInfo} <li>{reanalyzeButton}</li>
                            </ul>
                            <ul className="tags hidden-xs">
                                {tagList}
                            </ul>
                        </div>
                    </div>
                    <div className="row clearfix hidden-xs">
                        <div className="col-xs-12">
                            {projectDescription}
                        </div>
                    </div>
                    {props.tabs}
                </div>
    }
})

export default ProjectHeader

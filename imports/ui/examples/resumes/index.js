import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { FlowRouter } from 'meteor/kadira:flow-router'
import _ from 'underscore'
import React from 'react'
import Paper from 'material-ui/Paper'
import Resumes from '../../../api/collections/resumes'

const propTypes = {
  resumes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

class ResumesList extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  renderNoResumes () {
    return (
      <h4>Auncun élèves.</h4>
    )
  }


  renderResumes () {
    console.log(this.props.resumes);
    return _.map(this.props.resumes, resume => {
      return (
        <Paper className="paper-inner" style={{padding: 20, marginBottom: 10}} key={resume._id}>
          <p><b>Nom:</b> {resume.nom}</p>
          <p><b>Classe:</b> {resume.classe}</p>
          <p><b>Note:</b> {resume.note}</p>
            <button
                className="button-modify"
                label='Modifier'
                onClick={() => FlowRouter.go('update', {resumeId: resume._id})}>Modifier</button>
        </Paper>
      )
    })
  }

  render () {
    return (
      <Paper style={{padding: 20}} className="paper-classe">
        <h3>Liste des élèves</h3>
        {this.props.resumes.length ? this.renderResumes() : this.renderNoResumes()}
          <button
              className="button-add"
              label='Créer'
              onClick={() => FlowRouter.go('create')}>Créer</button>
      </Paper>
    )
  }
}

ResumesList.propTypes = propTypes


export default createContainer(() => {
  Meteor.subscribe('listResumes')
  const resumes = Resumes.find().fetch()
  return { resumes }
}, ResumesList)

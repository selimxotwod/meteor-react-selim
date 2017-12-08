import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import {FlowRouter} from 'meteor/kadira:flow-router'
import React from 'react'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'

import Resumes from '../../../api/collections/resumes'

const propTypes = {
  resume: React.PropTypes.object,
  isLoading: React.PropTypes.bool
}

const defaultProps = {

}

class Update extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      saveMessage: false
    }
    this.submitForm = this.submitForm.bind(this)
    this.deleteResume = this.deleteResume.bind(this)
  }

  submitForm () {
    const inputValues = {
      nom: this.refs.nom.value,
      classe: this.refs.classe.value,
      note: this.refs.note.value
    }
    Resumes.update({_id: this.props.resume._id}, {$set: inputValues}, (error, response) => {
      if (error) {
        console.log(error)
      }

      this.setState({saveMessage: true})
    })
  }

  deleteResume () {
    Resumes.remove({_id: this.props.resume._id}, (error, response) => {
      if (error) {
        console.log(error)
      }

      FlowRouter.go('list')
    })
  }


  render () {
    return (
      <Paper style={{padding: 20, marginBottom: 10}}>
        <h1>Update Resume</h1>
        <form>
          <p>
            <b>Nom:</b>
            <input label='Nom' type='text' ref='nom' defaultValue={this.props.resume.nom} />
          </p>
          <p>
            <b>Classe:</b>
              <select ref="classe" defaultValue={this.props.resume.classe}>
                  <option value="WEB 1">WEB 1</option>
                  <option value="WEB 2">WEB 2</option>
                  <option value="WEB 3">WEB 3</option>
              </select>
          </p>
          <p>
            <b>Note:</b>
            <select ref="note" >
              <option value="na" selected>NA</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </p>
        </form>
        <button
            className="button-modify"
          label='Changer'
          onClick={this.submitForm}>Modifier</button>
        <button
            className="button-delete"
            label='Supprimer'
            onClick={this.deleteResume}>Supprimer</button>
        <button
            className="button-back"
            label='Retour'
            onClick={() => FlowRouter.go('list')}>Retour</button>
        <Snackbar
          message='Élève mis à jour!'
          open={this.state.saveMessage}
          autoHideDuration={3000} />
      </Paper>
    )
  }
}

Update.propTypes = propTypes
Update.defaultProps = defaultProps


export default createContainer(({resumeId}) => {
  const handler = Meteor.subscribe('updateResume', resumeId)
  const isLoading = !handler.ready()
  const resume = Resumes.findOne(resumeId)
  return { resume, isLoading }
}, Update)

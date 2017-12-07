import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import {FlowRouter} from 'meteor/kadira:flow-router'
import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

import Resumes from '../../../api/collections/resumes'

// Define the props (propeties/params) that this component will need/use
const propTypes = {
  resume: React.PropTypes.object,
  isLoading: React.PropTypes.bool
}

const defaultProps = {

}

// Define the component as a Class, extending React.Component
class Update extends React.Component {

  // Class constructor
  constructor (props) {
    super(props)
    // Set the components initial state
    this.state = {
      saveMessage: false
    }
    // Bind "this" object (reference to the component itself) to the components methods
    this.submitForm = this.submitForm.bind(this)
    this.deleteResume = this.deleteResume.bind(this)
  }

  // Define methods for this class
  submitForm () {
    // Here we do a "direct update" from the client instead of using a method
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


  // The render method is the only required one. It must return classic DOM hierachy
  render () {
    // If the prop "resume" is not loaded yet, we can show a Loading component for example
    if (this.props.isLoading) return (<div>Loading...</div>)
    return (
      // We are using Material-ui components: http://www.material-ui.com/
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
            <textarea label='note' ref='note' rows='5' cols='50' defaultValue={this.props.resume.note}></textarea>
          </p>
        </form>
        <button
          label='Changer'
          onClick={this.submitForm}>Update</button>
        <RaisedButton
          style={{marginLeft: 20}}
          secondary
          label='Supprimer'
          onClick={this.deleteResume} />
        <RaisedButton
          style={{marginLeft: 20}}
          label='Retour'
          onClick={() => FlowRouter.go('list')} />

        <Snackbar
          message='Resume updated successfully!'
          open={this.state.saveMessage}
          autoHideDuration={3000} />
      </Paper>
    )
  }
}

Update.propTypes = propTypes
Update.defaultProps = defaultProps

// El componente Update es "inteligente", usamos la función 'createContainer' para
// obtener los datos desde el server. Nos suscribimos a las publicaciones necesarias,
// hacemos querys y retornamos.
// La función inyecta los datos como 'props' al componente Update
export default createContainer(({resumeId}) => {
  const handler = Meteor.subscribe('updateResume', resumeId)
  const isLoading = !handler.ready() // Returns a boolean
  const resume = Resumes.findOne(resumeId)
  return { resume, isLoading }
}, Update)

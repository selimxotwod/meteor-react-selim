/**
 * Compenent for creating a new Resume
 */

import { Meteor } from 'meteor/meteor'
import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

export default class Create extends React.Component {

  constructor (props) {
    super(props)
    /**
     * The state object is used to keep track of the component state.
     * On state you can save anything. Use it to register event changes, etc.
     */
    this.state = {
      // saveMessage will be used to display a material-ui Snackbar component
      saveMessage: false
    }
    /**
     * We pass this component as "this" to the submitForm method so that the method
    * can access the component properties and other methods
     */
    this.submitForm = this.submitForm.bind(this)
  }

  submitForm () {
    /**
     * We call a method to save the new Resume to de DB. We could also just
     * call the "collection.insert" method directly here.
     */
    const inputValues = {
      nom: this.refs.nom.value,
      classe: this.refs.classe.value,
      note: this.refs.note.value
    }
    Meteor.call('createResume', inputValues, (error, response) => {
      if (error) {
        console.log(error)
      }

      // Update the saveMessage key on the components state object, to show the Snackbar
      this.setState({saveMessage: true})
    })
  }

  render () {
    return (
      <Paper style={{padding: 20}}>
        <h1>Create Resume</h1>
        <form>
          <p><b>Nom:</b> <input label='Nom' type='text' ref='nom' /></p>
          <p><b>Classe:</b>
            <select ref="classe" >
                <option value="WEB 1" selected>WEB 1</option>
                <option value="WEB 2">WEB 2</option>
                <option value="WEB 3">WEB 3</option>
            </select>
          </p>
          <p><b>Note:</b> <textarea label='note' ref='note' rows='5' cols='50'></textarea></p>
        </form>
        <RaisedButton
          primary
          label='guardar'
          onClick={this.submitForm} />
        <RaisedButton
          style={{marginLeft: 20}}
          secondary
          label='volver'
          onClick={() => FlowRouter.go('list')} />

        <Snackbar
          message='Resume created successfully!'
          open={this.state.saveMessage}
          autoHideDuration={3000} />
      </Paper>
    )
  }

}

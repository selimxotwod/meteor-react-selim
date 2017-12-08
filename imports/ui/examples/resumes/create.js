import { Meteor } from 'meteor/meteor'
import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'

export default class Create extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      saveMessage: false
    }
    this.submitForm = this.submitForm.bind(this)
  }

  submitForm () {
    const inputValues = {
      nom: this.refs.nom.value,
      classe: this.refs.classe.value,
      note: this.refs.note.value
    }
    Meteor.call('createResume', inputValues, (error, response) => {
      if (error) {
        console.log(error)
      }

      this.setState({saveMessage: true})
    })
  }

  render () {
    return (
      <Paper style={{padding: 20}}>
        <h1>Ajouter un élève</h1>
        <form>
          <p><b>Nom:</b> <input label='Nom' type='text' ref='nom' /></p>
          <p><b>Classe:</b>
            <select ref="classe" >
                <option value="WEB 1" selected>WEB 1</option>
                <option value="WEB 2">WEB 2</option>
                <option value="WEB 3">WEB 3</option>
            </select>
          </p>
          <p><b>Note:</b>
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
              className="button-add"
              label='Créer'
              onClick={this.submitForm}>Créer</button>
          <button
              className="button-back"
              label='Retour'
              onClick={() => FlowRouter.go('list')} >Retour</button>

        <Snackbar
          message='Élève ajouté !'
          open={this.state.saveMessage}
          autoHideDuration={3000} />
      </Paper>
    )
  }

}

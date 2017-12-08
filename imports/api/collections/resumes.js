import {Meteor} from 'meteor/meteor'

const Resumes = new Meteor.Collection('resumes')

Resumes.attachSchema({
  nom: {
    type: String,
    label: 'Nom',
    optional: true
  },
  classe: {
    type: String,
    label: 'Classe',
    optional: true
  },
  note: {
    type: String,
    label: 'Note',
    optional: true
  }
})

export default Resumes

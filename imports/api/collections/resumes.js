import {Meteor} from 'meteor/meteor'

// Define a colection using Meteor wrapper for Mongo collections
const Resumes = new Meteor.Collection('resumes')

/** Assign a schema for the model using for validation using SimpleSchema:
 *  https://github.com/aldeed/meteor-simple-schema
 */
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

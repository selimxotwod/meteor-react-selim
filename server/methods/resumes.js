import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Resumes from '../../imports/api/collections/resumes'

Meteor.methods({
  'createResume': function ({nom, classe, note}) {
    check(nom, String)
    check(classe, String)
    check(note, String)

    return Resumes.insert({nom, classe, note})
  }
})

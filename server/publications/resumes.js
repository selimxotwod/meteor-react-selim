import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Resumes from '../../imports/api/collections/resumes'


Meteor.publishComposite('listResumes', function () {
  /**
   * You should check the clients permission and grant access if appropiate
   * Package recomendation for Roles management: https://github.com/nicolaslopezj/roles
   */
  return {
    find: function () {
      return Resumes.find()
    },
    children: [
      {
        find: function (resume) {
          return References.find({ resumeId: resume._id })
        }
      }
    ]
  }
})

// This publication return a Resume document given its id
Meteor.publishComposite('updateResume', function (resumeId) {
  check(resumeId, String)
  /**
   * You should check the clients permission and grant access if appropiate
   * Package recomendation for Roles management: https://github.com/nicolaslopezj/roles
   */
  return {
    find: function () {
      return Resumes.find(resumeId)
    },
    children: [
      {
        find: function (resume) {
          return References.find(resume._id)
        }
      }
    ]
  }
})

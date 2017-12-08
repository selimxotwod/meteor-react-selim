import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import {mount} from 'react-mounter'

import Layout from './layout'
import ResumesList from './index'
import Update from './update'
import Create from './create'

FlowRouter.route('/resumes', {
  name: 'list',
  action () {
    mount(Layout, {
      content () {
        return <ResumesList />
      }
    })
  }
})

FlowRouter.route('/resumes/create', {
  name: 'create',
  action () {
    mount(Layout, {
      content () {
        return <Create />
      }
    })
  }
})

FlowRouter.route('/resumes/:resumeId', {
  name: 'update',
  action ({resumeId}) {
    mount(Layout, {
      content () {
        return <Update resumeId={resumeId} />
      }
    })
  }
})


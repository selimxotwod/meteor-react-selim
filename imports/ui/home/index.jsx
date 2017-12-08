import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'

export default class Home extends React.Component {
  render () {
    return (
      <div className="home-div">
        <h3>Catalogue d'élèves en WEB</h3>
          <a href={FlowRouter.path('list')} className="link-home">
              Voir les élèves
          </a>
      </div>
    )
  }
}

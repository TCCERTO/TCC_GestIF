import Page from '~layouts/main_inicio'
import Head from '~components/head_inicio'
import React from 'react'
import Auth from '~utils/AuthService'

import { Component } from 'react'
import TableListaUploadsMonitores from '~components/monitores/TableListaUploadsMonitores'

export default class Monitorias extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploads: []
    }
  }

  componentDidMount() {
    Auth.fetch('/api/uploads/listas').then(data => {
      this.setState({ uploads: data })
    })
  }
  render() {
    return (
      <Page>
        <Head title="GestIF | Monitorias">
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          />
          <link rel="stylesheet" type="text/css" href="static/css/pae.css" />
        </Head>
        <div class="pusher">
          <div class="ui inverted vertical masthead center aligned segment">
            <div class="ui container">
              <div class="ui large secondary inverted pointing menu stackable">
                <a class="item" href="/inicio">
                  Início
                </a>
                <a class="item" href="/cotp/monitorias">
                  Monitorias
                </a>
                <a class="item" href="/cotp/pae">
                  PAE
                </a>
                <a class="item" href="/csti/reportar">
                  Report à CSTI
                </a>
                <a class="active item" href="/monitor/listas">
                  Listas de Exercícios
                </a>
                <div class="right item">
                  <a class="ui inverted button" href="/login">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pusher">
          <div class="ui inverted vertical masthead center aligned segment">
            <h1
              class="ui inverted header"
              style={{ fontSize: 35, marginTop: 20 }}
            >
              Listas de Exercícios
            </h1>
            <br />
            <br />
            <center style={{ marginBottom: 250 }}>
              <TableListaUploadsMonitores uploads={this.state.uploads} />
            </center>
          </div>
        </div>
      </Page>
    )
  }
}

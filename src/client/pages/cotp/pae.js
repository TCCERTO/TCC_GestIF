import Page from '~layouts/main_inicio'
import Head from '~components/head_inicio'
import Router from 'next/router'
import Auth from '~utils/AuthService'
import React, { Component } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'

import ModalShowNot from '~components/cotp/ModalShowNot'
import ListaNot from '~components/cotp/ListaNot'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      enviado: false,
      success: false,
      form: {},
      urls: [],
      nots: [],
      uploads: [],
      not: {}
    }
  }

  notChange(titulo, conteudo) {
    this.setState({
      success: true,
      not: { titulo, conteudo }
    })
    //console.log(id, name)
  }

  handleClose() {
    this.setState({ success: false })
  }

  componentDidMount() {
    Auth.fetch('/api/pae/').then(data => {
      this.setState({ urls: data })
    })
    Auth.fetch('/api/paeNot/nots').then(data => {
      this.setState({ nots: data })
    })
    Auth.fetch('/api/uploads/paeU').then(data => {
      this.setState({ uploads: data })
    })
  }

  render() {
    return (
      <Page>
        <Head title="GestIF | PAE">
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          />
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
                <a class="active item" href="/cotp/pae">
                  PAE
                </a>
                <a class="item" href="/csti/reportar">
                  Report à CSTI
                </a>
                <a class="item" href="/monitor/listas">
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
              Programa de Assistência Estudantil
            </h1>
            {/*<p>{this.state.urls.length}</p>
            <p>{this.state.nots.length}</p>*/}
            <br />
            <br />
            <div class="ui inverted segment">
              <div class="ui two column very relaxed grid">
                <div class="column">
                  <h2>Editais:</h2>
                  {this.state.urls.map(url => {
                    return (
                      <a
                        class="big ui inverted green basic button"
                        href={url.url}
                        target="a"
                      >
                        {url.titulo}
                      </a>
                    )
                  })}
                </div>
                <div class="column">
                  <h2>Notícias:</h2>
                  <ListaNot
                    nots={this.state.nots}
                    notChange={this.notChange.bind(this)}
                  />
                </div>
              </div>
              {/*<div class="ui vertical divider">
                and
              </div>*/}
            </div>
            <br />
            <center>
              <h2>Uploads:</h2>
              <div style={{ width: 900, background: 'white' }}>
                <Table
                  celled
                  selectable
                  striped
                  singleLine
                  attached
                  striped
                  basic="very"
                  style={{ marginBottom: 200 }}
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.Cell
                        style={{ backgroundColor: 'black', color: 'white' }}
                      >
                        <b>Uploads</b>
                      </Table.Cell>
                      <Table.Cell
                        style={{ backgroundColor: 'black', color: 'white' }}
                      >
                        {/*<b>Download</b>*/}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.state.uploads.map(user => {
                      return (
                        <Table.Row key={user._id}>
                          <Table.Cell>
                            {/*<img src='image/?user'/>*/}
                            <a
                              href={'/api/uploads/' + user.filename}
                              target="_blank"
                            >
                              {user.filename}
                            </a>
                          </Table.Cell>
                          <Table.Cell collapsing>
                            <a href={'/api/uploads/downloads/' + user.filename}>
                              <Icon name="cloud download" />
                            </a>
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
              </div>
            </center>
            <ModalShowNot
              open={this.state.success}
              handleClose={this.handleClose.bind(this)}
              data={this.state.not}
            />
          </div>
        </div>
      </Page>
    )
  }
}

export default Home

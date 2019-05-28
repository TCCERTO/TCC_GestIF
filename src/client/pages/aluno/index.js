import Page from '~layouts/main'
import Head from '~components/head'
import Auth from '~utils/AuthService'
import React, { Component } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import ModalShowFile from '~components/ModalShowFile'

import Checkbox from './checkbox'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      uploads: [],
      data: {},
      success: false
    }
  }
  componentDidMount() {
    Auth.fetch('/api/users/me').then(data => {
      this.setState({ user: data })
    })
    Auth.fetch('/api/uploads/').then(data => {
      this.setState({ uploads: data })
    })
  }
  onSubmit(e) {
    this.setState({
      success: true,
      data: e
    })
  }
  handleClose() {
    this.setState({ success: false, deletaUser: false, userToDelete: {} })
  }
  render() {
    return (
      <Page>
        <Head title="Alunos - GestIF" />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              {this.state.user.name} <small>Alunos em dependência</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard" /> Início
                </a>
              </li>
            </ol>
          </section>
          <section className="content">
            <br />
            <h2>
              Sua dependência: <small>{this.state.user.disciplina}</small>
            </h2>
            <br />
            {Checkbox}
            <br />
            <Table
              celled
              selectable
              striped
              singleLine
              attached
              striped
              basic="very"
            >
              <Table.Header>
                <Table.Row>
                  <Table.Cell
                    style={{ backgroundColor: 'black', color: 'white' }}
                  >
                    <b>Atividades</b>
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
                        <a href="#a" onClick={this.onSubmit.bind(this)}>
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
            <br />
            <br />
            <br />
          </section>
          <ModalShowFile
            open={this.state.success}
            handleClose={this.handleClose.bind(this)}
            data={this.state.data}
          />
        </div>
      </Page>
    )
  }
}

export default Home

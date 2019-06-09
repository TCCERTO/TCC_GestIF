import Page from '~layouts/main'
import Head from '~components/head'
import Auth from '~utils/AuthService'
import React, { Component } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'

import FormReservaAulas from '~components/alunos/FormReservaAulas'
import ModalSuccessAulas from '~components/alunos/ModalSuccessAulas'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      uploads: [],
      data: {},
      success: false,
      aulas: [],
      successa: false,
      aula: {}
    }
  }
  componentDidMount() {
    Auth.fetch('/api/users/me').then(data => {
      this.setState({ user: data })
      Auth.fetch('/api/uploads/a/a/' + data.disciplina).then(data => {
        this.setState({ uploads: data })
      })
      Auth.fetch('/api/users/aulas/' + data.disciplina).then(data => {
        this.setState({ aulas: data })
      })
    })
  }
  onSubmit(e) {
    this.setState({
      success: true,
      data: e
    })
  }

  onClick(filename) {
    Auth.fetch('/api/users/atividades', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.user.name,
        atividade: filename
      })
    }).then(res => {
      this.setState({ enviado: true })
    })
  }

  aulaChange(reserva, professor, disciplina) {
    this.setState({
      successa: true,
      aula: { reserva, professor, disciplina }
    })
  }

  handleClose() {
    this.setState({
      success: false,
      deletaUser: false,
      userToDelete: {},
      successa: false
    })
  }

  handleConfirm() {
    const { reserva, professor, disciplina } = this.state.aula
    Auth.fetch('/api/reservasAulas/aulasCad', {
      method: 'POST',
      body: JSON.stringify({
        aluno: this.state.user.name,
        reserva: reserva,
        professor: professor,
        disciplina: disciplina
      })
    }).then(res => {
      this.setState({ successa: false, aula: {} })
    })
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
            <h2>
              Sua dependência: <small>{this.state.user.disciplina}</small>
            </h2>
            <br />
            <div className="row">
              <div className="col-md-5">
                <div className="box box-info">
                  <div className="box-body">
                    <Table
                      celled
                      selectable
                      striped
                      singleLine
                      attached
                      basic="very"
                    >
                      <Table.Header>
                        <Table.Row>
                          <Table.Cell>
                            <b>Professores de {this.state.user.disciplina}</b>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {this.state.aulas.map(user => {
                          return (
                            <Table.Row key={user._id}>
                              <Table.Cell>{user.name}</Table.Cell>
                              <Table.Cell>{user.email}</Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="box box-primary">
                  <div className="box-body">
                    <FormReservaAulas
                      aulas={this.state.aulas}
                      aulaChange={this.aulaChange.bind(this)}
                    />
                  </div>
                </div>

                <ModalSuccessAulas
                  open={this.state.successa}
                  handleClose={this.handleClose.bind(this)}
                  handleConfirm={this.handleConfirm.bind(this)}
                  aula={this.state.aula}
                />
              </div>
            </div>
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
                        <a
                          href={
                            '/api/uploads/' +
                            this.state.user.name +
                            '/alunos/' +
                            user.filename
                          }
                          target="_blank" /*onClick={this.onClick(user.filename)}*/
                        >
                          {user.filename}
                        </a>
                      </Table.Cell>
                      <Table.Cell collapsing>
                        <a
                          href={
                            '/api/uploads/downloads/aluno/a/' +
                            this.state.user.name +
                            '/' +
                            user.filename
                          }
                        >
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
        </div>
      </Page>
    )
  }
}

export default Home

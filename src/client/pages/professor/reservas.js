import React, { Component } from 'react'
import Auth from '~utils/AuthService'
import filter from 'lodash/filter'
import { Tab, Message } from 'semantic-ui-react'

import Page from '~layouts/main'
import Head from '~components/head'

import TablePendentes from '~components/professores/TablePendentes'
import TableHistorico from '~components/professores/TableHistorico'

export default class Reservas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      reservas: [],
      todos: []
    }
  }
  componentDidMount() {
    Auth.fetch('/api/users/me').then(data => {
      this.setState({ user: data })
      Auth.fetch(
        '/api/reservasAulas/reservasS/' + data.disciplina + '/' + data.name
      ).then(reservas => {
        this.setState({
          reservas: reservas.filter(r => r.status === 0)
        })
      })
      Auth.fetch(
        '/api/reservasAulas/reservasA/' + data.disciplina + '/' + data.name
      ).then(reservas => {
        this.setState({
          todos: reservas
        })
      })
    })
  }
  aplicada(id) {
    Auth.fetch('/api/reservasAulas/aplica', {
      method: 'POST',
      body: JSON.stringify({
        id: id
      })
    }).then(reservas => {
      const newState = filter(this.state.reservas, item => item._id !== id)
      this.setState({ reservas: newState })
    })
  }
  render() {
    const tabs = [
      {
        menuItem: 'Ativos',
        render: () => {
          if (this.state.reservas.length === 0)
            return (
              <center>
                <Message success style={{ marginTop: '10px' }}>
                  Nenhum reserva pendente!
                </Message>
              </center>
            )
          return (
            <TablePendentes
              reservas={this.state.reservas}
              aplicada={this.aplicada.bind(this)}
            />
          )
        }
      },
      {
        menuItem: 'Histórico',
        render: () => (
          <TableHistorico
            reservas={this.state.todos}
            aplicada={this.aplicada.bind(this)}
          />
        )
      }
    ]
    return (
      <Page>
        <Head title="Reservas de Monitorias | GestIF" />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Reservas
              <small>Relatórios de reservas de aulas</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="/">
                  <i className="fa fa-dashboard" /> Iní­cio
                </a>
              </li>
              <li>
                <a href="/monitor/reservas">Reservas</a>
              </li>
            </ol>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box box-info">
                  <div className="box-body">
                    <Tab panes={tabs} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Page>
    )
  }
}

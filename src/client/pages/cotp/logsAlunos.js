import React, { Component } from 'react'
import Auth from '~utils/AuthService'

import Page from '~layouts/main'
import Head from '~components/head'

import TableLogs from '~components/csti/TableLogs'

export default class Reports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: []
    }
  }
  componentDidMount() {
    Auth.fetch('/api/logsAlunos').then(logs => {
      this.setState({
        logs
      })
    })
    if (this.state.logs.length === 0) {
      Auth.fetch('/api/logsAlunos/p').then(logs => {
        this.setState({
          logs
        })
      })
    }
  }
  render() {
    return (
      <Page>
        <Head title="Logs de Alunos | GestIF" />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Logs dos Alunos
              <small>Logs das interações de alunos com o sistema</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="/">
                  <i className="fa fa-dashboard" /> Iní­cio
                </a>
              </li>
              <li>
                <a href="/cotp/orientacao_pedagogica/dependencias/logsAlunos">
                  Logs de Alunos
                </a>
              </li>
            </ol>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box box-info">
                  <div className="box-body">
                    <TableLogs logs={this.state.logs} />
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

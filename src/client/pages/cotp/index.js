import Page from '~layouts/main'
import Head from '~components/head'
import Auth from '~utils/AuthService'

import React, { Component } from 'react'
import Link from 'next/link'

export default class COTP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      professorList: [],
      stats: {},
      statsP: {},
      count: [],
      byMe: []
    }
  }

  componentDidMount() {
    Auth.fetch('/api/logsAlunos/stats').then(data => {
      this.setState({ stats: data })
    })
    Auth.fetch('/api/logsProfessores/statsP').then(data => {
      this.setState({ statsP: data })
    })
    Auth.fetch('/api/logsAlunos/count').then(data => {
      this.setState({ count: data })
    })
    Auth.fetch('/api/logsAlunos/count/me').then(data => {
      this.setState({ byMe: data })
    })
    Auth.fetch('/api/users/alunosFind?limit=5')
      .then(data => {
        this.setState({ userList: data })
      })
      .catch(err => {
        console.log(err)
      })
    Auth.fetch('/api/users/professoresFind?limit=10')
      .then(data => {
        this.setState({ professorList: data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Page>
        <Head title="GestIF" />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Início <small>Início do painel de controle</small>
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
            <h1>COTP</h1>
            <div className="row">
              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-yellow">
                  <div className="inner">
                    <h3>{this.state.stats.numLogsAlunos}</h3>
                    <p>Logs de alunos</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-clipboard"
                      style={{ paddingTop: '20px', fontSize: '80px' }}
                    />
                  </div>
                  <Link href="/cotp/logsAlunos">
                    <a className="small-box-footer">
                      Ir para logs de Alunos{' '}
                      <i className="fa fa-arrow-circle-right" />
                    </a>
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-red">
                  <div className="inner">
                    <h3>{this.state.stats.maisDeUmaSemana}</h3>
                    <p>Atividades acessadas</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-times"
                      style={{ paddingTop: '20px', fontSize: '80px' }}
                    />
                  </div>
                  <Link href="/csti/reports">
                    <a className="small-box-footer">
                      Ir para reports <i className="fa fa-arrow-circle-right" />
                    </a>
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-aqua">
                  <div className="inner">
                    <h3>{this.state.statsP.numLogsProfessores}</h3>
                    <p>Logs de Professores</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-check"
                      style={{ paddingTop: '20px', fontSize: '80px' }}
                    />
                  </div>
                  <Link href="/cotp/logsProfessores">
                    <a className="small-box-footer">
                      Ir para logs de Professores{' '}
                      <i className="fa fa-arrow-circle-right" />
                    </a>
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-green">
                  <div className="inner">
                    <h3>{this.state.stats.numTotal}</h3>
                    <p>...</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-chart-bar"
                      style={{ paddingTop: '20px', fontSize: '80px' }}
                    />
                  </div>
                  <Link href="/csti/reports">
                    <a className="small-box-footer">
                      Ir para reports <i className="fa fa-arrow-circle-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div class="ui buttons">
              <button class="ui button">
                <h3>Dependências</h3>
              </button>
              <button class="ui button">
                <h3>Monitorias</h3>
              </button>
            </div>
            <br />
            <br />

            <br />
          </section>
        </div>
      </Page>
    )
  }
}

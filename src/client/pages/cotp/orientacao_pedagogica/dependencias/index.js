import Page from '~layouts/main'
import Head from '~components/head'
import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'
import TableListaAlunosSimp from '~components/cotp/TableListaAlunosSimp'
import TableListaProfessoresSimp from '~components/cotp/TableListaProfessoresSimp'

import Link from 'next/link'
import Auth from '~utils/AuthService'
import ChartAlunos from '~components/cotp/ChartAlunos'

export default class Dependencias extends Component {
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
    Auth.fetch('/api/users/alunosFind?limit=4')
      .then(data => {
        this.setState({ userList: data })
      })
      .catch(err => {
        console.log(err)
      })
    Auth.fetch('/api/users/professoresFind?limit=4')
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
        <Head title="Dependências - GestIF" />

        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Dependências <small>Orientação Pedagógica</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="/">
                  <i className="fa fa-dashboard" /> Início
                </a>
              </li>
              <li>
                <a href="/cotp/orientacao_pedagogica/dependencias">
                  <i className="fa fa-dashboard" /> Dependências
                </a>
              </li>
            </ol>
          </section>
          <section className="content">
            <br />
            <div className="row">
              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-green">
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
                <div className="small-box bg-aqua">
                  <div className="inner">
                    <h3>{this.state.stats.maisDeUmaSemana}</h3>
                    <p>Atividades acessadas</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-check"
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
                <div className="small-box bg-red">
                  <div className="inner">
                    <h3>{this.state.statsP.numLogsProfessores}</h3>
                    <p>Logs de Professores</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-times"
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
                <div className="small-box bg-yellow">
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

            <div className="row">
              <div className="col-md-6">
                <div className="box box-success">
                  <div className="box-header with-border">
                    <h3 className="box-title">Alunos Cadastrados</h3>
                  </div>
                  <div className="box-body">
                    <TableListaAlunosSimp alunos={this.state.userList} />
                    <Link href="dependencias/alunos">
                      <a>
                        <Button secondary fluid style={{ marginTop: '10px' }}>
                          Ver todos os alunos cadastrados
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
                <br />
              </div>
              <div className="col-md-6">
                <div className="box box-info">
                  <div className="box-header with-border">
                    <h3 className="box-title">Gráfico de acesso de alunos</h3>
                  </div>
                  <div className="box-body">
                    <div className="chart">
                      {this.state.count && (
                        <ChartAlunos
                          data={{
                            total: this.state.count,
                            byMe: this.state.byMe
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="box box-success">
                  <div className="box-header with-border">
                    <h3 className="box-title">Professores Cadastrados</h3>
                  </div>
                  <div className="box-body">
                    <TableListaProfessoresSimp
                      users={this.state.professorList}
                    />
                    <Link href="dependencias/professores">
                      <a>
                        <Button secondary fluid style={{ marginTop: '10px' }}>
                          Ver todos os professores cadastrados
                        </Button>
                      </a>
                    </Link>
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

import Page from '~layouts/main'
import Head from '~components/head'
import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'
import TableListaAlunosSimp from '~components/cotp/TableListaAlunosSimp'
import TableListaProfessoresSimp from '~components/cotp/TableListaProfessoresSimp'

import Link from 'next/link'
import Auth from '~utils/AuthService'
import ChartAlunos from '~components/cotp/ChartAlunos'

import TableListaUploads from '~components/TableListaUploads'
import ModalDeletaUpload from '~components/ModalDeletaUpload'

export default class Dependencias extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      professorList: [],
      stats: {},
      statsP: {},
      count: [],
      numA: [],
      statsM: [],
      statsA: [],
      uploads: [],
      deletaUpload: false,
      uploadToDelete: {}
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
    Auth.fetch('/api/atividadesAcessadas/count/me').then(data => {
      this.setState({ numA: data })
    })
    Auth.fetch('/api/logsMonitores/statsM').then(data => {
      this.setState({ statsM: data })
    })
    Auth.fetch('/api/atividadesAcessadas/statsA').then(data => {
      this.setState({ statsA: data })
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
    Auth.fetch('/api/uploads/profs').then(data => {
      this.setState({ uploads: data })
    })
  }

  deleteUpload(id, filename) {
    this.setState({ deletaUpload: true, uploadToDelete: { id, filename } })
  }
  confirmDeleteUpload() {
    this.setState({ deletaUpload: false, uploadToDelete: {} })
    const { id } = this.state.uploadToDelete
    Auth.fetch('/api/uploads/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id })
    }).then(data => {
      console.log('Success', data)
    })
    this.setState({
      uploads: this.state.uploads.filter(
        u => u._id !== this.state.uploadToDelete.id
      )
    })
  }

  handleClose() {
    this.setState({ deletaUpload: false, uploadToDelete: {} })
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
                      className="fa fa-address-card"
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
                <div className="small-box bg-purple">
                  <div className="inner">
                    <h3>{this.state.statsA.numAtividadesAcessadas}</h3>
                    <p>Atividades acessadas</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-file"
                      style={{ paddingTop: '20px', fontSize: '80px' }}
                    />
                  </div>
                  <Link href="/cotp/atividadesAcessadas">
                    <a className="small-box-footer">
                      Ir para Atividades Acessadas{' '}
                      <i className="fa fa-arrow-circle-right" />
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
                      className="fa fa-user"
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
                <div className="small-box bg-orange">
                  <div className="inner">
                    <h3>{this.state.statsM.numLogsMonitores}</h3>
                    <p>Logs de Monitores</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-user"
                      style={{ paddingTop: '20px', fontSize: '80px' }}
                    />
                  </div>
                  <Link href="/cotp/logsMonitores">
                    <a className="small-box-footer">
                      Ir para logs de Monitores{' '}
                      <i className="fa fa-arrow-circle-right" />
                    </a>
                  </Link>
                </div>
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
                            numA: this.state.numA
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
            <div className="row">
              <div
                className="box box-primary"
                style={{ marginLeft: 10, width: 1100 }}
              >
                <div className="box-header">
                  <h3>Uploads de Professores</h3>
                </div>
                <div className="box-body">
                  <TableListaUploads
                    uploads={this.state.uploads}
                    deleteUpload={this.deleteUpload.bind(this)}
                  />
                </div>
              </div>
              <ModalDeletaUpload
                open={this.state.deletaUpload}
                handleClose={this.handleClose.bind(this)}
                handleConfirm={this.confirmDeleteUpload.bind(this)}
                uploadToDelete={this.state.uploadToDelete}
              />
            </div>
          </section>
        </div>
      </Page>
    )
  }
}

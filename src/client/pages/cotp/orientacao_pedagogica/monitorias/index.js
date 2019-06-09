import Page from '~layouts/main'
import Head from '~components/head'
import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'
import TableListaMonitoresSimp from '~components/cotp/TableListaMonitoresSimp'
import TableListaUploads from '~components/TableListaUploads'
import ModalDeletaUpload from '~components/ModalDeletaUpload'

import Link from 'next/link'
import Auth from '~utils/AuthService'
import ChartAlunos from '~components/cotp/ChartAlunos'

export default class Monitorias extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statsM: [],
      userList: [],
      uploads: [],
      deletaUpload: false,
      uploadToDelete: {},
      stats: {},
      reservasS: [],
      reservasA: []
    }
  }

  componentDidMount() {
    Auth.fetch('/api/logsMonitores/statsM').then(data => {
      this.setState({ statsM: data })
    })
    Auth.fetch('/api/users/monitoresFind').then(data => {
      this.setState({ userList: data })
    })
    Auth.fetch('/api/uploads/monitores').then(data => {
      this.setState({ uploads: data })
    })
    Auth.fetch('/api/logsAlunos/stats').then(data => {
      this.setState({ stats: data })
    })
    Auth.fetch('/api/reservas/S/').then(data2 => {
      this.setState({ reservasS: data2 })
    })
    Auth.fetch('/api/reservas/A/').then(data3 => {
      this.setState({ reservasA: data3 })
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
        <Head title="Monitorias - GestIF" />

        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Monitorias <small>Orientação Pedagógica</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="/">
                  <i className="fa fa-dashboard" /> Início
                </a>
              </li>
              <li>
                <a href="/cotp/orientacao_pedagogica/monitorias">
                  <i className="fa fa-dashboard" /> Monitorias
                </a>
              </li>
            </ol>
          </section>
          <section className="content">
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
                <div className="small-box bg-aqua">
                  <div className="inner">
                    <h3>{this.state.reservasS.length}</h3>
                    <p>Novas Reservas</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-file"
                      style={{ paddingTop: '20px', fontSize: '80px' }}
                    />
                  </div>
                  <Link href="./monitorias/reservas">
                    <a className="small-box-footer">
                      Ir para novas reservas{' '}
                      <i className="fa fa-arrow-circle-right" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
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
                <div className="small-box bg-red">
                  <div className="inner">
                    <h3>{this.state.reservasA.length}</h3>
                    <p>Reservas Aplicadas</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-book"
                      style={{ paddingTop: '20px', fontSize: '80px' }}
                    />
                  </div>
                  <Link href="./monitorias/reservas">
                    <a className="small-box-footer">
                      Ir para reservas atendidas{' '}
                      <i className="fa fa-arrow-circle-right" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="box box-success">
                  <div className="box-header with-border">
                    <h3 className="box-title">Monitores Cadastrados</h3>
                  </div>
                  <div className="box-body">
                    <TableListaMonitoresSimp users={this.state.userList} />
                    <Link href="monitorias/monitores">
                      <a>
                        <Button secondary fluid style={{ marginTop: '10px' }}>
                          Ver todos os monitores cadastrados
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
                <br />
              </div>
            </div>
            <div className="row">
              <div
                className="box box-primary"
                style={{ marginLeft: 10, width: 1100 }}
              >
                <div className="box-header">
                  <h3>Uploads de Monitores</h3>
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

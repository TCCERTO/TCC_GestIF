import Page from '~layouts/main'
import Head from '~components/head'
import Auth from '~utils/AuthService'
import React, { Component } from 'react'
import Link from 'next/link'

import {
  Form,
  Button,
  Modal,
  Header,
  Icon,
  Message,
  Dropdown,
  Table
} from 'semantic-ui-react'

import FormAddDia from '~components/monitores/FormAddDia'
import TableListaDias from '~components/monitores/TableListaDias'
import ModalSuccessMonitoria from '~components/monitores/ModalSuccessMonitoria'
import ModalDeletaMonitoria from '~components/monitores/ModalDeletaMonitoria'
import TableListaUploads from '~components/TableListaUploads'
import ModalDeletaUpload from '~components/ModalDeletaUpload'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      success: false,
      created: false,
      deletamonitoria: false,
      data: {},
      monitoriaList: [],
      monitoriaToDelete: {},
      reservas: [],
      reservasA: [],
      uploads: [],
      uploadToDelete: {},
      deletaUpload: false
    }
  }
  componentDidMount() {
    Auth.fetch('/api/users/me1').then(data => {
      this.setState({ monitoriaList: data })
    })
    Auth.fetch('/api/users/me').then(data => {
      this.setState({ user: data })
      Auth.fetch(
        '/api/reservas/reservasS/' + data.disciplina + '/' + data.name
      ).then(data2 => {
        this.setState({ reservas: data2 })
      })
      Auth.fetch(
        '/api/reservas/reservasA/' + data.disciplina + '/' + data.name
      ).then(data3 => {
        this.setState({ reservasA: data3 })
      })
      Auth.fetch(
        '/api/uploads/me/' +
          data.disciplina +
          '/' +
          data.roles +
          '/' +
          data.name
      ).then(data => {})
      Auth.fetch(
        '/api/uploads/m/p/' +
          data.disciplina +
          '/' +
          data.roles +
          '/' +
          data.name
      ).then(data => {
        this.setState({ uploads: data })
      })
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
  deletemonitoria(monitoria) {
    this.setState({ deletamonitoria: true, monitoriaToDelete: { monitoria } })
  }
  confirmDeleteMonitoria() {
    Auth.fetch('/api/users/monitoriaDel', {
      method: 'DELETE',
      body: JSON.stringify(this.state.monitoriaToDelete)
    })
    this.setState({
      monitoriaList: this.state.monitoriaList.filter(
        u => u !== this.state.monitoriaToDelete.monitoria
      ),
      deletamonitoria: false,
      monitoriaToDelete: {}
    })
  }
  onSubmit(e) {
    this.setState({
      success: true,
      data: e
    })
  }

  handleClose() {
    this.setState({
      success: false,
      deletamonitoria: false,
      edit: false,
      monitoriaToDelete: {},
      deletaUpload: false
    })
  }
  handleConfirm() {
    //alert(JSON.stringify(this.state.data))
    this.setState({
      monitoriaList: [
        ...this.state.monitoriaList,
        { ...this.state.data, joined: 'Agora mesmo', _id: Date.now() }
      ]
    })
    Auth.fetch('/api/users/monitoriaCad', {
      method: 'POST',
      body: JSON.stringify(this.state.data)
    }).then(() => {
      //TODO: Lidar com erros vindos do backend (email em uso, etc)
      this.setState({ success: false, created: true })
    })
  }

  upload() {
    Auth.fetch('/api/uploads/upload')
  }
  render() {
    return (
      <Page>
        <Head title="Monitor - GestIF" />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              {this.state.user.name} <small>Página inicial</small>
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
            <div className="row">
              <div className="col-md-6">
                <div className="col-lg-6 col-xs-6">
                  <div className="small-box bg-purple">
                    <div className="inner">
                      <h3>{this.state.reservas.length} </h3>
                      novas reservas
                    </div>
                    <div className="icon">
                      <i
                        className="fa fa-exclamation-triangle"
                        style={{ paddingTop: '20px', fontSize: '80px' }}
                      />
                      <br />
                    </div>
                    <Link href="/monitor/reservas">
                      <a className="small-box-footer">
                        Ir para reservas{' '}
                        <i className="fa fa-arrow-circle-right" />
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="col-lg-6 col-xs-6">
                  <div className="small-box bg-aqua">
                    <div className="inner">
                      <h3>{this.state.reservasA.length}</h3>
                      <p>Monitorias dadas</p>
                    </div>
                    <div className="icon">
                      <i
                        className="fa fa-book"
                        style={{ paddingTop: '20px', fontSize: '80px' }}
                      />
                    </div>
                    <Link href="/monitor/reservas">
                      <a className="small-box-footer">
                        Ir para reservas{' '}
                        <i className="fa fa-arrow-circle-right" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="box box-success">
                  <div className="box-header">
                    <h3>
                      {!this.props.url.query.monitoria
                        ? 'Cadastro de Monitoria'
                        : ''}
                    </h3>
                  </div>
                  <div className="box-body">
                    <Message
                      hidden={!this.state.created}
                      positive
                      onDismiss={() => this.setState({ created: false })}
                    >
                      <Message.Header>Sucesso!</Message.Header>
                      <p>A Monitoria foi cadastrada!</p>
                    </Message>
                    <Message
                      hidden={!this.state.edited}
                      positive
                      onDismiss={() => this.setState({ edited: false })}
                    >
                      <Message.Header>Sucesso!</Message.Header>
                      <p>A Monitoria foi atualizada!</p>
                    </Message>
                    <ModalSuccessMonitoria
                      open={this.state.success}
                      handleClose={this.handleClose.bind(this)}
                      handleConfirm={this.handleConfirm.bind(this)}
                      data={this.state.data}
                    />
                    {/*<FormModalEditDia
                      open={this.state.edit}
                      handleClose={this.handleClose.bind(this)}
                      onClick={this.onEditSubmit.bind(this)}
                      data={this.state.monitoriaToEdit}
                    />*/}
                    <ModalDeletaMonitoria
                      open={this.state.deletamonitoria}
                      handleClose={this.handleClose.bind(this)}
                      handleConfirm={this.confirmDeleteMonitoria.bind(this)}
                      monitoriaToDelete={this.state.monitoriaToDelete}
                    />
                    <ModalDeletaUpload
                      open={this.state.deletaUpload}
                      handleClose={this.handleClose.bind(this)}
                      handleConfirm={this.confirmDeleteUpload.bind(this)}
                      uploadToDelete={this.state.uploadToDelete}
                    />
                    {<FormAddDia onSubmit={this.onSubmit.bind(this)} />}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <center>
                  <h2>Uploads</h2>
                  <form
                    //action={"/api/uploads/up/"+this.state.user.roles+'/'+this.state.user.disciplina}
                    action="api/uploads/upload"
                    method="POST"
                    enctype="multipart/form-data"
                  >
                    <div class="custom-file mb-3">
                      <div for="file" class="ui icon header">
                        Selecione o arquivo
                      </div>
                      <br />
                      <br />
                      <input type="file" name="file" id="file" />
                      <br />
                    </div>
                    <br />
                    <input
                      type="submit"
                      value="Enviar"
                      class="ui blue button"
                    />
                  </form>
                </center>
              </div>
              <div className="col-md-6">
                {!this.props.url.query.monitoria && (
                  <div className="box box-primary">
                    <div className="box-header">
                      <h3>Dias de Monitorias</h3>
                    </div>
                    <div className="box-body">
                      <TableListaDias
                        monitorias={this.state.monitoriaList}
                        deletemonitoria={this.deletemonitoria.bind(this)}
                        //editmonitoria={this.editmonitoria.bind(this)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <br />
            <center>
              <div style={{ width: 900 }}>
                <div className="box box-primary">
                  <div className="box-header" />
                  <div className="box-body">
                    <TableListaUploads
                      uploads={this.state.uploads}
                      deleteUpload={this.deleteUpload.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </center>
          </section>
        </div>
      </Page>
    )
  }
}

export default Home

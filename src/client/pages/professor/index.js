import Page from '~layouts/main'
import Head from '~components/head'
import Auth from '~utils/AuthService'
import React, { Component } from 'react'
import Link from 'next/link'
import { Table, Button } from 'semantic-ui-react'
import TableListaAlunosP from '~components/TableListaAlunosP'
import TableListaUploads from '~components/TableListaUploads'
import ModalDeletaUpload from '~components/ModalDeletaUpload'
import FormAddAula from '~components/professores/FormAddAula'
import TableListaAulas from '~components/professores/TableListaAulas'
import ModalSuccessAula from '~components/professores/ModalSuccessAula'
import ModalDeletaAula from '~components/professores/ModalDeleteAula'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      created: false,
      uploads: [],
      success: false,
      data: {},
      alunos: [],
      uploadToDelete: {},
      deletaUpload: false,
      stats: [],
      statsA: [],
      aulasList: [],
      deletaaula: false,
      aulaToDelete: {},
      form: {},
      aulasS: []
    }
    //this.onClick = this.onClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    Auth.fetch('/api/users/me').then(data => {
      this.setState({ user: data })
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
      Auth.fetch(
        '/api/reservasAulas/reservasS/' + data.disciplina + '/' + data.name
      ).then(data => {
        this.setState({ aulasS: data })
      })
    })
    Auth.fetch('/api/users/mep').then(data => {
      this.setState({ alunos: data })
    })
    Auth.fetch('/api/logsAlunos/stats/p').then(data => {
      this.setState({ stats: data })
    })
    Auth.fetch('/api/atividadesAcessadas/statsA/p').then(data => {
      this.setState({ statsA: data })
    })
    Auth.fetch('/api/users/me2').then(data => {
      this.setState({ aulasList: data })
    })
  }
  onSubmit(e) {
    this.setState({
      success: true,
      data: e
    })
  }
  confirmAddAula() {
    //alert(JSON.stringify(this.state.data))
    this.setState({
      aulasList: [
        ...this.state.aulasList,
        { ...this.state.data, joined: 'Agora mesmo', _id: Date.now() }
      ]
    })
    Auth.fetch('/api/users/aulasCad', {
      method: 'POST',
      body: JSON.stringify(this.state.data)
    }).then(() => {
      //TODO: Lidar com erros vindos do backend (email em uso, etc)
      this.setState({ success: false, created: true })
    })
  }

  confirmDeleteAula() {
    Auth.fetch('/api/users/aulasDel', {
      method: 'DELETE',
      body: JSON.stringify(this.state.aulaToDelete)
    })
    this.setState({
      aulasList: this.state.aulasList.filter(
        u => u !== this.state.aulaToDelete.aula
      ),
      deletaaula: false,
      aulaToDelete: {}
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
      deletaUser: false,
      userToDelete: {},
      deletaUpload: false,
      deletaaula: false,
      aulaToDelete: {}
    })
  }
  handleChange(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }
  deleteaula(aula) {
    this.setState({ deletaaula: true, aulaToDelete: { aula } })
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

  render() {
    return (
      <Page>
        <Head title="Professores - GestIF" />
        {/*<link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />*/}
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              {this.state.user.name} - {this.state.user.disciplina}
              <small>Professores do sistema</small>
              <br />
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
            <div class="container">
              <br />
              <br />
              <div class="row">
                <div className="col-lg-3 col-xs-8" style={{ marginLeft: 100 }}>
                  <div className="small-box bg-orange">
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
                </div>

                <div className="col-lg-3 col-xs-6">
                  <div className="small-box bg-teal">
                    <div className="inner">
                      <h3>{this.state.statsA.numAtividadesAcessadas}</h3>
                      <p>Atividades acessadas</p>
                    </div>
                    <div className="icon">
                      <i
                        className="fa fa-book"
                        style={{ paddingTop: '20px', fontSize: '80px' }}
                      />
                    </div>
                    <Link href="/cotp/atividadesAcessadas">
                      <a className="small-box-footer">
                        Ir para Atividades{' '}
                        <i className="fa fa-arrow-circle-right" />
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="col-lg-3 col-xs-6">
                  <div className="small-box bg-aqua">
                    <div className="inner">
                      <h3>{this.state.aulasS.length}</h3>
                      <p>Novas reservas de aulas</p>
                    </div>
                    <div className="icon">
                      <i
                        className="fa fa-exclamation"
                        style={{ paddingTop: '20px', fontSize: '80px' }}
                      />
                    </div>
                    <Link href="/professor/reservas">
                      <a className="small-box-footer">
                        Ir para reservas de aulas{' '}
                        <i className="fa fa-arrow-circle-right" />
                      </a>
                    </Link>
                  </div>
                </div>
                <br />
              </div>

              <br />
              <br />
              <div className="row">
                <div class="col-md-7">
                  <div className="box box-primary">
                    <div className="box-header">
                      <h3>
                        Alunos de Dependência em {this.state.user.disciplina}
                      </h3>
                    </div>
                    <div className="box-body">
                      <TableListaAlunosP alunos={this.state.alunos} />
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <FormAddAula onSubmit={this.onSubmit.bind(this)} />
                  <br />
                  <div className="box box-primary">
                    <div className="box-header">
                      <h3>Dias de Aulas</h3>
                    </div>
                    <div className="box-body">
                      <TableListaAulas
                        aulas={this.state.aulasList}
                        deleteaula={this.deleteaula.bind(this)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <br />
              <div className="row" style={{ marginTop: 10 }}>
                <div class="col-md-4">
                  <div className="box box-primary" style={{ padding: 30 }}>
                    <center>
                      <h2>Upload de atividades</h2>
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
                </div>
                <div class="col-md-7">
                  <div>
                    <div className="box box-primary">
                      <div className="box-body">
                        <TableListaUploads
                          uploads={this.state.uploads}
                          deleteUpload={this.deleteUpload.bind(this)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
          </section>
        </div>
        <ModalDeletaUpload
          open={this.state.deletaUpload}
          handleClose={this.handleClose.bind(this)}
          handleConfirm={this.confirmDeleteUpload.bind(this)}
          uploadToDelete={this.state.uploadToDelete}
        />
        <ModalSuccessAula
          open={this.state.success}
          handleClose={this.handleClose.bind(this)}
          handleConfirm={this.confirmAddAula.bind(this)}
          data={this.state.data}
        />
        <ModalDeletaAula
          open={this.state.deletaaula}
          handleClose={this.handleClose.bind(this)}
          handleConfirm={this.confirmDeleteAula.bind(this)}
          aulaToDelete={this.state.aulaToDelete}
        />
      </Page>
    )
  }
}
export default Home

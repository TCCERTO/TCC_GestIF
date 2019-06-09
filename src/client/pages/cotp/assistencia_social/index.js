import Page from '~layouts/main'
import Head from '~components/head'
import Auth from '~utils/AuthService'
import React, { Component } from 'react'
import { Segment, Form, Message, Button } from 'semantic-ui-react'

import FormAddNoticia from '~components/cotp/FormAddNoticia'
import TableListaUploads from '~components/TableListaUploads'
import ModalDeletaUpload from '~components/ModalDeletaUpload'
import TableListaUrls from '~components/cotp/TableListaUrls'
import ModalDeletaUrl from '~components/cotp/ModalDeletaUrl'
import TableListaNots from '~components/cotp/TableListaNots'
import ModalShowNot from '~components/cotp/ModalShowNot'
import ModalDeletaNot from '~components/cotp/ModalDeletaNot'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      enviado: false,
      success: false,
      form: {},
      uploads: [],
      deletaUpload: false,
      uploadToDelete: {},
      urls: [],
      deletaUrl: false,
      urlToDelete: {},
      enviadourl: false,
      successnot: false,
      nots: [],
      deletaNot: false,
      notToDelete: {},
      not: {}
    }
  }

  componentDidMount() {
    Auth.fetch('/api/uploads/pae').then(data => {})
    Auth.fetch('/api/uploads/paeU').then(data => {
      this.setState({ uploads: data })
    })
    Auth.fetch('/api/pae/').then(data => {
      this.setState({ urls: data })
    })
    Auth.fetch('/api/paeNot/nots').then(data => {
      this.setState({ nots: data })
    })
  }

  deleteUrl(id, url) {
    this.setState({ deletaUrl: true, urlToDelete: { id, url } })
  }

  notChange(titulo, conteudo) {
    this.setState({
      successnot: true,
      not: { titulo, conteudo }
    })
    //console.log(id, name)
  }

  deleteNot(id, titulo) {
    this.setState({ deletaNot: true, notToDelete: { id, titulo } })
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

  confirmDeleteUrl() {
    this.setState({ deletaUrl: false, urlToDelete: {} })
    const { id } = this.state.urlToDelete
    Auth.fetch('/api/pae/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id })
    }).then(data => {
      console.log('Success', data)
    })
    this.setState({
      urls: this.state.urls.filter(u => u._id !== this.state.urlToDelete.id)
    })
  }

  confirmDeleteNot() {
    this.setState({ deletaNot: false, notToDelete: {} })
    const { id } = this.state.notToDelete
    Auth.fetch('/api/paeNot/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id })
    }).then(data => {
      console.log('Success', data)
    })
    this.setState({
      nots: this.state.nots.filter(u => u._id !== this.state.notToDelete.id)
    })
  }

  handleClose() {
    this.setState({
      deletaUpload: false,
      uploadToDelete: {},
      deletaUrl: false,
      urlToDelete: {},
      successnot: false,
      deletaNot: false,
      notToDelete: {},
      not: {}
    })
  }

  onSubmit(e) {
    //e.preventDefault()
    //window.Pace.start()
    const { url, titulo } = e.target
    Auth.fetch('/api/pae/cadNotUrl', {
      method: 'POST',
      body: JSON.stringify({
        url: url.value,
        titulo: titulo.value
      })
    }).then(res => {
      this.setState({ enviadourl: true })
    })
  }

  onSubmitForm(e) {
    //alert(e)
    //this.setState({ data: e })
    const { titulo, conteudo } = e.target
    Auth.fetch('/api/paeNot/cadNot', {
      method: 'POST',
      body: JSON.stringify({ titulo: titulo.value, conteudo: conteudo.value })
    }).then(res => {
      this.setState({ enviado: true })
    })
  }

  render() {
    return (
      <Page>
        <Head title="GestIF" />
        {/*<link rel="stylesheet" 
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
        crossorigin="anonymous"/>*/}
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
            <h1>Assistência Social</h1>
            <br />
            <center>
              <div style={{ width: 1000 }}>
                <h2>Adicionar notícias do PAE</h2>
                <div class="ui placeholder segment">
                  <div class="ui two column stackable center aligned grid">
                    <div class="ui vertical divider">Ou</div>
                    <div class="middle aligned row">
                      <div class="column">
                        <div class="ui icon header">
                          {/*<i class="search icon" />*/}
                          {this.state.enviadourl && (
                            <center>
                              <Message positive>Enviado com sucesso!</Message>
                            </center>
                          )}
                          Por URL e Título
                        </div>
                        <div class="field">
                          <Form onSubmit={this.onSubmit.bind(this)}>
                            <Form.Field>
                              <Form.Input
                                style={{ width: 400 }}
                                type="text"
                                name="url"
                                placeholder="URL..."
                                required
                              />
                            </Form.Field>
                            {/*<i class="search icon" />*/}
                            <br />
                            <Form.Field>
                              <Form.Input
                                style={{ width: 400 }}
                                type="text"
                                name="titulo"
                                placeholder="Título..."
                                required
                              />
                            </Form.Field>{' '}
                            <br />
                            <Form.Button
                              icon="check"
                              labelPosition="right"
                              type="submit"
                              secondary
                              content="Criar"
                            />
                          </Form>
                        </div>
                      </div>
                      <div class="column">
                        <center>
                          <form
                            action="/api/uploads/upload"
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
                  </div>
                </div>
                <br />
                <br />
              </div>
              {this.state.enviado && (
                <center>
                  <Message positive>Enviado com sucesso!</Message>
                </center>
              )}
            </center>

            <center>
              <h2>Escrever notícia</h2>
              <Form
                onSubmit={this.onSubmitForm.bind(this)}
                style={{ width: 900 }}
              >
                <Form.Field>
                  <label>Título</label>
                  <input
                    placeholder="Título da Notícia..."
                    name="titulo"
                    required
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Conteúdo</label>
                  <Form.TextArea
                    style={{ height: 200 }}
                    name="conteudo"
                    placeholder="Conteúdo da notícia"
                    required
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Button type="submit" secondary fluid>
                  Cadastrar notícia
                </Button>
              </Form>
            </center>
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-md-6">
                <div className="box box-primary" style={{ marginLeft: 10 }}>
                  <div className="box-header">
                    <h3>Uploads de Arquivos</h3>
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
              <div className="col-md-6">
                <div className="box box-primary" style={{ marginLeft: 10 }}>
                  <div className="box-header">
                    <h3>Notícias enviadas</h3>
                  </div>
                  <div className="box-body">
                    <TableListaNots
                      nots={this.state.nots}
                      deleteNot={this.deleteNot.bind(this)}
                      notChange={this.notChange.bind(this)}
                    />
                  </div>
                </div>
                <ModalShowNot
                  open={this.state.successnot}
                  handleClose={this.handleClose.bind(this)}
                  data={this.state.not}
                />
                <ModalDeletaNot
                  open={this.state.deletaNot}
                  handleClose={this.handleClose.bind(this)}
                  handleConfirm={this.confirmDeleteNot.bind(this)}
                  notToDelete={this.state.notToDelete}
                />
              </div>
            </div>
            <div className="row" style={{ width: 1100 }}>
              <div className="box box-primary" style={{ marginLeft: 10 }}>
                <div className="box-header">
                  <h3>Urls</h3>
                </div>
                <div className="box-body">
                  <TableListaUrls
                    urls={this.state.urls}
                    deleteUrl={this.deleteUrl.bind(this)}
                  />
                </div>
              </div>
              <ModalDeletaUrl
                open={this.state.deletaUrl}
                handleClose={this.handleClose.bind(this)}
                handleConfirm={this.confirmDeleteUrl.bind(this)}
                urlToDelete={this.state.urlToDelete}
              />
            </div>
          </section>
        </div>
      </Page>
    )
  }
}
//ReactDOM.render(<App />, document.querySelector('#app'));
export default Home

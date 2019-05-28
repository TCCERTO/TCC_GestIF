import Page from '~layouts/main'
import Head from '~components/head'
import Auth from '~utils/AuthService'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Table, Button } from 'semantic-ui-react'
import ModalShowFile from '~components/ModalShowFile'
import TableListaAlunosP from '~components/TableListaAlunosP'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      created: false,
      uploads: [],
      success: false,
      data: {},
      alunos: []
    }
    //this.onClick = this.onClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    Auth.fetch('/api/users/me').then(data => {
      this.setState({ user: data })
    })
    Auth.fetch('/api/uploads/upload', {
      method: 'POST',
      body: JSON.stringify(this.state.data)
    }).then(() => {
      //TODO: Lidar com erros vindos do backend (email em uso, etc)
      this.setState({ created: true })
    })
    Auth.fetch('/api/uploads/').then(data => {
      this.setState({ uploads: data })
    })
    Auth.fetch('/api/users/mep').then(data => {
      this.setState({ alunos: data })
    })
  }
  onSubmit(e) {
    this.setState({
      success: true,
      data: e
    })
  }
  handleClose() {
    this.setState({ success: false, deletaUser: false, userToDelete: {} })
  }
  handleChange(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }
  render() {
    return (
      <Page>
        <Head title="Professores - GestIF" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossorigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
          integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
          crossorigin="anonymous"
        />
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
          integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
          crossorigin="anonymous"
        />
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
                <div class="col-md-10 m-auto">
                  <h3>Alunos de Dependência em {this.state.user.disciplina}</h3>
                  <TableListaAlunosP alunos={this.state.alunos} />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 m-auto">
                  {/*<div class="col-lg-3 col-xs-6">*/}
                  <h2 class="text-center display-6 my-4">Upload de arquivos</h2>
                  <form
                    action="/api/uploads/upload"
                    method="POST"
                    enctype="multipart/form-data"
                  >
                    <div class="custom-file mb-3">
                      <input
                        type="file"
                        name="file"
                        id="file"
                        class="custom-file-input"
                      />
                      <label for="file" class="custom-file-label">
                        Selecione o arquivo
                      </label>
                    </div>
                    <input
                      type="submit"
                      value="Enviar"
                      class="btn btn-primary btn-block"
                    />
                  </form>
                  <hr />
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
                          <b>Uploads</b>
                        </Table.Cell>
                        <Table.Cell
                          style={{ backgroundColor: 'black', color: 'white' }}
                        />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.uploads.map(user => {
                        return (
                          <Table.Row key={user._id}>
                            <Table.Cell>
                              {/*<img src='image/?user'/>*/}
                              <a
                                href="#a"
                                onClick={this.onSubmit.bind(this)}
                                onChange={this.handleChange}
                              >
                                {user.filename}
                              </a>
                            </Table.Cell>
                            <Table.Cell>
                              {/*<img src='image/?user'/>*/}
                              <Button.Group size="tiny">
                                <a
                                  href={
                                    '/api/uploads/downloads/' + user.filename
                                  }
                                >
                                  <Button
                                    color="blue"
                                    size="tiny"
                                    icon="cloud download"
                                  />
                                </a>
                                <Button.Or text="ou" />
                                <a
                                  href={'/api/uploads/delete/' + user.filename}
                                >
                                  <Button icon="x" color="red" />
                                </a>
                              </Button.Group>
                            </Table.Cell>
                          </Table.Row>
                        )
                      })}
                    </Table.Body>
                  </Table>
                </div>
              </div>
              <br />
              <br />
            </div>
            <br />
          </section>
          <ModalShowFile
            open={this.state.success}
            handleClose={this.handleClose.bind(this)}
            data={this.state.data}
          />
        </div>
      </Page>
    )
  }
}
export default Home

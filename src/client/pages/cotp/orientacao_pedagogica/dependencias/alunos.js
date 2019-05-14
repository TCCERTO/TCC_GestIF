import React from 'react'
import {
  Form,
  Button,
  Modal,
  Header,
  Icon,
  Message,
  Dropdown
} from 'semantic-ui-react'

import Auth from '~utils/AuthService'
import Page from '~layouts/main'
import Head from '~components/head'

import FormAddAluno from '~components/cotp/FormAddAluno'
import FormEditAluno from '~components/cotp/FormEditAluno'
import TableListaAlunos from '~components/cotp/TableListaAlunos'
import ModalSuccessAluno from '~components/cotp/ModalSuccessAluno'
import ModalDeletaUser from '~components/usuarios/ModalDeletaUser'

class Alunos extends React.Component {
  constructor() {
    super()
    this.state = {
      success: false,
      created: false,
      data: {},
      userToEdit: '',
      userList: [],
      userToDelete: {}
    }
  }
  componentDidMount() {
    Auth.fetch('/api/alunos').then(data => {
      this.setState({ userList: data })
    })
  }
  deleteUser(id, name) {
    this.setState({ deletaUser: true, userToDelete: { name, id } })
    console.log(id, name)
  }
  confirmDeleteUser() {
    this.setState({ deletaUser: false, userToDelete: {} })
    const { id } = this.state.userToDelete
    Auth.fetch('/api/alunos', {
      method: 'DELETE',
      body: JSON.stringify({ id })
    }).then(data => {
      console.log('Success', data)
    })
    this.setState({
      userList: this.state.userList.filter(
        u => u._id !== this.state.userToDelete.id
      )
    })
  }
  onSubmit(e) {
    this.setState({
      success: true,
      data: e
    })
  }
  onEditSubmit(data, id) {
    Auth.fetch('/api/alunos/' + id, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }).then(() => {
      this.setState({ edited: true })
    })
  }
  handleClose() {
    this.setState({ success: false, deletaUser: false, userToDelete: {} })
  }
  handleConfirm() {
    this.setState({
      userList: [
        ...this.state.userList,
        { ...this.state.data, joined: 'Agora mesmo', _id: Date.now() }
      ]
    })
    Auth.fetch('/api/alunos/', {
      method: 'POST',
      body: JSON.stringify(this.state.data)
    }).then(() => {
      //TODO: Lidar com erros vindos do backend (email em uso, etc)
      this.setState({ success: false, created: true })
    })
  }
  render() {
    return (
      <Page>
        <Head title="Alunos | GestIF" />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Alunos
              <small>Administração de alunos em dependência</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="/">
                  <i className="fa fa-dashboard" /> Iní­cio
                </a>
              </li>
              <li>
                <a href="./alunos">Alunos</a>
              </li>
            </ol>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box box-success">
                  <div className="box-header">
                    <h3>
                      {!this.props.url.query.user
                        ? 'Cadastro de aluno'
                        : 'Editar aluno'}
                    </h3>
                  </div>
                  <div className="box-body"> 
                    <Message
                      hidden={!this.state.created}
                      positive
                      onDismiss={() => this.setState({ created: false })}
                    >
                      <Message.Header>Sucesso!</Message.Header>
                      <p>O aluno foi cadastrado!</p>
                    </Message>
                    <Message
                      hidden={!this.state.edited}
                      positive
                      onDismiss={() => this.setState({ edited: false })}
                    >
                      <Message.Header>Sucesso!</Message.Header>
                      <p>O aluno foi atualizado!</p>
                    </Message>
                    <ModalSuccessAluno
                      open={this.state.success}
                      handleClose={this.handleClose.bind(this)}
                      handleConfirm={this.handleConfirm.bind(this)}
                      data={this.state.data}
                    />
                    <ModalDeletaUser
                      open={this.state.deletaUser}
                      handleClose={this.handleClose.bind(this)}
                      handleConfirm={this.confirmDeleteUser.bind(this)}
                      userToDelete={this.state.userToDelete}
                    />
                    {(this.props.url.query.user && (
                      <FormEditAluno
                        user={this.props.url.query.user}
                        onSubmit={this.onEditSubmit.bind(this)}
                      />
                    )) || <FormAddAluno onSubmit={this.onSubmit.bind(this)}  />}
                  </div>
                </div>
                {!this.props.url.query.user && (
                  <div className="box box-primary">
                    <div className="box-header">
                      <h3>Lista de alunos</h3>
                    </div>
                    <div className="box-body">
                    <TableListaAlunos
                        alunos={this.state.userList}
                        deleteUser={this.deleteUser.bind(this)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </Page>
    )
  }
}

export default Alunos

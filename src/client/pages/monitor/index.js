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
  Dropdown
} from 'semantic-ui-react'

import FormAddDia from '~components/monitores/FormAddDia'
import FormEditDia from '~components/monitores/FormEditDia'
import TableListaDias from '~components/monitores/TableListaDias'
import ModalSuccessMonitoria from '~components/monitores/ModalSuccessMonitoria'
import ModalDeletaUser from '~components/usuarios/ModalDeletaUser'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      success: false,
      created: false,
      data: {},
      userToEdit: '',
      userList: [],
      userToDelete: {}
    }
  }
  componentDidMount() {
    Auth.fetch('/api/users/me1').then(data => {
      this.setState({ userList: data })
    })
    Auth.fetch('/api/users/me').then(data => {
      this.setState({ user: data })
      //this.setState({ userList: data})
    })
    //this.setState({userList: this.state.user.monitorias})
  }
  deleteUser(id, name) {
    this.setState({ deletaUser: true, userToDelete: { name, id } })
    console.log(id, name)
  }
  confirmDeleteUser() {
    this.setState({ deletaUser: false, userToDelete: {} })
    const { id } = this.state.userToDelete
    Auth.fetch('/api/users/monitoresDel', {
      method: 'DELETE',
      user: this.state.user.id,
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
    Auth.fetch('/api/users/' + id, {
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
    Auth.fetch('/api/users/monitoriaCad', {
      method: 'POST',
      user: this.state.user.id,
      body: JSON.stringify(this.state.data)
    }).then(() => {
      //TODO: Lidar com erros vindos do backend (email em uso, etc)
      this.setState({ success: false, created: true })
    })
  }
  render() {
    return (
      <Page>
        <Head title="Monitor - GestIF" />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              {this.state.user.name} <small>abc</small>
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
                <Link href="monitor/diasHorarios">
                  <a>
                    <Button secondary fluid style={{ marginTop: '10px' }}>
                      Dias e horários
                    </Button>
                  </a>
                </Link>
              </div>
              <div className="col-md-6">
                <div className="box box-success">
                  <div className="box-header">
                    <h3>
                      {!this.props.url.query.user
                        ? 'Cadastro de Monitoria'
                        : 'Editar Monitoria'}
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
                    <ModalDeletaUser
                      open={this.state.deletaUser}
                      handleClose={this.handleClose.bind(this)}
                      handleConfirm={this.confirmDeleteUser.bind(this)}
                      userToDelete={this.state.userToDelete}
                    />
                    {(this.props.url.query.user && (
                      <FormEditDia
                        user={this.props.url.query.user}
                        onSubmit={this.onEditSubmit.bind(this)}
                      />
                    )) || <FormAddDia onSubmit={this.onSubmit.bind(this)} />}
                  </div>
                </div>
                {!this.props.url.query.user && (
                  <div className="box box-primary">
                    <div className="box-header">
                      <h3>Dias de Monitorias</h3>
                    </div>
                    <div className="box-body">
                      <TableListaDias
                        users={this.state.userList}
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

export default Home

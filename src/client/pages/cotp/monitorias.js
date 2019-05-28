import Page from '~layouts/main_inicio'
import Head from '~components/head_inicio'
import React from 'react'
import Auth from '~utils/AuthService'

import { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  Button,
  Label,
  Icon,
  Form,
  Modal,
  Header
} from 'semantic-ui-react'
import { CheckBox } from 'react'
import ModalSuccessReserva from '~components/ModalSuccessReserva'
import FormReservaMonitorias from '~components/FormReservaMonitorias'

export default class Monitorias extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      form: {},
      success: false,
      feita: false,
      monitoria: {},
      data: {}
    }
  }
  onSubmit(e) {
    this.setState({
      success: true,
      data: e
    })
  }

  handleClose() {
    this.setState({ success: false })
  }

  handleConfirm() {
    //this.setState({ success: false/*, monitorias: {} */})
    const { reserva, monitor, disciplina } = this.state.monitoria
    Auth.fetch('/api/reservas/', {
      method: 'POST',
      body: JSON.stringify({
        reserva: reserva,
        monitor: monitor,
        disciplina: disciplina
      })
    }).then(res => {
      this.setState({ success: false, feita: true, monitoria: {} })
    })
  }

  monitoriaChange(reserva, monitor, disciplina) {
    this.setState({
      success: true,
      monitoria: { reserva, monitor, disciplina }
    })
    //console.log(id, name)
  }

  componentDidMount() {
    Auth.fetch('/api/monitorias/').then(data => {
      this.setState({ userList: data })
    })
  }
  render() {
    return (
      <Page>
        <Head title="GestIF | Monitorias">
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          />
          <link rel="stylesheet" type="text/css" href="static/css/pae.css" />
        </Head>
        <div class="pusher">
          <div class="ui inverted vertical masthead center aligned segment">
            <div class="ui container">
              <div class="ui large secondary inverted pointing menu stackable">
                <a class="item" href="/inicio">
                  Início
                </a>
                <a class="active item" href="/cotp/monitorias">
                  Monitorias
                </a>
                <a class="item" href="/cotp/pae">
                  PAE
                </a>
                <a class="item" href="/csti/reportar">
                  Report à CSTI
                </a>
                <div class="right item">
                  <a class="ui inverted button" href="/login">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pusher">
          <div class="ui inverted vertical masthead center aligned segment">
            <h1
              class="ui inverted header"
              style={{ fontSize: 35, marginTop: 20 }}
            >
              Reserva de Monitorias
            </h1>
            <p>{/*this.state.data.length*/}</p>
            <br />
            <br />
            <br />
            <br />
            <center style={{ marginBottom: 150 }}>
              {this.state.feita && (
                <center>
                  <Message positive>Solicitada com sucesso!</Message>
                </center>
              )}
              <FormReservaMonitorias
                monitorias={this.state.userList}
                monitoriaChange={this.monitoriaChange.bind(this)}
              />
            </center>
            <div className="box-body">
              {
                <ModalSuccessReserva
                  open={this.state.success}
                  handleClose={this.handleClose.bind(this)}
                  handleConfirm={this.handleConfirm.bind(this)}
                  monitoria={this.state.monitoria}
                />
              }
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

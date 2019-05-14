import Page from '~layouts/main'
import Head from '~components/head'
import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'
import TableListaAlunos from '~components/cotp/TableListaAlunos'
import TableListaProfessores from '~components/cotp/TableListaProfessores'

import Link from 'next/link'

export default class Dependencias extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      professorList: []
    }
  }
  render() {
    return (
      <Page>
        <Head title="GestIF" />
        
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
            Orientação Pedagógica <small>Dependências</small>
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
          <br/>
            <h3> Alunos Cadastrados </h3>
            <div className="box-body">
            
            <TableListaAlunos
              alunos={this.state.userList}
              deleteUser={this.deleteUser.bind(this)}
            />
            <Link href="dependencias/alunos">
              <a>
                <Button secondary fluid style={{ marginTop: '10px' }}>
                  Ver todos os alunos cadastrados
                </Button>
              </a>
            </Link>
            <br/>
            <h3> Professores Cadastrados </h3>
            <TableListaProfessores users={this.state.professorList} />
            <Link href="dependencias/professores">
              <a>
                <Button secondary fluid style={{ marginTop: '10px' }}>
                  Ver todos os professores cadastrados
                </Button>
              </a>
            </Link>
            </div>
          </section>
        </div>
      </Page>
    )
  }
}
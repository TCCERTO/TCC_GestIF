import Page from '~layouts/main'
import Head from '~components/head'
import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'
import TableListaAlunosSimp from '~components/cotp/TableListaAlunosSimp'
import TableListaProfessoresSimp from '~components/cotp/TableListaProfessoresSimp'

import Link from 'next/link'
import Auth from '~utils/AuthService'
import ChartAlunos from '~components/cotp/ChartAlunos'

export default class Monitorias extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Page>
        <Head title="Monitorias - GestIF" />

        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Monitorias <small>Orientação Pedagógica</small>
            </h1>
            <Link href="monitorias/monitores">
              <a>
                <Button secondary fluid style={{ marginTop: '10px' }}>
                  Ver todos os monitores cadastrados
                </Button>
              </a>
            </Link>
          </section>
        </div>
      </Page>
    )
  }
}

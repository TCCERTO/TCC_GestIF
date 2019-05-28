import Page from '~layouts/main_inicio'
import Head from '~components/head_inicio'
import React from 'react'
import Router from 'next/router'

import ModuleCube from '../links'
import m from '../links'

export default () => (
  <Page>
    <Head title="GestIF | PAE">
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />
    </Head>
    <div class="ui large top fixed hidden menu">
      <div class="ui container">
        <a class="active item">Início</a>
        <a class="item">Monitorias</a>
        <a class="item">PAE</a>
        <a class="item">Report à CSTI</a>
        <div class="right menu">
          <div class="item">
            <a class="ui button">Login</a>
          </div>
        </div>
      </div>
    </div>

    <div class="ui vertical inverted sidebar menu">
      <a class="active item">Início</a>
      <a class="item">Monitorias</a>
      <a class="item">PAE</a>
      <a class="item">Report à CSTI</a>
      <a class="item">Login</a>
    </div>

    <div class="pusher">
      <div class="ui inverted vertical masthead center aligned segment">
        <div class="ui container">
          <div class="ui large secondary inverted pointing menu stackable">
            <a class="item" href="/inicio">
              Início
            </a>
            <a class="item" href="/cotp/monitorias">
              Monitorias
            </a>
            <a class="active item" href="/cotp/pae">
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
        <h1 class="ui inverted header" style={{ fontSize: 35, marginTop: 20 }}>
          Programa de Assistência Estudantil
        </h1>
      </div>
    </div>
  </Page>
)

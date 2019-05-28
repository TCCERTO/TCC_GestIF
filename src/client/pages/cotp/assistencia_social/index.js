import Page from '~layouts/main'
import Head from '~components/head'
import Auth from '~utils/AuthService'
import React, { Component } from 'react'
import { Segment, Form, Message } from 'semantic-ui-react'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      enviado: false,
      success: false,
      form: {}
    }
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
      this.setState({ enviado: true })
    })
  }

  componentDidMount() {
    Auth.fetch('/api/users/me').then(data => {
      this.setState({ user: data })
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
                {this.state.enviado && (
                  <center>
                    <Message positive>Enviado com sucesso!</Message>
                  </center>
                )}
                <div class="ui placeholder segment">
                  <div class="ui two column stackable center aligned grid">
                    <div class="ui vertical divider">Ou</div>
                    <div class="middle aligned row">
                      <div class="column">
                        <div class="ui icon header">
                          {/*<i class="search icon" />*/}
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
                        {/*<div class="ui icon header">
                            <i class="file alternate icon" />
                            Criar nova
                          </div>
                          <br />
                          <div class="ui primary button" href=''>Criar</div>*/}
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
              </div>
            </center>
          </section>
        </div>
      </Page>
    )
  }
}
//ReactDOM.render(<App />, document.querySelector('#app'));
export default Home

import Page from '~layouts/main'
import Head from '~components/head'
import Auth from '~utils/AuthService'
import React, { Component } from 'react'
import { Segment, Form, Message } from 'semantic-ui-react'

import FormAddNoticia from '~components/cotp/FormAddNoticia'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  onSubmit(e) {
    this.setState({
      success: true,
      data: e
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
              Notícias <small>Cadastro ? de notícias</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="/cotp/assistencia_social">
                  <i className="fa fa-dashboard" /> Início
                </a>
              </li>
              <li>
                <a href="/cotp/assistencia_social/formNoticia">
                  <i className="fa fa-dashboard" /> CadNotícia
                </a>
              </li>
            </ol>
          </section>
          <section className="content">
            <h1>Assistência Social</h1>
            <br />
            <FormAddNoticia onSubmit={this.onSubmit.bind(this)} />
          </section>
        </div>
      </Page>
    )
  }
}
//ReactDOM.render(<App />, document.querySelector('#app'));
export default Home

import Page from '~layouts/main'
import Head from '~components/head'

export default () => (
  <Page>
    <Head title="GestIF" />
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
        <h1>Dependências</h1>
        <br />
        <button class="ui secondary button">Okay</button>
        <button class="ui button">Cancel</button>
        <br />
        <br />
        <button class="ui green button">Green</button>
      </section>
    </div>
  </Page>
)

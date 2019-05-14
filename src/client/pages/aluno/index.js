import Page from '~layouts/main'
import Head from '~components/head'

export default () => (
  <Page>
    <Head title="Alunos - GestIF" />
    <div className="content-wrapper">
      <section className="content-header">
        <h1>
          Alunos <small>Alunos em dependência</small>
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
        <h1>Aluno</h1>
        <br />
        
        <br />
        <br />
        <div style={{ width: 800 }}>
          <div class="ui placeholder segment">
            <div class="ui two column stackable center aligned grid">
              <div class="ui vertical divider">Ou</div>
              <div class="middle aligned row">
                abc
              </div>
            </div>
          </div>
        </div>
        <br />
      </section>
    </div>
  </Page>
)

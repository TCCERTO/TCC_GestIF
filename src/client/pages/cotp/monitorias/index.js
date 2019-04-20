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
        <h1>COTP</h1>
        <br />
        <div class="ui buttons">
          <button class="ui button">
            <h3>Dependências</h3>
          </button>
          <button class="ui button">
            <h3>Monitorias</h3>
          </button>
          <button class="ui button">
            <h3>Botão 3</h3>
          </button>
          <button class="ui button">
            <h3>Botão 4</h3>
          </button>
          <button class="ui button">
            <h3>Botão 5</h3>
          </button>
        </div>
        <br />
        <br />
        <div style={{ width: 800 }}>
          <div class="ui placeholder segment">
            <div class="ui two column stackable center aligned grid">
              <div class="ui vertical divider">Ou</div>
              <div class="middle aligned row">
                <div class="column">
                  <div class="ui icon header">
                    <i class="search icon" />
                    Pesquisar por Aluno
                  </div>
                  <div class="field">
                    <div class="ui search">
                      <div class="ui icon input">
                        <input
                          class="prompt"
                          type="text"
                          placeholder="Nome do aluno..."
                        />
                        <i class="search icon" />
                      </div>
                      <div class="results" />
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="ui icon header">
                    <i class="world icon" />
                    Adicionar nova Dependência
                  </div>
                  <br />
                  <div class="ui primary button">Criar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="ui secondary button">Okay</button>
        <button class="ui button">Cancel</button>
        <br />
        <br />
        <button class="ui green button">Green</button>
        <br />
      </section>
    </div>
  </Page>
)

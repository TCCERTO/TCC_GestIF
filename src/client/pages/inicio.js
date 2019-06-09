import Page from '~layouts/main_inicio'
import Head from '~components/head_inicio'
import moment from 'moment'

moment.locale('pt-br')
const dia = moment().format('LL')

export default () => (
  <Page>
    <Head title="GestIF | Página Inicial">
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />
    </Head>
    <div class="pusher">
      <div class="ui inverted vertical masthead center aligned segment">
        <div class="ui container">
          <div class="ui large secondary inverted pointing menu stackable">
            <a class="active item" href="/inicio">
              Início
            </a>
            <a class="item" href="/cotp/monitorias">
              Monitorias
            </a>
            <a class="item" href="/cotp/pae">
              PAE
            </a>
            <a class="item" href="/csti/reportar">
              Report à CSTI
            </a>
            <a class="item" href="/monitor/listas">
              Listas de Exercícios
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
        <div className="ui text container">
          <br />
          <br />
          <br />
          <br />
          <h1 class="ui inverted header" style={{ fontSize: 57 }}>
            GestIF
          </h1>
          <h2 style={{ fontSize: 27 }}>O sistema</h2>
          <br />
          <br />
          <br />
          <br />
          <h3>{dia}</h3>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
    {/*<style jsx global>{`
          .ui {
            height: 100%
            
          }
          
        `}</style>*/}
  </Page>
)

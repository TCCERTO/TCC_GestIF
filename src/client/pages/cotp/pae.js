import Page from '~layouts/main_inicio'
import Head from '~components/head_inicio'

export default () => (
  <Page>
    <Head title="GestIF | Página Inicial">
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />

      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/reset.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/site.css"
      />

      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/container.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/grid.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/header.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/image.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/menu.css"
      />

      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/divider.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/dropdown.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/segment.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/button.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/list.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/icon.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/sidebar.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="../dist/components/transition.css"
      />
      <link rel="stylesheet" type="text/css" href="static/css/pae.css" />

      <script src="assets/library/jquery.min.js" />
      <script src="../dist/components/visibility.js" />
      <script src="../dist/components/sidebar.js" />
      <script src="../dist/components/transition.js" />
      <script src="/static/js/slideshow.js" />
      <script src="/static/js/menu.js" />
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
          <div class="ui large secondary inverted pointing menu">
            <a class="item" href="/inicio">
              Início
            </a>
            <a class="item">Monitorias</a>
            <a class="active item" href="/cotp/pae.html">
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
      <div class="ui inverted vertical masthead left aligned segment">
        <div class="ui text container">
          <h1
            class="ui inverted header"
            style={{ fontSize: 42, marginTop: 20 }}
          >
            Programa de Apoio Estudantil
          </h1>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
    <html>
      <div class="slideshow-container">
        <div class="mySlides fade">
          <div class="numbertext">1 / 3</div>
          <img src="/static/img/logo_ifrj.jpg" style={{ width: 100 }} />
          <div class="text">Caption Text</div>
        </div>

        <div class="mySlides fade">
          <div class="numbertext">2 / 3</div>
          <img src="/static/img/logo_ifrj.jpg" style={{ width: 100 }} />
          <div class="text">Caption Two</div>
        </div>

        <div class="mySlides fade">
          <div class="numbertext">3 / 3</div>
          <img src="/static/img/logo_ifrj.jpg" style={{ width: 100 }} />
          <div class="text">Caption Three</div>
        </div>

        <a
          class="prev"
          onclick="plusSlides(-1)"
          style={{ right: 0, borderRadius: 3, marginLeft: 0 }}
        >
          &#10094;
        </a>
        <a
          class="next"
          onclick="plusSlides(1)"
          style={{ right: 0, borderRadius: 3, marginLeft: 100 }}
        >
          &#10095;
        </a>
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <span class="dot" onclick="currentSlide(1)" />
        <span class="dot" onclick="currentSlide(2)" />
        <span class="dot" onclick="currentSlide(3)" />
      </div>
    </html>
  </Page>
)

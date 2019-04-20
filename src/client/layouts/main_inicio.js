import React, { Component } from 'react'
import Head from '~components/head'
import Header from '~components/header_inicio'
import Sidebar from '~components/sidebar'
import Footer from '~components/footer'
import Router from 'next/router'
import Auth from '~utils/AuthService'

Router.onRouteChangeStart = () => window.Pace.start()
Router.onRouteChangeComplete = () => window.Pace.stop()
Router.onRouteChangeError = () => window.Pace.stop()

class Main_inicio extends Component {
  render() {
    return (
      <div className="skin-black sidebar-mini wrapper">
        {/* Cabeçalho branco */}
        {/* Página de /pages/ */}
        {/*<Header />*/}
        {this.props.children}
        <style jsx global>
          {`
            body {
              font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial,
                sans-serif;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Main_inicio

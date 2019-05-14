const modulos = [
  {
    id: 'csti',
    name: 'CSTI',
    color: '#222',
    menu: [
      {
        text: 'Início',
        href: '/csti',
        icon: 'fa fa-home'
      },
      {
        text: 'Reports',
        href: '/csti/reports',
        icon: 'fa fa-clipboard'
      },
      {
        text: 'Administração',
        icon: 'fa fa-cog',
        submenu: [
          {
            text: 'Usuários',
            href: '/csti/usuarios',
            icon: 'fa fa-id-card'
          },
          {
            text: 'Logs',
            href: '/csti/logs',
            icon: 'fa fa-list'
          },
          {
            text: 'Sobre',
            href: '/sobre',
            icon: 'fa fa-info'
          }
        ]
      }
    ]
  },
  {
    id: 'direcao',
    name: 'Direção',
    color: '#00abc9',
    menu: [
      {
        text: 'Início',
        href: '/direcao',
        icon: 'fa fa-home'
      }
    ]
  },
  {
    id: 'cotp',
    name: 'COTP',
    color: '#1CC43A',
    menu: [
      {
        text: 'Início',
        href: '/cotp',
        icon: 'fa fa-home'
      },
      {
        text: 'Assistência Social',
        icon: 'fa fa-cog',
        submenu: [
          {
            text: 'nome1',
            href: '/cotp/assistencia_social',
            icon: 'fa fa-address-card'
          },
          {
            text: 'nome2',
            href: '/cotp/assistencia_social',
            icon: 'fa fa-book'
          }
        ]
      },
      {
        text: 'Orientação Pedagógica',
        icon: 'fa fa-cog',
        submenu: [
          {
            text: 'Dependências',
            href: '/cotp/orientacao_pedagogica/dependencias',
            icon: 'fa fa-address-card'
          },
          {
            text: 'Monitorias',
            href: '/cotp/orientacao_pedagogica/monitorias',
            icon: 'fa fa-book'
          }
        ]
      }
      
    ]
  },
  {
    id: 'aluno',
    name: 'Aluno',
    color: '#222',
    menu: [
      {
        text: 'Início',
        href: '/aluno',
        icon: 'fa fa-home'
      }
    ]
  },
  {
    id: 'professor',
    name: 'Professor',
    color: '#222',
    menu: [
      {
        text: 'Início',
        href: '/professor',
        icon: 'fa fa-home'
      }
    ]
  }
]

export default modulos

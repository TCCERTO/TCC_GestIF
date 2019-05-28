const links = [
  {
    id: 'edital20181',
    name: 'Edital 2018.1',
    color: '#00abc9',
    href:
      'https://portal.ifrj.edu.br/sites/default/files/IFRJ/Assist%C3%AAncia%20Estudantil/edital_001_definitivo.pdf',
    label: 'Edital 2018.1'
  },
  {
    id: 'direcao',
    name: 'Notícia 2',
    color: '#00abc9'
  },
  {
    id: 'cotp',
    name: 'Notícia 3',
    color: '#00abc9'
  }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

export default links

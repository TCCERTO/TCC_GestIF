const ListaNot = ({ nots, notChange }) =>
  nots.map(not => {
    return (
      <a
        onClick={() => notChange(not.titulo, not.conteudo)}
        class="big ui inverted blue basic button"
      >
        {not.titulo}
      </a>
    )
  })

export default ListaNot

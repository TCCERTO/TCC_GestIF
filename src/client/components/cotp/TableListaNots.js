import React from 'react'
import Link from 'next/link'
import { Table, Button, Label, Icon } from 'semantic-ui-react'

function addZero(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

const TableListaNots = ({ nots, deleteNot, notChange }) => (
  <Table celled selectable striped singleLine attached striped basic="very">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Título</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {nots.map(user => {
        return (
          <Table.Row key={user._id}>
            <Table.Cell>
              <a
                onClick={() => notChange(user.titulo, user.conteudo)}
                class="ui button"
              >
                {user.titulo}
              </a>
            </Table.Cell>
            <Table.Cell>
              <Button
                color="red"
                onClick={() => deleteNot(user._id, user.conteudo)}
              >
                Deletar
              </Button>
            </Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  </Table>
)

export default TableListaNots

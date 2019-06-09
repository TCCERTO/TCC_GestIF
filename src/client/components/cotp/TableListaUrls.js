import React from 'react'
import Link from 'next/link'
import { Table, Button, Label, Icon } from 'semantic-ui-react'

function addZero(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

const TableListaUrls = ({ urls, deleteUrl }) => (
  <Table celled selectable striped singleLine attached striped basic="very">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Título</Table.HeaderCell>
        <Table.HeaderCell>Url</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {urls.map(user => {
        return (
          <Table.Row key={user._id}>
            <Table.Cell>{user.titulo}</Table.Cell>
            <Table.Cell>{user.url}</Table.Cell>
            <Table.Cell>
              <Button color="red" onClick={() => deleteUrl(user._id, user.url)}>
                Deletar
              </Button>
            </Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  </Table>
)

export default TableListaUrls

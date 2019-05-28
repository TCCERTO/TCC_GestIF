import React from 'react'
import Link from 'next/link'
import { Table, Button, Label, Icon } from 'semantic-ui-react'

const TableListaDias = ({ users, deleteUser }) => (
  <Table celled selectable striped singleLine attached striped basic="very">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Dia e Hora</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {users.map(user => {
        return (
          <Table.Row>
            <Table.Cell>{user}</Table.Cell>
            <Table.Cell collapsing>
              <Button.Group size="tiny">
                <Link href={'?user=' + user._id}>
                  <Button color="grey" size="tiny" compact content="Editar" />
                </Link>
                <Button.Or text="ou" />
                <Button
                  compact
                  onClick={() => deleteUser(user._id, user.name)}
                  content="Deletar"
                  color="red"
                />
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  </Table>
)

export default TableListaDias

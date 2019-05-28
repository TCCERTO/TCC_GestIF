import React from 'react'
import Link from 'next/link'
import { Table, Button, Label, Icon } from 'semantic-ui-react'

function addZero(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

const TableListaAlunos = ({ alunos, deleteUser }) => (
  <Table celled selectable striped singleLine attached striped basic="very">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>E-mail</Table.HeaderCell>
        <Table.HeaderCell>Disciplina</Table.HeaderCell>
        <Table.HeaderCell>Período</Table.HeaderCell>
        <Table.HeaderCell>Turno</Table.HeaderCell>
        <Table.HeaderCell>Opções</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {alunos.map(user => {
        return (
          <Table.Row key={user._id}>
            <Table.Cell collapsing>{user._id}</Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.disciplina}</Table.Cell>
            <Table.Cell>{user.periodo}</Table.Cell>
            <Table.Cell>{user.turno}</Table.Cell>
            <Table.Cell collapsing>
              <Button.Group size="tiny">
                <Link href={'?aluno=' + user._id}>
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

export default TableListaAlunos

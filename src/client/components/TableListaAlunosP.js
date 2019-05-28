import React from 'react'
import Link from 'next/link'
import { Table, Button, Label, Icon } from 'semantic-ui-react'

function addZero(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

const TableListaAlunosP = ({ alunos }) => (
  <Table celled selectable striped singleLine attached striped basic="very">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>E-mail</Table.HeaderCell>
        <Table.HeaderCell>Período</Table.HeaderCell>
        <Table.HeaderCell>Turno</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {alunos.map(user => {
        return (
          <Table.Row key={user._id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.periodo}</Table.Cell>
            <Table.Cell>{user.turno}</Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  </Table>
)

export default TableListaAlunosP

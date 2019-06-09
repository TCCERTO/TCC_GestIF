import React from 'react'
import Link from 'next/link'
import { Table, Button, Label, Icon } from 'semantic-ui-react'

const TableListaAulas = ({ aulas, deleteaula }) => (
  <Table celled selectable striped singleLine attached striped basic="very">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Dia e Hora</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {aulas.map(aula => {
        return (
          <Table.Row>
            <Table.Cell>{aula}</Table.Cell>
            <Table.Cell collapsing>
              <Button
                compact
                onClick={() => deleteaula(aula)}
                content="Deletar"
                color="red"
              />
            </Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  </Table>
)

export default TableListaAulas

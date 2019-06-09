import React from 'react'
import Link from 'next/link'
import { Table, Button, Label, Icon } from 'semantic-ui-react'

const TableListaDias = ({ monitorias, deletemonitoria }) => (
  <Table celled selectable striped singleLine attached striped basic="very">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Dia e Hora</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {monitorias.map(monitoria => {
        return (
          <Table.Row>
            <Table.Cell>{monitoria}</Table.Cell>
            <Table.Cell collapsing>
              {/*<Button.Group size="tiny" >
                <Button 
                  color="grey" 
                  size="tiny" 
                  content="Editar" 
                  onClick={() => editmonitoria(monitoria)}
                />
                {/*<Link href={'?monitoria=' + monitoria._id}>
                  <Button color="grey" size="tiny" compact content="Editar" />
                  </Link>
        <Button.Or text="ou" />*/}
              <Button
                compact
                onClick={() => deletemonitoria(monitoria)}
                content="Deletar"
                color="red"
              />
              {/*</Button.Group>*/}
            </Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  </Table>
)

export default TableListaDias

import React from 'react'
import { Table, Button } from 'semantic-ui-react'

function addZero(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

const ListItem = ({
  id,
  reserva,
  monitor,
  status,
  disciplina,
  data,
  dataAplicada
}) => {
  return (
    <Table.Row warning={status === 0}>
      <Table.Cell>{reserva}</Table.Cell>
      <Table.Cell>{monitor}</Table.Cell>
      <Table.Cell>{disciplina}</Table.Cell>
      <Table.Cell collapsing>
        {new Date(data).toLocaleDateString('en-GB')} às{' '}
        {new Date(data).getHours() + ':' + addZero(new Date(data).getMinutes())}
      </Table.Cell>
      <Table.Cell collapsing>
        {status === 1 ? (
          <React.Fragment>
            Aplicada em {new Date(dataAplicada).toLocaleDateString('en-GB')} às{' '}
            {new Date(dataAplicada).getHours() +
              ':' +
              addZero(new Date(dataAplicada).getMinutes())}
          </React.Fragment>
        ) : (
          'Pendente'
        )}
      </Table.Cell>
    </Table.Row>
  )
}

export default ListItem

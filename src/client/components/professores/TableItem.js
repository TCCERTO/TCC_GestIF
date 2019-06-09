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
  aluno,
  reserva,
  professor,
  status,
  disciplina,
  aplicada,
  data,
  dataAplicada
}) => {
  return (
    <Table.Row warning={status === 0}>
      <Table.Cell>{aluno}</Table.Cell>
      <Table.Cell>{reserva}</Table.Cell>
      <Table.Cell>{professor}</Table.Cell>
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
      {aplicada && (
        <Table.Cell collapsing>
          <Button
            color="green"
            size="tiny"
            onClick={() => aplicada(id)}
            icon="check"
            content="Marcar como aplicada"
            labelPosition="right"
          />
        </Table.Cell>
      )}
    </Table.Row>
  )
}

export default ListItem

import React from 'react'
import { Table } from 'semantic-ui-react'
import TableItem from './TableItem'

const Historico = ({ reservas, aplicada }) => {
  return (
    <Table celled selectable attached style={{ marginLeft: '0px' }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Aluno</Table.HeaderCell>
          <Table.HeaderCell>Reserva</Table.HeaderCell>
          <Table.HeaderCell>Professor</Table.HeaderCell>
          <Table.HeaderCell>Disciplina</Table.HeaderCell>
          <Table.HeaderCell>Data</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {reservas.map(reservaa => {
          const {
            _id,
            aluno,
            reserva,
            professor,
            status,
            disciplina,
            data,
            dataAplicada
          } = reservaa
          return (
            <TableItem
              key={_id}
              aluno={aluno}
              reserva={reserva}
              professor={professor}
              disciplina={disciplina}
              data={data}
              status={status}
              id={_id}
              dataAplicada={dataAplicada}
            />
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default Historico

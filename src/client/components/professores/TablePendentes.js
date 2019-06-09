import React from 'react'
import TableItem from './TableItem'
import { Table } from 'semantic-ui-react'

const Pendentes = ({ reservas, aplicada }) => {
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
          <Table.HeaderCell>Ações</Table.HeaderCell>
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
              aplicada={aplicada}
            />
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default Pendentes

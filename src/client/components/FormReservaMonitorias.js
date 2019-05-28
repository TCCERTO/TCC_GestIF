import React from 'react'
import { Form, Button, Dropdown, Table } from 'semantic-ui-react'

const FormReservaMonitorias = ({ monitorias, monitoriaChange }) => (
  <Form onSubmit={() => this.props.onSubmit(this.state.form)}>
    <Table
      celled
      selectable
      striped
      singleLine
      attached
      striped
      basic="very"
      style={{ width: 1100 }}
    >
      <Table.Header style={{ backgroundColor: 'black' }}>
        <Table.Row>
          <Table.HeaderCell style={{ color: 'white', paddingLeft: 20 }}>
            Monitor
          </Table.HeaderCell>
          <Table.HeaderCell style={{ color: 'white', paddingLeft: 20 }}>
            Horários
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body style={{ backgroundColor: 'white' }}>
        {monitorias.map(user => {
          return (
            <Table.Row>
              <Table.Cell style={{ paddingLeft: 20, paddingTop: 20 }}>
                {user.name + ' - ' + user.disciplina}
              </Table.Cell>
              <Table.Cell style={{ paddingLeft: 20 }}>
                {user.monitorias.map(monitoria => {
                  return (
                    <Button
                      onClick={() =>
                        monitoriaChange(monitoria, user.name, user.disciplina)
                      }
                    >
                      {monitoria}
                    </Button>
                  )
                })}
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  </Form>
)

export default FormReservaMonitorias

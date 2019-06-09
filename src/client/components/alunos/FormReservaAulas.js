import React from 'react'
import { Form, Button, Dropdown, Table } from 'semantic-ui-react'

const FormReservaAulas = ({ aulas, aulaChange }) => (
  <Form onSubmit={() => this.props.onSubmit(this.state.form)}>
    <Table
      celled
      selectable
      striped
      singleLine
      attached
      striped
      basic="very"
      style={{}}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell style={{ paddingLeft: 20 }}>Aulas</Table.HeaderCell>
          <Table.HeaderCell style={{ paddingLeft: 20 }} />
        </Table.Row>
      </Table.Header>
      <Table.Body style={{ backgroundColor: 'white' }}>
        {aulas.map(user => {
          return (
            <Table.Row>
              <Table.Cell style={{ paddingLeft: 20, paddingTop: 20 }}>
                {user.name}
              </Table.Cell>
              <Table.Cell style={{ paddingLeft: 20 }}>
                {user.aulas.map(aula => {
                  return (
                    <Button
                      onClick={() =>
                        aulaChange(aula, user.name, user.disciplina)
                      }
                    >
                      {aula}
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

export default FormReservaAulas

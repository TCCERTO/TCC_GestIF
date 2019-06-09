import React from 'react'
import { Form, Button, Dropdown } from 'semantic-ui-react'
import modulos from '../../modulos'

class FormAddAula extends React.Component {
  constructor() {
    super()
    this.state = {
      form: {}
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }
  render() {
    return (
      <Form onSubmit={() => this.props.onSubmit(this.state.form)}>
        <h3>Cadastro de Aulas</h3>
        <Form.Field>
          <label>Dia da Semana e Hora</label>
          <input
            placeholder="Dia e Hora..."
            name="aula"
            required
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button type="submit" secondary fluid>
          Cadastrar aula
        </Button>
      </Form>
    )
  }
}

export default FormAddAula

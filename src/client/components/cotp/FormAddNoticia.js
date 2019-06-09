import React from 'react'
import { Form, Button, Dropdown } from 'semantic-ui-react'

class FormAddNoticia extends React.Component {
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
        <Form.Field>
          <label>Título</label>
          <input
            placeholder="Título da Notícia..."
            name="titulo"
            required
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Conteúdo</label>
          <Form.TextArea
            style={{ height: 300 }}
            name="conteudo"
            placeholder="Conteúdo da notícia"
            required
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button type="submit" secondary fluid>
          Cadastrar notícia
        </Button>
      </Form>
    )
  }
}

export default FormAddNoticia

import React from 'react'
import { Form, Button, Dropdown } from 'semantic-ui-react'
import Auth from '../../utils/AuthService'

class FormEditUser extends React.Component {
  constructor() {
    super()
    this.state = {
      form: {},
      loading: true
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    Auth.fetch('/api/users/monitoriaEdit' + this.props.user, {
      method: 'get'
    }).then(data => {
      this.setState({
        form: {
          monitoria: data.monitoria
        },
        loading: false
      })
      console.log(data)
    })
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
      <Form
        loading={this.state.loading}
        onSubmit={() => this.props.onSubmit(this.state.form, this.props.user)}
      >
        <Form.Field>
          <label>Dia da Semana e Hora</label>
          <input
            placeholder="Dia e Hora..."
            name="monitoria"
            required
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button type="submit" secondary fluid>
          Atualizar monitoria
        </Button>
      </Form>
    )
  }
}

export default FormEditUser

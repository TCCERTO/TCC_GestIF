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
    this.handleSetorChange = this.handleSetorChange.bind(this)
  }
  componentDidMount() {
    Auth.fetch('/api/alunos/' + this.props.user, { method: 'get' }).then(
      data => {
        this.setState({
          form: {
            name: data.name,
            email: data.email,
            disciplinas: data.disciplinas,
            periodo: data.periodo,
            turno: data.turno,
            roles: data.roles
          },
          loading: false
        })
        console.log(data)
      }
    )
  }
  handleSetorChange(e, data) {
    this.setState({
      form: {
        ...this.state.form,
        roles: data.value
      }
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
          <label>Nome</label>
          <input
            placeholder="Nome completo..."
            name="name"
            required
            value={this.state.form.name || ''}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email..."
            name="email"
            required
            type="email"
            value={this.state.form.email || ''}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Disciplinas</label>
          <Dropdown
            placeholder="Disciplinas..."
            onChange={this.handleSetorChange}
            name="disciplina"
            selection
            multiple
            fluid
            required
            options={disciplinas.map(d => {
              return { key: d.id, value: d.id, text: d.name }
            })}
          />
        </Form.Field>
        <Form.Field>
          <label>Período</label>
          <input
            placeholder="Período..."
            name="periodo"
            required
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Turno</label>
          <input
            placeholder="Turno..."
            name="turno"
            required
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Setor</label>
          <Dropdown
            placeholder="Setor..."
            onChange={this.handleSetorChange}
            name="roles"
            selection
            multiple
            fluid
            required
            value={
              this.state.form.roles &&
              this.state.form.roles.map(r => {
                return r
              })
            }
            options={[
              { key: 'csti', value: 'csti', text: 'CSTI' },
              { key: 'dir', value: 'direcao', text: 'Direção' },
              { key: 'cotp', value: 'cotp', text: 'COTP' },
              { key: 'alu', value: 'aluno', text: 'Aluno' },
              { key: 'prof', value: 'professor', text: 'Professor' }
            ]}
          />
        </Form.Field>
        <Button type="submit" secondary fluid>
          Atualizar aluno
        </Button>
      </Form>
    )
  }
}

export default FormEditUser

import React from 'react'
import { Modal, Button, Icon, Header, Label, Form } from 'semantic-ui-react'

const ModalSuccess = ({
  open,
  handleClose,
  onClick,
  data: { id, monitoria }
}) => (
  <Modal
    open={open}
    onClose={handleClose}
    size="small"
    style={{ height: '400px' }}
  >
    <Header content="Editar monitoria" style={{ height: '80px' }} />
    <Modal.Content>
      <Form>
        <Form.Field>
          <label>Dia da Semana e Hora</label>
          <input
            placeholder="Dia e Hora..."
            name="monitoria"
            required
            onChange={() => {
              this.onChange.bind(this)
            }}
          />
        </Form.Field>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button color="red" onClick={handleClose} inverted>
        <Icon name="x" /> Cancelar
      </Button>
      <Button color="green" onClick={onClick} inverted>
        <Icon name="checkmark" /> Atualizar
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ModalSuccess

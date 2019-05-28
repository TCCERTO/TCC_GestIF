import React from 'react'
import { Modal, Button, Icon, Header, Label } from 'semantic-ui-react'

const ModalSuccess = ({
  open,
  handleClose,
  handleConfirm,
  data: { monitoria }
}) => (
  <Modal
    open={open}
    onClose={handleClose}
    size="small"
    style={{ height: '400px' }}
  >
    <Header
      icon="exclamation"
      content="Confirmação"
      style={{ height: '80px' }}
    />
    <Modal.Content>
      <h2>
        Confirme os dados do nova monitoria: <br />
      </h2>
      <h3>
        <b>Dia da Semana e Hora:</b> {monitoria} <br />
      </h3>
      <br />
    </Modal.Content>
    <Modal.Actions>
      <Button color="red" onClick={handleClose} inverted>
        <Icon name="x" /> Cancelar
      </Button>
      <Button color="green" onClick={handleConfirm} inverted>
        <Icon name="checkmark" /> Cadastrar
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ModalSuccess

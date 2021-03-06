import React from 'react'
import { Modal, Button, Icon, Header, Label } from 'semantic-ui-react'

const ModalSuccess = ({ open, handleClose, handleConfirm, monitoria }) => (
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
        Confirmar reserva de horário? <br />
      </h2>
      <h3>
        <b>Dia da Semana e Hora:</b> {monitoria.reserva} <br />
        <b>Monitor:</b> {monitoria.monitor} <br />
        <b>Disciplina:</b> {monitoria.disciplina} <br />
      </h3>
      <br />
    </Modal.Content>
    <Modal.Actions>
      <Button color="red" onClick={handleClose} inverted>
        <Icon name="x" /> Cancelar
      </Button>
      <Button color="green" onClick={handleConfirm} inverted>
        <Icon name="checkmark" /> OK
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ModalSuccess

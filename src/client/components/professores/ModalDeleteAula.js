import React from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'

const ModalDeletaAula = ({
  open,
  handleClose,
  handleConfirm,
  aulaToDelete
}) => (
  <Modal
    open={open}
    onClose={handleClose}
    size="small"
    basic
    style={{ height: '400px' }}
  >
    <Modal.Content>
      <h2>
        Tem certeza? <br />
      </h2>
      <br />
      Deseja realmente deletar a aula de {aulaToDelete.aula} do sistema?
    </Modal.Content>
    <Modal.Actions>
      <Button color="red" onClick={handleClose} inverted>
        <Icon name="x" /> Cancelar
      </Button>
      <Button color="green" onClick={handleConfirm} inverted>
        <Icon name="checkmark" /> Deletar
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ModalDeletaAula

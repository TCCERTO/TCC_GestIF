import React from 'react'
import { Modal, Button, Icon, Header, Label } from 'semantic-ui-react'

const ModalSuccess = ({ open, handleClose, data: { apontado } }) => (
  <Modal
    open={open}
    onClose={handleClose}
    size="small"
    style={{ height: '400px' }}
  >
    <Modal.Content>
      <br />
    </Modal.Content>
    <Modal.Actions>
      <Button color="green" onClick={handleClose} inverted>
        <Icon name="checkmark" /> Ok
      </Button>
      <Button color="blue" onClick={handleClose} inverted>
        <Icon name="cloud download" /> Fazer Download
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ModalSuccess

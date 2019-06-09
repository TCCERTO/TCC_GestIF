import React from 'react'
import { Modal, Button, Icon, Header, Label } from 'semantic-ui-react'

const ModalSuccess = ({ open, handleClose, data: { titulo, conteudo } }) => (
  <Modal
    open={open}
    onClose={handleClose}
    size="small"
    style={{ height: '500px' }}
  >
    <Header icon="file icon" content="Notícia" style={{ height: '80px' }} />
    <Modal.Content>
      <h2>
        {titulo} <br />
      </h2>
      <h3>{conteudo}</h3>
      <br />
    </Modal.Content>
    <Modal.Actions>
      <Button color="green" onClick={handleClose} inverted>
        <Icon name="checkmark" /> Fechar
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ModalSuccess

import React from 'react'
import Link from 'next/link'
import { Table, Button, Label, Icon, Message } from 'semantic-ui-react'

function addZero(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

const TableListaUploads = ({ uploads, deleteUpload }) => (
  <Table celled selectable striped singleLine attached striped basic="very">
    <Table.Header>
      <Table.Row>
        <Table.Cell style={{ backgroundColor: 'black', color: 'white' }}>
          <b>Uploads</b>
        </Table.Cell>
        <Table.Cell style={{ backgroundColor: 'black', color: 'white' }} />
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {uploads.map(upload => {
        return (
          <Table.Row key={upload._id}>
            <Table.Cell>
              {/*<img src='image/?upload'/>*/}
              <a href={'/api/uploads/' + upload.filename}>{upload.filename}</a>
            </Table.Cell>
            <Table.Cell>
              {/*<img src='image/?upload'/>*/}
              <Button.Group size="tiny">
                <a href={'/api/uploads/downloads/' + upload.filename}>
                  <Button color="blue" size="tiny" icon="cloud download" />
                </a>
                <Button.Or text="ou" />

                <Button
                  icon="x"
                  color="red"
                  onClick={() => deleteUpload(upload._id, upload.filename)}
                />
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  </Table>
)

export default TableListaUploads

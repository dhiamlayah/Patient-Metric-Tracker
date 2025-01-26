import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalEntity = ({children,show,title,handleClose ,createData}:any) => {
    return ( 
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`Update ${title}`}</Modal.Title>
        </Modal.Header>
        {children} {/* here i put the logic of update */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={createData}>Save</Button>
        </Modal.Footer>
      </Modal>
     );
}
 
export default ModalEntity;
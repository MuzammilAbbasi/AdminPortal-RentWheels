import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import FormikCustomComponents from "containers/forms/FormikCustomComponents";
import IntlMessages from "helpers/IntlMessages";

const CustomModal = ({
  modalOpen,
  toggleModal,
  handleSubmit,
  formFields,
  initialValues,
  validationSchema,
  formName,
  modalName,
  position = 'modal-right',
  generic = false,
  cancelButton,
  isSuperVisorAccepted,
  isaccepted,
  reject,
  approve,
}) => {

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName={position}
      size="lg"
      // style={{maxWidth: '80vw', width: '100%'}}
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id={modalName} />
      </ModalHeader>
      <ModalBody>
        <FormikCustomComponents
          key={formName}
          handleSubmit={handleSubmit}
          toggleModal={toggleModal}
          formFields={formFields}
          initialValues={initialValues}
          validationSchema={validationSchema}
          formName={formName}
          generic={generic}
          cancelButton={cancelButton}
          isSuperVisorAccepted={isSuperVisorAccepted}
          isaccepted
          reject={reject}
          approve={approve}
          // buttons={[{
          //   className:"m-1"
          //       color:"secondary"
          //       outline
          // }]}
        />
      </ModalBody>
    </Modal>
  );
};

export default CustomModal;

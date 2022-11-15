import React, { useState, useEffect } from "react";

import {
  Row,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Form,
  Button,
  Label,
} from "reactstrap";
import LoadingOverlay from "components/custom/LoadingOverlay";
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/common/CustomBootstrap";
import { CustomerformFields, validationSchema } from "../../form/formmeta";
import { buttonDetailFields } from "../../buttons/buttonmeta";
import FormikCustomComponents from "containers/forms/FormikCustomComponents";
import {
  EditProfileSync,
  PermanentAppBlock,
  TemporaryAppBlock,
  ActivitateMobileApp
} from "../../apiCalls";
import InputField from "../../../../inputFields/InputField";
import SelectInput from "../../../../inputFields/selectInput";
const CustomerDemoGraphicForm = (props) => {
  console.log("PROPS => ",props);
  const { editCustomerInitValues } = props;

  const [customerInitValues, setCustomerInitValues] = useState(
    editCustomerInitValues
  );

  const [overlayLoading, setOverlayLoading] = useState(false);

  const [isSubmited, setIsSubmited] = useState(false);

  const [isProfileSyncSubmited, setIsProfileSyncSubmited] = useState(false);

  const [isTempBlockSubmited, setIsTempBlockSubmited] = useState(false);

  const [isPermBlockSubmited, setIsPermBlockSubmited] = useState(false);

  const [deactivateStatusText, setDeactivateStatusText] = useState("");

  const [deactivateReasonText, setDeactivateReasonText] = useState("");

  const [isDeactivateStatusDisabled, setIsDeactivateStatusDisabled] =
    useState(false);

  const [isDeactivateReasonDisabled, setIsDeactivateReasonDisabled] =
    useState(false);

  const [isRequestFromDisabled, setIsRequestFromDisabled] = useState(false);

  const [appStatusDisabled, setAppStatusDisabled] = useState(true);

  const [isUmpsCardNumber, setIsUmpsCardNumber] = useState(false);

  const [isProfileSync, setIsProfileSync] = useState(false);

  const [isTempBlock, setIsTempBlock] = useState(false);

  const [isPerBlock, setIsPerBlock] = useState(false);

  const [isMobileActivateBanking, setIsMobileActivateBanking] = useState(true);

  const [mobileBankingDeactivate, setMobileBankingDeactivate] = useState("");

  const [modalOpen, editModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [modalInitValues, editModalInitValues] = useState({
    cli: "",
    reasondeactivate: "",
    blockingrequest: "",
  });

  const [temporayModalOpen, EditTemporayModalOpen] = useState(false);
  const [permanentModalOpen, setPermanentModalOpen] = useState(false);
  const [activateMobileModal, setActivateMobileModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if(isSubmited){
      if (isProfileSyncSubmited) {
        const { cnic, username, email, accountNumber } = customerInitValues;
        console.log("isProfileSyncSubmited");
        EditProfileSync(
          cnic,
          username,
          email,
          accountNumber,
          onFetchProfileSync,
          onFetchFailure
        );
      } else if (isPermBlockSubmited) {
        const customer_cnic = editCustomerInitValues.cnic
          .replace("-", "")
          .replace("-", "");
        
          console.log("isPermBlockSubmited");
        const payload = {
          accountNumber: editCustomerInitValues.account,
          cli: modalInitValues.cli,
          cnic: customer_cnic,
          email: editCustomerInitValues.email,
          mobileNo: editCustomerInitValues.mobile_number,
          permanentBlockRequest: modalInitValues.blockingrequest,
          ReasonDeactivate: modalInitValues.reasondeactivate,
          username: editCustomerInitValues.username,
        };
        PermanentAppBlock(payload,onFetchPermanentlyBlock, onFetchFailure);
      } else if (isTempBlockSubmited){
        const payload = {
          accountNumber: editCustomerInitValues.accountNumber,
          CLI: modalInitValues.cli,
          cnic: editCustomerInitValues.cnic,
          email: editCustomerInitValues.email,
          mobileNo: editCustomerInitValues.mobileNo,
          temporaryBlockRequest: modalInitValues.blockingrequest,
          reasonDeactivate: modalInitValues.reasondeactivate,
          username: editCustomerInitValues.username,
        };
        console.log(payload)
        TemporaryAppBlock(payload, onFetchTemporaryBlock, onFetchFailure);
      }
      else{
        console.log("ACTIVATE MObile Banking")
        const payload = {
          accountNumber: editCustomerInitValues.accountNumber,
          CLI: modalInitValues.cli,
          cnic: editCustomerInitValues.cnic,
          email: editCustomerInitValues.email,
          mobileNo: editCustomerInitValues.mobileNo,
          ActivateBlockRequest: modalInitValues.blockingrequest,
          reasonDeactivate: modalInitValues.reasondeactivate,
          username: editCustomerInitValues.username,
        };
        ActivitateMobileApp(payload,onFetchActivateMobile,onFetchFailure)
      }
    }
    else{
      console.log("Else");
      customerDemoGraphicDetails();
    }
    
  }, [isSubmited]);

  const toggleEditModel = (rowItem) => {
    editModalOpen(!editModalOpen);
  };

  const customerDemoGraphicDetails = () => {
    console.log("customerDemoGraphicDetails")


    console.log("customerInitValues =>> ", customerInitValues);
    if (
      customerInitValues.customerStatus == "Warm" &&
      customerInitValues.userDisabled != "Hot"
    ) {
      console.log("Warm");
      // document.getElementById('appStatus').style.display = "none";
      setAppStatusDisabled(false);
      setDeactivateStatusText("Temporarily Disabled");
      setDeactivateReasonText(customerInitValues.deactivationReason);
      setIsDeactivateStatusDisabled(true);
      setIsDeactivateReasonDisabled(true);
      setIsRequestFromDisabled(true);
      setIsMobileActivateBanking(true);
      setIsPerBlock(true);
      setIsTempBlock(false);
      setIsProfileSync(false);

    } else if (
      (customerInitValues.customerStatus == "Active") &
      (customerInitValues.userDisabled != "Hot")
    ) {
      setIsProfileSync(true);
      setAppStatusDisabled(true);
      setIsDeactivateStatusDisabled(false);
      setIsDeactivateReasonDisabled(false);
      setIsRequestFromDisabled(false);

      setCustomerInitValues({
        ...customerInitValues,
        requestFrom: "",
      });

      setIsTempBlock(true);
      setIsPerBlock(true);
      setIsMobileActivateBanking(false);

      if (
        customerInitValues.locked == true &&
        customerInitValues.customerStatus == "Active"
      ) {
        setIsProfileSync(false);
        setCustomerInitValues({
          ...customerInitValues,
          locked: "locked",
        });
      }
    } else {
      setAppStatusDisabled(false);
      setIsTempBlock(false);
      setIsPerBlock(false);
      setIsMobileActivateBanking(false);
      setIsProfileSync(false);
      setIsDeactivateStatusDisabled(true);
      setDeactivateStatusText(
        "Wait for checker to Disabled / Activate Account"
      );
      setIsDeactivateReasonDisabled(true);
      setDeactivateReasonText(customerInitValues.deactivationReason);
      setIsRequestFromDisabled(true);
    }
  }

  const temporaryBlock = () => {
    EditTemporayModalOpen(!temporayModalOpen);
  };
  const activateMobileBanking = () => {
    // EditTemporayModalOpen(!temporayModalOpen);
    setActivateMobileModal(!activateMobileModal);
    editModalInitValues({});
    console.log(" activateMobileBanking ");
  };

  const permanentBlock = () => {
    setPermanentModalOpen(!permanentModalOpen);
    editModalInitValues({});
  };

  const temporaryBlockCancel = () => {
    EditTemporayModalOpen(!temporayModalOpen);
    editModalInitValues({});
  };


  const onFetchProfileSync = (data) => {
    console.log("DATA =>> ", data);

    console.log("customerInitValues =>> ", customerInitValues);
    setCustomerInitValues(data);
    setIsProfileSyncSubmited(false);
    EditTemporayModalOpen(false);
    editModalInitValues({});
    setOverlayLoading(false);
    setIsSubmited(false);
    // const message = data.message;
    // setMessage(message);
    // editModalOpen(true);
  };

  const onFetchTemporaryBlock = (data) => {
    console.log("DATA =>> ", data);
    const {userDisabled,customer_relation} = data
    console.log("customerInitValues =>> ", customerInitValues);
    editModalInitValues({});
    setIsTempBlockSubmited(!isTempBlockSubmited);
    const Data = {
      ...customer_relation,
      userDisabled
    }
    console.log("DATA =>> ",Data)
    setCustomerInitValues(Data);
    setIsSubmited(false);
    setOverlayLoading(false);
    // EditTemporayModalOpen(false);
    // setCustomerInitValues(data);
    // const message = data.message;
    // setMessage(message);
    // editModalOpen(true);
  };

  const onFetchActivateMobile = (data) => {
    console.log("DATA =>> ", data);
    const {userDisabled,customer_relation} = data
    console.log("customerInitValues =>> ", customerInitValues);
    editModalInitValues({});
    // setIsubm(!isTempBlockSubmited);
    const Data = {
      ...customer_relation,
      userDisabled
    }
    console.log("DATA =>> ",Data)
    setCustomerInitValues(Data);
    setIsSubmited(false);
    setOverlayLoading(false);
    // EditTemporayModalOpen(false);
    // setCustomerInitValues(data);
    // const message = data.message;
    // setMessage(message);
    // editModalOpen(true);
  };
  const onFetchPermanentlyBlock = (data) => {
    console.log("DATA =>> ", data);
    const {userDisabled,customer_relation} = data
    console.log("customerInitValues =>> ", customerInitValues);
    editModalInitValues({});
    const Data = {
      ...customer_relation,
      userDisabled
    }
    console.log("DATA =>> ",Data)
    setIsSubmited(false);
    setOverlayLoading(false);
    // EditTemporayModalOpen(false);
    // setCustomerInitValues(data);
    // const message = data.message;
    // setMessage(message);
    // editModalOpen(true);
  };

  const onFetchFailure = () => {
    console.log("FAIL");
    setOverlayLoading(false);
    EditTemporayModalOpen(false);
    setIsSubmited(false);
  };

  // const editHandleSubmit = (updatedItem) => {
  //   // const { editModalOpen } = this.state
  //   // this.setState( { editModalOpen: !editModalOpen, showLoadingOverlay: true } ) // re-render
  //   // if ( updatedItem ) {
  //   //   const { status } = updatedItem
  //   //   const updatedAccount = {
  //   //     ...updatedItem,
  //   //     status: status.value,
  //   //   }
  //   // api-hit.
  //   // updateAccountMaintenance( updatedAccount, this.onUpdateSuccess, this.onUpdateError )
  // };

  const profileSync = () => {
    setOverlayLoading(true);
    setIsProfileSyncSubmited(true);
    setIsSubmited(true);
  };

  const handleTempBlock = (e) => {
    e.preventDefault();
    setIsTempBlockSubmited(!isTempBlockSubmited);
    EditTemporayModalOpen(false);
    setIsSubmited(true);
    setOverlayLoading(true);
  };

  const handlePerpBlock = (e) => {
    e.preventDefault();
    setPermanentModalOpen(false);
    setIsPermBlockSubmited(!isPermBlockSubmited);
    setIsSubmited(true);
    setOverlayLoading(true);
  };

  const handleSubmitMobileActivate = (e) => {
    e.preventDefault();
    // setPermanentModalOpen(false);
    setActivateMobileModal(!activateMobileModal);
    // setIsPermBlockSubmited(!isPermBlockSubmited);
    setIsSubmited(true);
    setOverlayLoading(true);
  };

  const handleEvent = (event) => {
    // let obj = modalInitValues;

    // const tempObj = {
    //   ...modalInitValues,
    //   [event.target.name]: event.target.value,
    // };
    editModalInitValues({
      ...modalInitValues,
      [event?.target?.name]: event?.target?.value,
    });
  };

  const handleChangeTempBlock = (event) => {
    // let obj = modalInitValues;

    // const tempObj = {
    //   ...modalInitValues,
    //   [event.target.name]: event.target.value,
    // };
    editModalInitValues({
      ...modalInitValues,
      [event?.target?.name]: event?.target?.value,
    });
  };

  const handleChangeMobileActivate = (event) => {
    editModalInitValues({
      ...modalInitValues,
      [event?.target?.name]: event?.target?.value,
    });
  };

  const selectOptions = [
    { value: "Customer Request", label: "Customer Request" },
    { value: "FRMU", label: "FRMU" },
    { value: "Compliance Request", label: "Compliance Request" },
  ];

  return (
    <Row>
      <Colxx xxs="12">
        <Colxx xxs="12" className="mt-4">
          <CardBody>
            {overlayLoading && <LoadingOverlay style={{ zIndex: 2000 }} />}
            <Row>
              <Colxx xxs="12" xl="12" className="mb-4">
                {/* <Form onSubmit={this.handleTab}> */}
                <Form>
                  <Row className="container">
                    <Colxx sm="6">
                      <FormGroup>
                        <Label>CNIC</Label>
                        <InputField
                          value={customerInitValues?.cnic || ""}
                          type="text"
                          id="cnic"
                          disabled
                          name="cnic"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="6">
                      <FormGroup>
                        <Label>Username</Label>
                        <InputField
                          value={customerInitValues?.username || ""}
                          type="text"
                          disabled
                          id="username"
                          name="username"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm="6">
                      <FormGroup>
                        <Label>Account Number</Label>
                        <InputField
                          value={customerInitValues?.accountNumber || ""}
                          type="text"
                          id="accountNumber"
                          name="accountNumber"
                          disabled
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="6">
                      <FormGroup>
                        <Label>Debit Card Number</Label>
                        <InputField
                          value={customerInitValues?.debitCard || ""}
                          type="text"
                          id="debitCard"
                          name="debitCard"
                          disabled
                        />
                      </FormGroup>
                    </Colxx>

                    {isUmpsCardNumber ? (
                      <Colxx sm="6">
                        <FormGroup>
                          <Label>UMPS Card Number</Label>
                          <InputField
                            value={
                              customerInitValues?.encUmpsCardNo != null
                                ? customerInitValues?.encUmpsCardNo
                                : ""
                            }
                            type="text"
                            id="debitCard"
                            name="debitCard"
                            disabled
                          />
                        </FormGroup>
                      </Colxx>
                    ) : (
                      ""
                    )}

                    <Colxx sm="6">
                      <FormGroup>
                        <Label>Email</Label>
                        <InputField
                          value={customerInitValues?.email || ""}
                          type="text"
                          id="email"
                          name="email"
                          disabled
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="6">
                      <FormGroup>
                        <Label>Mobile No</Label>
                        <InputField
                          value={customerInitValues?.mobileNo || ""}
                          type="text"
                          id="mobileNo"
                          name="mobileNo"
                          disabled
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="6">
                      <FormGroup>
                        <Label>MNP</Label>
                        <InputField
                          value={customerInitValues?.mnp || ""}
                          type="text"
                          id="mnp"
                          name="mnp"
                          disabled
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="6">
                      <FormGroup>
                        <Label>Customer Level</Label>
                        <InputField
                          value={customerInitValues?.customerLevel || ""}
                          type="text"
                          id="customerLevel"
                          name="customerLevel"
                          disabled
                        />
                      </FormGroup>
                    </Colxx>

                    {appStatusDisabled ? (
                      <Colxx sm="6">
                        <FormGroup>
                          <Label>Mobile App Status</Label>
                          <InputField
                            value={customerInitValues?.customerStatus || ""}
                            type="text"
                            id="customerStatus"
                            name="customerStatus"
                            disabled
                          />
                        </FormGroup>
                      </Colxx>
                    ) : (
                      ""
                    )}

                    {isDeactivateStatusDisabled ? (
                      <Colxx sm="6">
                        <FormGroup>
                          <Label>
                            Mobile Banking Deactivate / Activate Reason
                          </Label>
                          <InputField
                            value={deactivateStatusText || ""}
                            type="text"
                            id="deactivateStatusText"
                            name="deactivateStatusText"
                            disabled
                          />
                        </FormGroup>
                      </Colxx>
                    ) : (
                      ""
                    )}

                    {isDeactivateReasonDisabled ? (
                      <Colxx sm="6">
                        <FormGroup>
                          <Label>
                            Mobile Banking Deactivate / Activate Reason
                          </Label>
                          <InputField
                            value={deactivateReasonText || ""}
                            type="text"
                            id="deactivateReasonText"
                            name="deactivateReasonText"
                            disabled
                          />
                        </FormGroup>
                      </Colxx>
                    ) : (
                      ""
                    )}
                    {isRequestFromDisabled ? (
                      <Colxx sm="6">
                        <FormGroup>
                          <Label>Request From</Label>
                          <InputField
                            value={
                              customerInitValues?.requestFrom
                                ? customerInitValues?.requestFrom
                                : ""
                            }
                            type="text"
                            id="requestFrom"
                            name="requestFrom"
                            disabled
                          />
                        </FormGroup>
                      </Colxx>
                    ) : (
                      ""
                    )}

                    <Colxx sm="12" className="d-flex justify-content-end mt-3">
                      {/* {$} */}

                      {isProfileSync ? (
                        <Button
                          className="m-1"
                          size="md"
                          color="secondary"
                          outline
                          onClick={profileSync}
                        >
                          <IntlMessages id="Profile-button" />
                        </Button>
                      ) : (
                        ""
                      )}

                      {"  "}

                      {isTempBlock ? (
                        <Button
                          className="m-1"
                          size="md"
                          color="warning"
                          outline
                          onClick={temporaryBlock}
                        >
                          <IntlMessages id="temporary-block-button" />
                        </Button>
                      ) : (
                        ""
                      )}

                      {"  "}

                      {isMobileActivateBanking ? (
                        <Button
                          className="m-1"
                          size="md"
                          color="primary"
                          outline
                          onClick={activateMobileBanking}
                        >
                          <IntlMessages id="activate-mobile-button" />
                        </Button>
                      ) : (
                        ""
                      )}

                      {"  "}
                      {isPerBlock ? (
                        <Button
                          className="m-1"
                          size="md"
                          color="danger"
                          outline
                          onClick={permanentBlock}
                        >
                          <IntlMessages id="permanently-block-button" />
                        </Button>
                      ) : (
                        ""
                      )}
                    </Colxx>
                  </Row>
                </Form>
              </Colxx>
            </Row>

            {/* <FormikCustomComponents
              formFields={CustomerformFields}
              // buttonFields={buttonDetailFields}
              validationSchema={validationSchema}
              initialValues={editCustomerInitValues}
              profileSync={profileSync}
              temporaryBlock={temporaryBlock}
              permanentBlock={permanentBlock}
              iscallcenterAccepted={iscallcenterAccepted}
              isaccepted={true}
            /> */}
          </CardBody>
        </Colxx>

        <Modal
          size="lg"
          isOpen={temporayModalOpen}
          toggle={temporaryBlockCancel}
        >
          <ModalHeader toggle={temporaryBlockCancel}>
            <IntlMessages className="text-center" id="menu.TemporaryBlock" />
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleTempBlock}>
              <Row className="container">
                <Colxx sm="12">
                  <FormGroup>
                    <InputField
                      value={modalInitValues.cli}
                      label="CLI"
                      type="text"
                      id="cli"
                      disabled={true}
                      // style={{ borderRadius: "50px" }}
                      // required={true}
                      name="cli"
                      placeholder="Enter CLI"
                      onChange={handleChangeTempBlock}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12">
                  <FormGroup>
                    <InputField
                      value={modalInitValues?.reasondeactivate}
                      label="Message"
                      type="text"
                      id="reasondeactivate"
                      // maxLength={50}
                      required={true}
                      // style={{ borderRadius: "50px" }}
                      name="reasondeactivate"
                      placeholder="Enter comments"
                      onChange={handleChangeTempBlock}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12">
                  <FormGroup>
                    <SelectInput
                      options={selectOptions}
                      value={modalInitValues.blockingrequest}
                      label="Blocking Request"
                      // type="select"
                      // id="blockingrequest"
                      // style={{ borderRadius: "50px" }}
                      
                      name="blockingrequest"
                      placeholder="Select Action"
                      handleChange={handleChangeTempBlock}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx sm="12" className="d-flex justify-content-end mt-3">
                  <Button
                    className="mr-1"
                    color="secondary"
                    size="md"
                    outline
                    // disabled={isLoading}
                    onClick={temporaryBlockCancel}
                  >
                    <span className="label">Cancel</span>
                  </Button>
                  <Button
                    className={`${isLoading ? "show-spinner" : ""}`}
                    color="primary"
                    type="submit"
                    size="md"
                    // disabled={isLoading}
                    outline
                  >
                    <span className="label">
                      {/* <IntlMessages id="user.login-button" />  */}
                      OK
                    </span>
                  </Button>
                </Colxx>
              </Row>
            </Form>
          </ModalBody>
        </Modal>

        <Modal
          size="lg"
          isOpen={permanentModalOpen}
          toggle={permanentBlock}
        >
          <ModalHeader toggle={permanentBlock} closeButton>
            <IntlMessages className="text-center" id="menu.permanentBlock" />
          </ModalHeader> 
          <ModalBody>
            <Form onSubmit={handlePerpBlock}>
              <Row className="container">
                <Colxx sm="12">
                  <FormGroup>
                    <InputField
                      value={modalInitValues.cli}
                      label="CLI"
                      type="number"
                      id="cli"
                      name="cli"
                      placeholder="Enter CLI"
                      onChange={handleEvent}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12">
                  <FormGroup>
                    <InputField
                      value={modalInitValues?.reasondeactivate}
                      label="Comments"
                      type="text"
                      id="reasondeactivate"
                      // maxLength={50}
                      required={true}
                      // style={{ borderRadius: "50px" }}
                      name="reasondeactivate"
                      placeholder="Enter comments"
                      onChange={handleEvent}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12">
                  <FormGroup>
                    <SelectInput
                      options={selectOptions}
                      value={modalInitValues.blockingrequest}
                      label="Blocking Request"
                      // type="select"
                      // id="blockingrequest"
                      // style={{ borderRadius: "50px" }}
                      name="blockingrequest"
                      placeholder="Select Action"
                      handleChange={handleEvent}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx sm="12" className="d-flex justify-content-end mt-3">
                  <Button
                    color="secondary"
                    // type="submit"
                    className="mr-1"
                    size="md"
                    outline
                    // disabled={isLoading}
                    onClick={permanentBlock}
                  >
                    <span className="label">Cancel</span>
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    outline
                    className={`${isLoading ? "show-spinner" : ""}`}
                    size="md"
                    disabled={isLoading}
                  >
                    <span className="label">
                      {/* <IntlMessages id="user.login-button" />  */}
                      OK
                    </span>
                  </Button>
                </Colxx>
              </Row>
            </Form>
          </ModalBody>
        </Modal>


        <Modal
          size="lg"
          isOpen={activateMobileModal}
          toggle={activateMobileBanking}
        >
          <ModalHeader toggle={activateMobileBanking} closeButton>
            <IntlMessages className="text-center" id="menu.activateMobileBanking" />
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmitMobileActivate}>
              <Row className="container">
                <Colxx sm="12">
                  <FormGroup>
                    <InputField
                      value={modalInitValues.cli}
                      label="CLI"
                      type="number"
                      id="cli"
                      name="cli"
                      placeholder="Enter CLI"
                      onChange={handleChangeMobileActivate}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12">
                  <FormGroup>
                    <InputField
                      value={modalInitValues?.reasondeactivate}
                      label="Comments"
                      type="text"
                      id="reasondeactivate"
                      // maxLength={50}
                      required={true}
                      // style={{ borderRadius: "50px" }}
                      name="reasondeactivate"
                      placeholder="Enter comments"
                      onChange={handleChangeMobileActivate}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12">
                  <FormGroup>
                    <SelectInput
                      options={selectOptions}
                      value={modalInitValues.blockingrequest}
                      label="Blocking Request"
                      // type="select"
                      // id="blockingrequest"
                      // style={{ borderRadius: "50px" }}
                      name="blockingrequest"
                      placeholder="Select Action"
                      handleChange={handleChangeMobileActivate}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx sm="12" className="d-flex justify-content-end mt-3">
                  <Button
                    color="secondary"
                    className="mr-1"
                    size="md"
                    outline
                    // disabled={isLoading}
                    onClick={activateMobileBanking}
                  >
                    <span className="label">Cancel</span>
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    outline
                    className={`${isLoading ? "show-spinner" : ""}`}
                    size="md"
                    // disabled={isLoading}
                  >
                    <span className="label">
                      {/* <IntlMessages id="user.login-button" />  */}
                      OK
                    </span>
                  </Button>
                </Colxx>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </Colxx>
    </Row>
  );
};

export default CustomerDemoGraphicForm;

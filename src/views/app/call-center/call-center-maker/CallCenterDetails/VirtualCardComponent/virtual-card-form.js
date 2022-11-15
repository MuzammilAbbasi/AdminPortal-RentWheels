import React, { useState, useEffect } from "react";
import { getVirtualCardData } from "../../apiCalls";
import { virtualcardformFields, validationSchema } from "../../form/formmeta";
import { Virtualbutton } from "../../buttons/buttonmeta";
import LoadingOverlay from "components/custom/LoadingOverlay";
import InputField from "../../../../inputFields/InputField";
import FormikCustomComponents from "containers/forms/FormikCustomComponents";

import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import { setDefaultLocale } from "react-datepicker";

export default function VirtualCardForm(props) {
  console.log("PRops =>> ", props);
  const [isvirtualAccepted, setVirtualAccepted] = useState(true);
  const [virtualFields, setVirtualFields] = useState({
    virtualCardNumber: "",
    internationalTransactionExpiryDate: "",
    virtualCardStatus: "",
    internationTransactionStatus: "",
  });
  const [virtualInitValues, editVirtualInitValues] = useState(
    props.virtualInitValues
  );
  const [overlayLoading, setOverlayLoading] = useState(true);
  //   const profileSync = (values) => {
  //     console.log(values);
  //     const { cnic, username, email, account } = values;
  //     console.log(cnic, "CNIC", username, "username");
  //     // EditProfileSync(
  //     //   cnic,
  //     //   username,
  //     //   email,
  //     //   account,
  //     //   this.onFetchSuccess,
  //     //   this.onFetchFailure
  //     // )
  //   };

  useEffect(() => {
    const Cnic = virtualInitValues.cnic.split("-").join("");
    const username = virtualInitValues.username;

    const payload = {
      cnic:Cnic,
      username:username
    }
    setOverlayLoading(true);
    getVirtualCardData(
      payload,
      onFetchSuccess,
      onFetchFailure
    )
  }, [props.virtualInitValues]);

  let onFetchFailure = () => {
    console.log("FAIL")
    setOverlayLoading(false);
    setVirtualFields("");
    // setItems([]);
    // setPagination({
    //   ...pagination,
    //   currentPage: 0,
    //   totalPages: 1,
    // });
    // setTableLoading(false);
  };
  let onFetchSuccess = (data) => {
    // const { response, totalPages, currentPage } = data;
    console.log("DATA =>> ",data)
    setVirtualFields(data)
    setOverlayLoading(false);
    // setItems(response);
    // setTableLoading(false);
    // setPagination({
    //   ...pagination,
    //   currentPage: currentPage ? currentPage : 0,
    //   totalPages: totalPages ? totalPages : 0,
    // });
  };

  return (
    <Row>
      <Colxx xxs="12">
        <CardBody>
        {overlayLoading && <LoadingOverlay style={{ zIndex: 2000 }} />}
          <Row>
            <Colxx xxs="12" xl="12" className="mb-4">
              {/* <Form onSubmit={this.handleTab}> */}
              {virtualFields ? <Form>
                <Row className="container">
                  <Colxx sm="6">
                    <FormGroup>
                      <Label >Virtual Card Number</Label>
                      <InputField
                        value={virtualFields.virtualCardNumber}
                        type="text"
                        id="virtualCardNumber"
                        disabled
                        name="virtualCardNumber"
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm="6">
                    <FormGroup>
                    <Label >International Transaction Expiry Date</Label>
                      <InputField
                        value={virtualFields.internationalTransactionExpiryDate}
                        type="text"
                        disabled
                        id="internationalTransactionExpiryDate"
                        name="internationalTransactionExpiryDate"
                      />
                    </FormGroup>
                  </Colxx>
                  
                  <Colxx sm="6">
                    <FormGroup>
                    <Label>virtual Card Status</Label>
                      <InputField
                        value={virtualFields.virtualCardStatus}
                        type="text"
                        id="virtualCardStatus"
                        name="virtualCardStatus"
                        disabled
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm="6">
                    <FormGroup>
                    <Label >International Transaction Status</Label>
                      <InputField
                        value={virtualFields.internationTransactionStatus}
                        type="text"
                        id="internationTransactionStatus"
                        name="internationTransactionStatus"
                        disabled
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm="12" className="d-flex justify-content-end mt-3">
              <Button
                // style={{ float: "right", marginLeft: "4px" }}
                color="secondary"
                size="md"
                className="m-1"
                outline
                // disabled={isLoading}
                // onClick={temporaryBlockCancel}
              >
                <span className="label">Enable / Disable International Transaction</span>
              </Button>
              <Button
                // style={{ float: "right", marginLeft: "4px" }}
                color="primary"
                size="md"
                className="m-1"
                outline
                // disabled={isLoading}
                // onClick={temporaryBlockCancel}
              >
                <span className="label"> Deactivate Card</span>
              </Button>
              <Button
                // style={{ float: "right" }}
                color="danger"
                className="m-1"
                outline
                size="md"
                // disabled={isLoading}
              >
                <span className="label">
                  {/* <IntlMessages id="user.login-button" />  */}
                  Delete Card
                </span>
              </Button>
            </Colxx>
                </Row>
              </Form> : <p className="text-center text-danger">DATA NOT FOUND</p> }
              
            </Colxx>
          </Row>

          
        </CardBody>
      </Colxx>
    </Row>
  );
}

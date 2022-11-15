import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip
} from "reactstrap";
import { injectIntl } from "react-intl";
import ReactJson from 'react-json-view'
import IntlMessages from "../../helpers/IntlMessages";
import { Card } from "reactstrap";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import { xml2json } from "../../helpers/Utils";

class CustomTransactionModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reqDateTimeTooltip: false,
      respDateTimeTooltip: false,
    }
  }

  toggleReqDateTime = () => {
    this.setState(prevState => ({
      reqDateTimeTooltip: !prevState.reqDateTimeTooltip
    }));
  };

  toggleRespDateTime = () => {
    this.setState(prevState => ({
      respDateTimeTooltip: !prevState.respDateTimeTooltip
    }));
  };

  getReqSrc = () => {
    if (this.props.format === "JSON") {
      return (
        <pre>
          <ReactJson
            id="request"
            name="request"
            theme="shapeshifter:inverted"
            iconStyle="circle"
            src={JSON.parse(this.props.requestData)}
            collapsed={6}
            groupArraysAfterLength={10}
          />
        </pre>
      );
    } else if (this.props.format === "SOAP" || this.props.format === "XML") {
      return (
        <pre>
          <ReactJson
            id="request"
            name="request"
            theme="shapeshifter:inverted"
            iconStyle="circle"
            src={xml2json(this.props.requestData)}
            collapsed={6}
            groupArraysAfterLength={10}
          />
        </pre>
      );
    } else {
      return <p>{this.props.requestData}</p>;
    }
  }

  getRespSrc = () => {
    if (this.props.format === "JSON") {
      return (
        <pre>
        <ReactJson
          id="request"
          name="request"
          theme="shapeshifter:inverted"
          iconStyle="circle"
          src={JSON.parse(this.props.responseData)}
          collapsed={6}
          groupArraysAfterLength={10}
        />
        </pre>
      );
    } else if (this.props.format === "SOAP"|| this.props.format === "XML") {
      return (
        <pre>
        <ReactJson
          id="response"
          name="response"
          theme="shapeshifter:inverted"
          iconStyle="circle"
          src={xml2json(this.props.responseData)}
          collapsed={6}
          groupArraysAfterLength={10}
        />
        </pre>
      );
    } else {
      return <p>{this.props.responseData}</p>;
    }
  }


  render() {
    const {
      modalOpen,
      toggleModal,
      modalName,
      responseCode,
      requestData,
      responseData,
      format,
      reqDateTime,
      respDateTime,
      dateDiff
    } = this.props;

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        size="lg"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id={modalName} />
        </ModalHeader>
        <ModalBody>

          <Colxx xxs="12" className="mb-3">
            <ContextMenuTrigger id="menu_id">
              <span style={{ fontSize: "1.15rem" }}>Core Banking Request</span> <span className="text-muted float-right" id="reqDatetimeHeading"><i>Request Date Time</i></span>
              <br />
              <Card className="d-flex flex-row active card">
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <div className="w-100 w-sm-100">
                      {this.getReqSrc()}
                    </div>
                  </div>
                </div>
              </Card>
            </ContextMenuTrigger>
          </Colxx >
          <br />
          <Colxx xxs="12" className="mb-3">
            <ContextMenuTrigger id="menu_id">
              <span style={{ fontSize: "1.15rem" }}>Core Banking Response</span><span className="text-muted float-right" id="respDatetimeHeading"><i>Response Date Time</i></span>
              <Card className="d-flex flex-row active card">
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <div className="w-100 w-sm-100">                      
                        <span> Response Code: {responseCode}</span>
                        <div className="mt-3">
                          {this.getRespSrc()}
                        </div>
                    </div>
                  </div>
                </div>
              </Card>
            </ContextMenuTrigger>
          </Colxx >

          <Tooltip
            id="reqDateTimeTooltip"
            name="reqDateTimeTooltip"
            key="reqDateTimeTooltip"
            placement="top"
            isOpen={this.state.reqDateTimeTooltip}
            target={"reqDatetimeHeading"}
            toggle={this.toggleReqDateTime}
          >
            <i>Total Time</i>
            <br />
            {dateDiff}
            <br />
            <br />
            <i>Request Datetime</i>
            <br />
            {reqDateTime}
          </Tooltip>

          <Tooltip
            id="respDateTimeTooltip"
            name="respDateTimeTooltip"
            key="respDateTimeTooltip"
            placement="top"
            isOpen={this.state.respDateTimeTooltip}
            target={"respDatetimeHeading"}
            toggle={this.toggleRespDateTime}
          >
            <i>Total Time</i>
            <br />
            {dateDiff}
            <br />
            <br />
            <i>Response Datetime</i>
            <br />
            {respDateTime}
          </Tooltip>

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="cancel-button" />
          </Button>
        </ModalFooter>
      </Modal >
    );
  };
}

export default injectIntl(CustomTransactionModal);

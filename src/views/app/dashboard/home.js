import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import IconCards from "../../../containers/ui/IconCards";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

class Home extends Component {
  getNodes = (perm) => {
    const childItems = this.getChildItem(perm);
    if (childItems.length > 0) {
      const multiple = [];
      childItems.forEach((child) => {
        multiple.push(this.getNodes(child));
      });
      return multiple;
    }

    return this.getSingleItem(perm);
  };

  getSingleItem = (item) => {
    return {
      title: item.menuLabel,
      icon: item.icon,
      value: "",
      to: item.pageUrl,
      type: item.type,
    };
  };
  getChildItem = (o) => {
    const childItems = [];

    const permissions = JSON.parse(
      sessionStorage.getItem("user")
    ).permissions.filter((x) => x.type === "menu");
    permissions.forEach((p) => {
      if (o.id === p.parentId) {
        childItems.push(p);
      }
    });
    return childItems;
  };

  getHomeContent = () => {
    const menu = [];
    const permissions = JSON.parse(
      sessionStorage.getItem("user")
    ).permissions.filter(
      (x) =>
        (x.type === "menu" || x.type === "external") && x.name !== "dashboard"
    );

    permissions.forEach((o) => {
      if (o.parentId === -1) {
        const nodes = this.getNodes(o);
        if (nodes.length === undefined) {
          menu.push(nodes);
        } else {
          this.getNodes(o).forEach((child) => {
            menu.push(child);
          });
        }
      }
    });

    return menu;
  };

  render() {
    const { match } = this.props;
    // console.log(match, "MAtch");
    // console.log(this.props, "Props");

    const data = [];
    data.push({
      title: "Bookings",
      icon: "simple-icon-book-open",
      to: "/app/bookings/booking",
    });
    data.push({
      title: "menu.callcenter",
      icon: "simple-icon-call-out",
      to: "/app/call-center/CallCenter",
      type: "menu",
      value: "",
    });
    data.push({
      title: "menu.bulk-ibt",
      icon: "iconsminds-arrow-mix",
      to: "/app/bulk-ibt/fund-transfer-transactions",
      type: "menu",
      value: "",
    });
    data.push({
      title: "menu.bulk-ibft",
      icon: "iconsminds-financial",
      to: "/app/bulk-ibft/fund-transactions",
      type: "menu",
      value: "",
    });
    data.push({
      title: "collapse.mobile-app-registration",
      icon: "iconsminds-male",
      to: "/app/registration/MobileAppRegistration",
      type: "menu",
      value: "",
    });
    data.push({
      title: "transaction.title",
      icon: "iconsminds-dollar",
      to: "/app/transaction/SAFTransactionResult",
      type: "menu",
      value: "",
      id: "transaction.title",
      label: "transaction.title",
    });
    data.push({
      title: "customerinfo.title",
      icon: "iconsminds-information",
      to: "/app/report/CustomerInformation",
      type: "menu",
      value: "",
      id: "customerinfo.title",
      label: "customerinfo.title",
    });
    data.push({
      title: "Activation/Deactivation Report",
      icon: "iconsminds-photo-album-2",
      to: "/app/report/ActivationDeactivation",
      type: "menu",
      value: "",
      id: "Activation/Deactivation Report",
      label: "Activation/Deactivation Report",
    });
    data.push({
      title: "Application Audit Trail",
      icon: "iconsminds-pantone",
      to: "/app/report/LoginAudit",
      type: "menu",
      value: "",
      id: "Application Audit Trail",
      label: "Application Audit Trail",
    });
    data.push({
      title: "Back Office User Report",
      icon: "iconsminds-folder-add--",
      to: "/app/report/BackOfficeReport",
      type: "menu",
      value: "",
      id: "Back Office User Report",
      label: "Back Office User Report",
    });
    data.push({
      title: "Virtual Card Activation/Deact Report",
      icon: "iconsminds-folder-delete",
      to: "/app/report/VirtualCardReport",
      type: "menu",
      value: "",
      id: "Virtual Card Activation/Deact Report",
      label: "Virtual Card Activation/Deact Report",
    });
    data.push({
      title: "menu.GetVirtualCardInfo",
      icon: "simple-icon-info",
      to: "/app/report/GetVirtualCardInfo",
      type: "menu",
      value: "",
      id: "menu.GetVirtualCardInfo",
      label: "menu.GetVirtualCardInfo",
    });
    data.push({
      title: "Reports",
      icon: "iconsminds-file-clipboard-file---text",
      to: "http://40.68.251.49:8081/jasperserver/login.html",
      type: "external",
      value: "",
      id: "Reports",
      label: "Reports",
    });
    // data.push({
    //   title: "Analytics",
    //   icon: "iconsminds-monitor-analytics",
    //   // to: "http://40.68.251.49:8081/jasperserver/login.html",
    //   to:"/app/Analytics/analytics",
    //   type: "menu",
    //   value: "",
    //   id: "Analytics",
    //   label:"Analytics",
    // });
    // const data = this.state.getHomeContent;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.home" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <IconCards data={data} />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default Home;

import React, { Component, Fragment } from "react";

class UserLayout extends Component {
  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  render() {
    return (
      <Fragment>
        {/* <div className="fixed-background" /> */}
        <div id="container">
          <img src="/assets/img/car1.jpeg" alt="oops" />
          <img src="/assets/img/car2.jpg" alt="oops" />
          <img src="/assets/img/car3.jpg" alt="oops" />
          <img src="/assets/img/car4.jpg" alt="oops" />
        </div>
        <main>
          <div className="container">{this.props.children}</div>
        </main>
      </Fragment>
    );
  }
}

export default UserLayout;

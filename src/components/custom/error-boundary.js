import React, { Component } from 'react';
import { Button, Collapse } from "reactstrap"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      isOpen: false,
      errorTitle: undefined,
      errorInfo: undefined,
    };
  }
  
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  handleDetailBtnClick = (event) => {
    const { isOpen } = this.state
    this.setState( { isOpen: !isOpen } )
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState( { errorInfo: JSON.stringify( errorInfo, null, 2 ), errorTitle: error.message } )
  }

  render() {
    const { hasError, isOpen, errorInfo, errorTitle } = this.state
    return ( hasError?
      <div className='container mt-2'>
        <h3 className='display-4'>Something went wrong :(</h3>
        <p className='text-muted'>Please try to <strong>refersh</strong> or contact system <strong>admin</strong>.</p>
        <Button size='sm' color='danger' onClick={this.handleDetailBtnClick} >View Details</Button>
        <Collapse isOpen={isOpen}>
          <div className="p-4 border mt-4">
            <h6 className="title mb-3  text-danger">
              <span className='font-weight-bold '>Error: </span>
              { errorTitle || errorTitle }
            </h6>
            <small>
              { errorInfo || errorInfo  }
            </small>
          </div>
        </Collapse>        
      </div>
      :
      <>{ this.props.children }</>
    );
  }
}

export default ErrorBoundary;
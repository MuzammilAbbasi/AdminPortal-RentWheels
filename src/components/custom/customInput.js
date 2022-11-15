import React from 'react';
import { Input } from "reactstrap"
import moment from "moment";
import DatePicker from "react-datepicker";


export function CustomInputElement(props = {}) {
  const { disabled, hidden , placeholder} = props
  const classStyles = disabled ? 'disabled' : ''
  return ({ filter, onChange }) => (
    <Input
      disabled={disabled}
      hidden={hidden}
      className={`${classStyles}`}
      placeholder={placeholder}
      onKeyPress={(event) => {
        if (
          event.key === "Enter" ||
          event.keyCode === 13 ||
          event.which === 13
        ) {
          onChange(event.target.value);
        }
      }}
      onChange={(event) => {
        const { value } = event.target;
        if (value.length <= 0) onChange(event.target.value); // Trigger the onSearch event.
      }}
    />
  )
}

export function CustomDateElement(props = {}) {
  return ({ filter, onChange }) => (
    <div>
      <DatePicker
        selected={this.state.selectedDate}
        dateFormat="dd-MM-yyyy"
        onChange={(date) => {
          this.setState({ selectedDate: date });
          const isValid = moment(date, ["DD-MM-YYYY"]).isValid();
          let formatedDate = "";
          if (isValid) formatedDate = moment(date).format("DD-MM-YYYY");
          onChange(formatedDate);
        }}
      />
    </div>

  )
}

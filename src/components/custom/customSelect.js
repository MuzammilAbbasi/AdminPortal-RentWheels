import React from 'react';
import Select from 'react-select'

const CustomSelect = ( props ) => {
  const { id, name , options } = props

  return ( { filter, onChange } ) => (
    <Select
      id={id}
      className="react-select"
      classNamePrefix="react-select"
      name={name}
      onChange={ (selectedItem) => {
        onChange( selectedItem.value ) // trigger onChange() with selected value.
      }}
      options={options}
    />
  );
}

export default CustomSelect;
import * as Yup from "yup";

const formFields = [

    {
        label: 'label.purOfPayment',
        name: 'purOfPayment',
        className: 'p-10',
        type: 'select',
        disabled: false,
        colxx: "4",
    },
    {
      label: 'label.dropZone',
      name: 'dropZone',
      // className: 'mb-10',
      type: 'dropZone',
      disabled: false,
      colxx: "9",
    },
]


const shape ={
  
  cnic:Yup.string().required('Required')
  .min(13, "Too Short!")
  .max(13,"Too Long!")
  .matches(/^[0-9]+$/, "Invalid CNIC")
}



const validationSchema = Yup.object().shape(shape);

export {
  formFields,
  validationSchema
}
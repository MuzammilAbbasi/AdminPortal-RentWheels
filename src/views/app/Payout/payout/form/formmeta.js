import * as Yup from "yup";

const formFields = [
    {
        label: 'label.date',
        name: 'rangeDate',
        // type: 'rangeDate',
        type: 'date',
        disabled: false,
        colxx: "3",
        // className: "m-20"
      },
]

const shape ={
  // rangeDate:Yup.string().required('Required')
  
   cnic:Yup.string().required('Required')
   .min(13, "Too Short!")
   .max(13,"Too Long!")
   .matches(/^[0-9]+$/, "Invalid CNIC")
   .required("CNIC is required!")
}
const validationSchema = Yup.object().shape(shape);

export {
  formFields,
  validationSchema,
}
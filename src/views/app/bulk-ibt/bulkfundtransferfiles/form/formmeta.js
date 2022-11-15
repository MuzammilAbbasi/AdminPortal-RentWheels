import * as Yup from "yup";

const formFields = [
  {
    label: "label.username",
    name: "userName",
    type: "textbox",
    disabled: true,
    colxx: "6",
  },

  {
    label: "label.reasonInterTransactionStatus",
    name: "reasontransactions",
    type: "textbox",
    // type: 'date',
    disabled: true,
    colxx: "6",
  },

  {
    label: "label.cli",
    name: "cli",
    type: "textbox",
    disabled: true,
    colxx: "6",
  },
  {
    label: "label.dateandtime",
    name: "dateandtime",
    type: "textbox",
    disabled: true,
    colxx: "6",
  },
  {
    label: "label.todateandtime",
    name: "todateandtime",
    type: "textbox",
    disabled: true,
    colxx: "6",
  },
  {
    label: "label-blockrequest",
    name: "blockreq",
    type: "textbox",
    disabled: true,
    colxx: "6",
  },
  {
    label: "label-outboundcall",
    name: "outboundcall",
    type: "select",
    disabled: true,
    colxx: "6",
  },
];

const shape = {
  // rangeDate:Yup.string().required('Required'),

  cnic: Yup.string()
    .required("Required")
    .min(13, "Too Short!")
    .max(13, "Too Long!")
    .matches(/^[0-9]+$/, "Invalid CNIC")
    .required("CNIC is required!"),
  // userName:Yup.string().required('Required'),
  // account:Yup.string().required('Required'),
};

const validationSchema = Yup.object().shape(shape);

export { formFields,validationSchema };

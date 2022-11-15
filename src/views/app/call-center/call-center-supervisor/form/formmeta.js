import * as Yup from "yup";

const formFields = [
  {
    label: "label.customerCnic",
    name: "customerCnic",
    type: "textbox",
    disabled: true,
    colxx: "6",
  },

  {
    label: "label.customerAccountNumber",
    name: "customerAccountNumber",
    type: "textbox",
    // type: 'date',
    disabled: true,
    colxx: "6",
  },

  {
    label: "label.userDeactivateDatetime",
    name: "userDeactivateDatetime",
    type: "textbox",
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
    label: "label.reasonUserDeactivate",
    name: "reasonUserDeactivate",
    type: "textbox",
    disabled: true,
    colxx: "6",
  },
  {
    label: "label.blockRequest",
    name: "blockRequest",
    type: "textbox",
    disabled: true,
    colxx: "6",
  },
  {
    label: "label-outboundCall",
    name: "outboundCall",
    type: "select",
    options: [
      { value: "01", label: "N/A" },
      { value: "03", label: "YES" }
    ],
    // disabled: true,
    required:true,
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

import * as Yup from "yup";

const formFields = [
  {
    label: 'label.accTitle',
    name: 'accountTitle',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.accountNo',
    name: 'account',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.accType',
    name: 'accountType',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.idenNumber',
    name: 'identityNumber',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.taxStatus',
    name: 'taxStatus',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.occupation',
    name: 'occupation',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.phone',
    name: 'phoneNumber',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.email',
    name: 'email',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.address',
    name: 'address',
    type: 'textbox',
    disabled: true,
    colxx: "6", 
  },

  {
    label: 'label.channel',
    name: 'channel',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.currency',
    name: 'currency',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.employer',
    name: 'employer',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
 
  {
    label: 'label.address',
    name: 'kinAddress',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },

  {
    label: 'label.expiryDate',
    name: 'expiryDate',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },

  {
    label: 'label.nextOfKin',
    size : 300 ,
    colxx: "12",
  },

  {
    label: 'label.name',
    name: 'name',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },

  {
    label: 'label.idenNumber',
    name: 'idNumber',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },

  {
    label: 'label.accountNo',
    name: 'nbpAcc',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.officeAddress',
    name: 'officeAddress',
    type: 'textbox',
    disabled: true,
    colxx: "6", 
  },
  {
    label: 'label.relationship',
    name: 'relationship',
    type: 'textbox',
    disabled: true,
    colxx: "6", 
  },
  {
    label: 'label.idExpiary',
    name: 'idExpiary',
    type: 'textbox',
    disabled: true,
    colxx: "6", 
  },
  {
    label: 'label.status',
    name: 'status',
    type: 'select',
    options: [
      { value: "INPROCESS", label: "In Process", code: '01' },
      { value: "COMPLETED", label: "Complete", code: '02' },
      { value: "REJECTED", label: "Reject", code: '03' },
    ],
    disabled: false,
    colxx: "6",
  },
  {
    label: 'label.comment',
    name: 'comment',
    type: 'textbox',
    disabled: false,
    colxx: "6",
  },
]

const validationSchema = Yup.object({
  reqRemittanceAmountInFigure: Yup.string(),
  reqRemittanceCurrency: Yup.string(),
  reqRemittanceAmountInWord: Yup.string(),
  reqRemittanceCharge: Yup.string(),
  reqIban: Yup.string(),
  reqBankAccountTitle: Yup.string(),
  reqBankName: Yup.string(),
  reqBankSwiftCode: Yup.string(),
  reqIntermediaryBankName: Yup.string(),
  reqIntermediaryBankSwift: Yup.string(),
  reqRepatriation: Yup.string(),
  channel: Yup.string(),
  status: Yup.object({ 
    value: Yup.string().required('missing status.value'),
    label: Yup.string().required('missing status.label'),
    code: Yup.string().required('missing status.code')
  }).nullable().required('Invalid Status.'),
  comment: Yup.string().required('Comment is Required.')
})

export {
  formFields,
  validationSchema
}
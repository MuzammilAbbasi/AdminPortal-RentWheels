import * as Yup from "yup";

const formFields = [
  {
    label: 'label.remAmount',
    name: 'reqRemittanceAmountInFigure',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.remCurrency',
    name: 'reqRemittanceCurrency',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.remInWords',
    name: 'reqRemittanceAmountInWord',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.remCharge',
    name: 'reqRemittanceCharge',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.iban',
    name: 'reqIban',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.accTitle',
    name: 'reqBankAccountTitle',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.bankName',
    name: 'reqBankName',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.swiftCode',
    name: 'reqBankSwiftCode',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.intBankName',
    name: 'reqIntermediaryBankName',
    type: 'textbox',
    disabled: true,
    colxx: "6",
  },
  {
    label: 'label.repatriation',
    name: 'reqRepatriation',
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
    label: 'label.mobileNo',
    name: 'mobileNo',
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
    label: 'label.status',
    name: 'status',
    type: 'select',
    options: [
      { value: "INPROCESS", label: "In Process", code: "01" },
      { value: "COMPLETED", label: "Complete", code: "02" },
      { value: "REJECTED", label: "Reject", code: "03" },
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
    code: Yup.string().required('missing status.code'),
  }).nullable().required('Invalid Status.'),
  comment: Yup.string().required('Comment is Required.')
})

export {
  formFields,
  validationSchema
}
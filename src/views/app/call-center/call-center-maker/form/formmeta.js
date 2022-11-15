import * as Yup from "yup";

const formFields = [


    {
        label: 'forms.date',
        name: 'rangeDate',
        type: 'rangeDate',
        disabled: false,
        colxx: "6",
      },

    {
        label: 'label.cnic',
        name: 'cnic',
        type: 'textboxcnic',
        disabled: false,
        colxx: "6",
    },
    {
        label: 'label.username',
        name: 'userName',
        type: 'textbox',
        disabled: false,
        colxx: "6",
    },
    {
        label: 'label.accountNo',
        name: 'account',
        type: 'textbox',
        disabled: false,
        colxx: "6",
      }
]
const ProfileSyncFormFields = [

    {
        label: 'forms.cli',
        name: 'cli',
        type: 'number',
        disabled: false,
        colxx: "12",
      },

    {
        label: 'label.Comments',
        name: 'Comments',
        type: 'textarea',
        disabled: false,
        colxx: "12",
    },
    {
        label: 'label.blockingrequest',
        name: 'blockingrequest',
        type: 'select',
        options: [
          { value: "Customer Request", label: "Customer Request"},
          { value: "FRMU", label: "FRMU"},
          { value: "Compliance Request", label: "Compliance Request" },
        ],
        disabled: false,
        colxx: "12",
    }
]
const CustomerformFields = [


    {
        label: 'label.cnic',
        name: 'cnic',
        type: 'textbox',
        disabled: true,
        colxx: "6",
        
      },

    {
        label: 'label.username',
        name: 'username',
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
        label: 'card.debit',
        name: 'debitCard',
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
        // data:"hello"
      },
    {
        label: 'label.mobileNo',
        name: 'mobile_number',
        type: 'textbox',
        disabled: true,
        colxx: "6",
      },
    {
        label: 'label.MNP',
        name: 'mnp',
        type: 'textbox',
        disabled: true,
        colxx: "6",
        
      },
    {
        label: 'label.mobileAppStaus',
        name: 'mobileUserStatus',
        type: 'textbox',
        disabled: true,
        colxx: "6",
        
      }
]
const virtualcardformFields = [


    {
        label: 'card.virtual',
        name: 'virtualcard',
        type: 'textbox',
        disabled: true,
        colxx: "6",
      },

    {
        label: 'label.interTransaction',
        name: 'transaction_expirydate',
        type: 'textbox',
        disabled: true,
        colxx: "6",
    },
    {
        label: 'card.virtualStatus',
        name: 'virtualStatus',
        type: 'textbox',
        disabled: true,
        colxx: "6",
      },
    {
        label: 'label.interTransactionStatus',
        name: 'transactionStatus',
        type: 'textbox',
        disabled: true,
        colxx: "6",
      },
]



const shape ={
  // rangeDate:Yup.string().required('Required'),
  
  cnic:Yup.string().required('Required')
  .matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, "CNIC No must follow the XXXXX-XXXXXXX-X format!")
  .min(15, "Too Short!")
  .max(15,"Too Long!")
  .required("CNIC is required!"),
  userName:Yup.string().required('Username is required!'),
}

// const validationSchema = Yup.object({
//   reqRemittanceAmountInFigure: Yup.string(),
//   reqRemittanceCurrency: Yup.string(),
//   reqRemittanceAmountInWord: Yup.string(),
//   reqRemittanceCharge: Yup.string(),
//   reqIban: Yup.string(),
//   reqBankAccountTitle: Yup.string(),
//   reqBankName: Yup.string(),
//   reqBankSwiftCode: Yup.string(),
//   reqIntermediaryBankName: Yup.string(),
//   reqIntermediaryBankSwift: Yup.string(),
//   reqRepatriation: Yup.string(),
//   channel: Yup.string(),
//   status: Yup.object({ 
//     value: Yup.string().required('missing status.value'),
//     label: Yup.string().required('missing status.label'),
//     code: Yup.string().required('missing status.code')
//   }).nullable().required('Invalid Status.'),
//   comment: Yup.string().required('Comment is Required.')
// })

const validationSchema = Yup.object().shape(shape);

export {
  formFields,
  validationSchema,
  CustomerformFields,
  virtualcardformFields,
  ProfileSyncFormFields
}
import * as Yup from "yup";

const formFields = [
    {
        label: 'label.cnic',
        name: 'cnic',
        type: 'number',
        disabled: false,
        colxx: "5",
    },
]

// const cardData = [
//   { title: 'menu.benefciary-cnic', icon: "iconsminds-id-card", value: 14, text: 'cnic' },
//   { title: 'menu.mobile-number', icon: "simple-icon-call-in", value: `+9290078601`, text:'mobileNo' },
//   { title: 'menu.total-limit', icon: "iconsminds-basket-coins", value: 32, text: 'maxLimit' },
//   { title: 'menu.calculated-limit', icon: "iconsminds-arrow-refresh", value: 74, text: 'calLimit'},
//   { title: 'menu.remaining-limit', icon: "iconsminds-mail-read", value: 25, text: 'remainingLimit' }
// ]

    



const shape = {
  cnic:Yup.string().required('Required')
  // .min(13, "Too Short!")
  // .max(13,"Too Long!")
  // .matches(/^\d*\.?\d*$/, "Invalid CNIC")
  .matches(/^[0-9]{13}$/, "Invalid CNIC")
  .required("CNIC is required!")
  // userName:Yup.string().required('Required'),
  // account:Yup.string().required('Required'),
}

const validationSchema = Yup.object().shape(shape);

export {
  formFields,
  validationSchema,
  cardData
}
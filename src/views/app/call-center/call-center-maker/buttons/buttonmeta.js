const buttonFields = [


    {
        label: "submit-button",
        className:"m-1 text-right",
        color:"primary",
        outline: false,
        field:{
          fieldName:"isTabon",
          value: true
        }
      },
      // {
      //   label: "reject-button",
      //   className:"m-1 text-right",
      //   color:"primary",
      //   outline: false,
      //   field:{
      //     fieldName:"isTabon",
      //     value:"hello"
      //   }
      // },
      // {
      //   label: "delete-button",
      //   className:"m-1 text-right",
      //   color:"primary",
      //   outline: false,
      //   field:{
      //     fieldName:"isTabon",
      //     value:"bad"
      //   }
      // },
    // {
    //     label: 'label.filedetails',
    //     className:"m-1 text-right",
    //     color:"danger",
    //     outline : true
    //   },

]

const buttonDetailFields = [
  {
    label: "Profile-button",
    className:"m-1 text-right",
    color:"secondary",
    outline: true,
    field:{
      fieldName:"isDetailsbtn",
      value: "profileSync"
    }
  },
  {
    label: "temporary-block-button",
    className:"m-1 text-right",
    color:"warning",
    outline: true,
    field:{
      fieldName:"isDetailsbtn",
      value:"TemporaryBlock"
    }
  },
  {
    label: "permanently-block-button",
    className:"m-1 text-right",
    color:"danger",
    outline: false,
    field:{
      fieldName:"isDetailsbtn",
      value:"PermanentlyBlock"
    }
  }
]

const Virtualbutton = [
  {
    label: "Profile-button",
    className:"m-1 text-right",
    color:"secondary",
    outline: true,
    field:{
      fieldName:"isDetailsbtn",
      value: " Enable / Disable International Transaction "
    }
  },
  {
    label: "temporary-block-button",
    className:"m-1 text-right",
    color:"warning",
    outline: true,
    field:{
      fieldName:"isDetailsbtn",
      value:"Deactivate Card"
    }
  },
  {
    label: "permanently-block-button",
    className:"m-1 text-right",
    color:"danger",
    outline: false,
    field:{
      fieldName:"isDetailsbtn",
      value:"Delete Card"
    }
  }
]
export {
buttonFields,
buttonDetailFields,
Virtualbutton
}
function getNodes(perm) {
  const childItems = getChildItem(perm);
  if (childItems.length > 0) {
    const multiple = [];
    childItems.forEach((child) => {
      multiple.push(getNodes(child));
    });
    return getMultipleItem(multiple, perm);
  }

  return getSingleItem(perm);
}

function getSingleItem(item) {
  return {
    id: item.id.toString(),
    icon: item.icon,
    label: item.menuLabel,
    to: item.pageUrl,
    newWindow: item.type === "external",
  };
}

function getMultipleItem(childItems, item) {
  return {
    id: item.id.toString(),
    icon: item.icon,
    label: item.menuLabel,
    to: item.pageUrl,
    subs: childItems,
  };
}

function getChildItem(o) {
  const childItems = [];
  const permissions = JSON.parse(
    sessionStorage.getItem("user")
  ).permissions.filter((x) => x.type === "menu");
  permissions.forEach((p) => {
    if (o.id === p.parentId) {
      childItems.push(p);
    }
  });
  return childItems;
}

export function createMenu() {
  const menu = [];
  // console.log(sessionStorage.getItem("user"),"SessionStorage...");
  // console.log(JSON.parse(sessionStorage.getItem("user")).permissions,".permissions  ...");
  // const permissions = JSON.parse(
  //   sessionStorage.getItem("user")
  // ).permissions.filter((x) => x.type === "menu" || x.type === "external");
  // console.log(permissions,"Permissions");
  // permissions.forEach((o) => {
  //   if (o.parentId === -1) {
  //     menu.push(getNodes(o));
  //   }
  // });
  menu.push({
    title: "menu.dashboard",
    icon: "iconsminds-shop-4",
    to: "/app/dashboard/home",
    type: "menu",
    value: "",
    id: "menu.dashboard",
    // icon: "iconsminds-shop-4",
    label: "menu.dashboard",
  });
  menu.push({
    title: "menu.callcenter",
    icon: "simple-icon-call-out",
    // to: "/app/bulk-ibt/BulkFundTransferTransactions",
    type: "menu",
    value: "",
    id: "menu.callcenter",
    // icon: "iconsminds-shop-4",
    label: "menu.callcenter",
    to: "/app/call-center/CallCenter",
    subs: [
      {
        id: "menu.CallCenter",
        icon: "simple-icon-call-in",
        label: "menu.CallCenter",
        to: "/app/call-center/CallCenter",
      },
      {
        id: "menu.CallCenterSupervisor",
        icon: "iconsminds-rotation-390",
        label: "menu.CallCenterSupervisor",
        to: "/app/call-center/CallCenterSupervisor",
      },
    ],
  });
  menu.push({
    title: "transaction.title",
    icon: "iconsminds-dollar",
    to: "/app/transaction/SAFTransactionResult",
    type: "menu",
    value: "",
    id: "transaction.title",
    label:"transaction.title",
    // icon: "iconsminds-shop-4",
    subs: [
      {
        id: "menu.safTransaction",
        icon: "iconsminds-financial",
        label: "menu.safTransaction",
        to: "/app/transaction/SAFTransactionResult",
      },
      {
        id: "menu.mobileAppTransaction",
        icon: "simple-icon-screen-smartphone",
        label: "menu.mobileAppTransaction",
        to: "/app/transaction/MobileAppTransactions",
      },
      {
        id: "menu.incomingibft",
        icon: "iconsminds-shuffle-1",
        label: "menu.incomingibft",
        to: "/app/transaction/IncomingIBFT",
      },
      {
        id: "menu.payToCnic",
        icon: "iconsminds-id-card",
        label: "menu.payToCnic",
        to: "/app/transaction/PaytoCnic",
      },
      {
        id: "menu.merchantTransaction",
        icon: "iconsminds-safe-box",
        label: "menu.merchantTransaction",
        to: "/app/transaction/MerchantTransaction",
      },
      {
        id: "menu.yearlySummaryTransaction",
        icon: "iconsminds-calendar-4",
        label: "menu.yearlySummaryTransaction",
        to: "/app/transaction/YearlyTransactionReport",
      },
      {
        id: "menu.yearlyActivityTransaction",
        icon: "iconsminds-calendar-1",
        label: "menu.yearlyActivityTransaction",
        to: "/app/transaction/YearlyActivityReport",
      },
      {
        id: "menu.monthlySummaryTransaction",
        icon: "simple-icon-calendar",
        label: "menu.monthlySummaryTransaction",
        to: "/app/transaction/MonthlyTransactionReport",
      },
      {
        id: "menu.monthlyActivityTransaction",
        icon: "iconsminds-billing",
        label: "menu.monthlyActivityTransaction",
        to: "/app/transaction/MonthlyActivityReport",
      },
      {
        id: "menu.DailyActivityReport",
        icon: "iconsminds-calendar-1",
        label: "menu.DailyActivityReport",
        to: "/app/transaction/DailyActivityReport",
      },
    ],
  });
  menu.push({
    title: "Nonfinacialtransaction.title",
    icon: "iconsminds-dollar",
    to: "/app/NonFinancialTransactions/DailyActivityReport",
    type: "menu",
    value: "",
    id: "Nonfinacialtransaction.title",
    label:"Nonfinacialtransaction.title",
    // icon: "iconsminds-shop-4",
    subs: [
      {
        id: "menu.dailyregistration",
        icon: "iconsminds-financial",
        label: "menu.dailyregistration",
        to: "/app/NonFinancialTransactions/DailyActivityReport",
      },
      {
        id: "menu.monthlyregistration",
        icon: "iconsminds-id-card",
        label: "menu.monthlyregistration",
        to: "/app/NonFinancialTransactions/MonthlyActivityReport",
      },
      
      {
        id: "menu.yearlywiseregistration",
        icon: "iconsminds-safe-box",
        label: "menu.yearlywiseregistration",
        to: "/app/NonFinancialTransactions/YearlySummaryReport",
      },
      {
        id: "menu.monthlywisetransaction",
        icon: "iconsminds-shuffle-1",
        label: "menu.monthlywisetransaction",
        to: "/app/NonFinancialTransactions/MonthlyNonFinancialActivityReport",
      },
      {
        id: "menu.dailywisetransaction",
        icon: "simple-icon-screen-smartphone",
        label: "menu.dailywisetransaction",
        to: "/app/NonFinancialTransactions/DailyNonFinancialActivityReport",
      },
      
      
    ],
  });
  menu.push({
    title: "menu.bulk-ibt",
    icon: "iconsminds-arrow-mix",
    // to: "/app/bulk-ibt/BulkFundTransferTransactions" ,
    type: "menu",
    value: "",
    id: "menu.bulk-ibt",
    // icon: "iconsminds-shop-4",
    label: "menu.bulk-ibt",
    to: "/app/bulk-ibt",
    subs: [
      {
        id: "menu.bulktransferinitialize",
        icon: "iconsminds-suitcase",
        label: "menu.bulktransferinitialize",
        to: "/app/bulk-ibt/fund-transfer-transactions",
      },
      {
        id: "menu.bulktransferpay",
        icon: "iconsminds-rotation-390",
        label: "menu.bulktransferpay",
        to: "/app/bulk-ibt/supervisor-payment",
      },
    ],
  });
  menu.push({
    title: "menu.bulk-ibft",
    icon: "iconsminds-financial",
    // to: "/app/bulk-ibt/BulkFundTransferTransactions",
    type: "menu",
    value: "",
    id: "menu.bulk-ibft",
    // icon: "iconsminds-shop-4",
    label: "menu.bulk-ibft",
    to: "/app/bulk-ibft",
    subs: [
      {
        id: "menu.transferinitialize",
        icon: "iconsminds-financial",
        label: "menu.transferinitialize",
        to: "/app/bulk-ibft/fund-transactions",
      },
      {
        id: "menu.transferpay",
        icon: "iconsminds-billing",
        label: "menu.transferpay",
        to: "/app/bulk-ibft/supervisor-payment",
      },
    ],
  });
  menu.push({
    title: "collapse.mobile-app-registration",
    icon: "simple-icon-screen-smartphone",
    to: "/app/registration/MobileAppRegistration",
    type: "menu",
    value: "",
    id: "collapse.mobile-app-registration",
    // icon: "iconsminds-shop-4",
    label: "collapse.mobile-app-registration",
  });
  menu.push({
    title: "collapse.self-registration",
    icon: "iconsminds-male",
    to: "/app/registration/SelfRegistration",
    type: "menu",
    value: "",
    id: "collapse.self-registration",
    // icon: "iconsminds-shop-4",
    label: "collapse.self-registration",
  });
  menu.push({
    title: "collapse.self-registration-supervisor",
    icon: "iconsminds-network",
    to: "/app/registration/SelfRegistrationSupervisor",
    type: "menu",
    value: "",
    id: "collapse.self-registration-supervisor",
    // icon: "iconsminds-shop-4",
    label: "collapse.self-registration-supervisor",
  });
  
  menu.push({
    title: "collapse.analytics",
    icon: "iconsminds-monitor-analytics",
    to: "/app/Analytics/analytics",
    type: "menu",
    value: "",
    id: "collapse.analytics",
    // icon: "iconsminds-shop-4",
    label: "collapse.analytics",
  });
  
  

  return menu;
}

// const data = [
//   {
// id: "dashboard",
// icon: "iconsminds-shop-4",
// label: "menu.dashboard",
// to: "/app/dashboard",
// subs: [
//   {
//     id: "home",
//     icon: "simple-icon-home",
//     label: "menu.home",
//     to: "/app/dashboard/home"
//   }
// ]
//   },
//   {
//     id: "usermanagement",
//     icon: "iconsminds-management",
//     label: "menu.user-management",
//     to: "/app/user-management",
//     subs: [
//       {
//         id: "institution",
//         icon: "simple-icon-organization",
//         label: "menu.institution",
//         to: "/app/user-management/institution"
//       },
//       {
//         id: "role",
//         icon: "iconsminds-tag",
//         label: "menu.role",
//         to: "/app/user-management/role"
//       },
//       {
//         id: "user",
//         icon: "simple-icon-people",
//         label: "menu.user",
//         to: "/app/user-management/user"
//       },
//     ]
//   },

// ];

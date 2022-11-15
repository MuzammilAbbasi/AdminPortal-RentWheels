const development = {
    url: {
      // backoffice: "http://13.73.143.92:4000/backoffice/",
      // rda: 'http://13.73.143.92:9001/',
      backoffice: "http://13.73.143.92:9010/backoffice/",
      ib_backoffice: "http://localhost:8082/ib-backoffice/",
      // rda: 'http://13.73.143.92:9001/',
    },
    endpoint: {
      backoffice: {
        get: "get",
        institution: "institution/",
        batch: "batch/",
        list: "list/",
        role: "role/",
        permission: "permission/",
        user: "user/",
        login: "login/",
        logout: "logout/",
        processChecker: "process/getmergelist/",
        processMaker: "process/getreturnedmergelist/",
        addUserReviewChecker: "user/reviewtasks",
        editUserReviewChecker: "user/updatereviewtasks",
        addUserReviewMaker: "user/reviewReturnedTasks",
        editUserReviewMaker: "user/updatereviewreturnedtasks",
        addRoleReviewChecker: "role/reviewtasks",
        editRoleReviewChecker: "role/updatereviewtasks",
        addRoleReviewMaker: "role/reviewReturnedTasks",
        editRoleReviewMaker: "role/updatereviewreturnedtasks",
        changeUserPassword: "user/changeUserPassword",
      },
      rda: {
        repatriation: 'repatriation',
        updateRepatriation: 'repatriation/status',
        ips: 'ips',
        updateRequest: 'ips/status',
        tBills: 't-bills',
        updatetBills: 't-bills/status',
        pibs: 'pibs',
        updatepibs: 'pibs/status',
        accountMaintenance: 'account-maintenance',
        updateAccountMaintenance: 'account-maintenance/status',
      },
      nbpdigital:{
        analytics:'DashboardStats/getDashboardData'
      },

      backoffice_ib:{
        callCenter:{
          customerMobileActivityTab:"CallCenter/getCustomerMobileActivityTab",
          customerMobileDemographicDetail:"CallCenter/getCustomerMobileDemographicDetail",
          callCentreDemographicEdit:"CallCenter/CallCentreDemographicEdit",
          permanentlyAppBlock:"CallCenter/PermanentlyAppBlock",
          ActivitateMobileApp:"CallCenter/ActivitateMobileApp",
          temporaryAppBlock:"CallCenter/TemporaryAppBlock",
          virtualCardDetails:"CallCenter/getVirtualCardDetail"
        },
        callCenterSupervisor:{
          makerTransactionDetails:"CallCenterSupervisor/getMakerTransactionDetails",
          indexDetail:"CallCenterSupervisor/Index",
          approveUserStatus:"CallCenterSupervisor/ApprovedUserStatus",
          rejectUserStatus:"CallCenterSupervisor/RejectUserStatus",
          rejectTransactionStatus:"CallCenterSupervisor/RejectTransactionStatus",
          approveTransactionStatus:"CallCenterSupervisor/ApprovedTransactionStatus",
        },
        selfRegistration:{
          selfRegistrationIndex:"Registration/SelfRegistration",
          selfRegistrationUserExportExcel:"Registration/SelfRegistration/ExportExcelFromDatabase",
          approveUserStatus:"CallCenterSupervisor/ApprovedUserStatus",
          rejectUserStatus:"CallCenterSupervisor/RejectUserStatus",
          rejectTransactionStatus:"CallCenterSupervisor/RejectTransactionStatus",
          approveTransactionStatus:"CallCenterSupervisor/ApprovedTransactionStatus",
        }
      }
    },
    values:{
      dashboardTime: 300000,
    }
  };
  
  const production = {
    url: {
      backoffice: "http://13.73.143.92:4000/backoffice/",
      rda: 'http://13.73.143.92:9001/',
    },
    endpoint: {
      backoffice: {
        institution: "institution/",
        batch: "batch/",
        list: "list/",
        role: "role/",
        permission: "permission/",
        user: "user/",
        login: "login/",
        logout: "logout/",
        processChecker: "process/getmergelist/",
        processMaker: "process/getreturnedmergelist/",
        addUserReviewChecker: "user/reviewtasks",
        editUserReviewChecker: "user/updatereviewtasks",
        addUserReviewMaker: "user/reviewReturnedTasks",
        editUserReviewMaker: "user/updatereviewreturnedtasks",
        addRoleReviewChecker: "role/reviewtasks",
        editRoleReviewChecker: "role/updatereviewtasks",
        addRoleReviewMaker: "role/reviewReturnedTasks",
        editRoleReviewMaker: "role/updatereviewreturnedtasks",
        changeUserPassword: "user/changeUserPassword",
      },
      rda: {
        repatriation: 'repatriation',
        updateRepatriation: 'repatriation/status',
        ips: 'ips',
        updateIpsRequest: 'ips/status',
      }
    },
  };
  
  const environment = 'development'
  const config = environment === "production" ? production : development;
  
  // Attach Config to window object
  window.config = config
  Window.prototype.getConfig = () => config


//   const config = process.env.NODE_ENV === "production" ? production : development;
  
//   export default config;

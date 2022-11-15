// import { Colxx } from "components/common/CustomBootstrap";
// import IntlMessages from "helpers/IntlMessages";
// import React from "react";
// import Breadcrumb from "reactstrap/lib/Breadcrumb";

// import TabLayout from "../../../../components/custom/TabLayout";
// import EhsasPortalDetails from "./EhsasPortalDetails";
// import NbpChecks from "./NbpChecks"
// import ThirdPartyVerification from "./ThirdPartyVerification"
// import { useHistory, useRouteMatch } from "react-router-dom";
// import Button from "reactstrap/lib/Button";
// const MerchantInfoDetails = () => {


  
//   /* Information of Routing */
//   const match = useRouteMatch("/app/merchantDetails");
//   /*End of Information of Routing */

//   /* Routing Change */
//   const history = useHistory();
//   /* End of Routing Change */

//   return (
//     <>
//       {/* <Colxx xxs="12">
//          <h1>
//         <IntlMessages id="Merchant Detail" />

        
//       </h1>
   
//       </Colxx> */}
//       <Colxx  xxs="12" >
//         <div  className="mb-3" style={{display:"flex",flexDirection:"row-reverse"}}>
     
//       <Button color="primary" onClick={()=> console.log()} className="ml-2">
//                     <IntlMessages id="Approve" />
//                   </Button>
//                   <Button color="danger" type="submit" >
//                     <IntlMessages id="Decline" />
//                   </Button>
//                   </div>
//       </Colxx>
      

//       <Colxx xxs="12">
//         <TabLayout
//           tabs={[
//             {
//               id: "1",
//               label: "Customer Demographic",
//               Component: <EhsasPortalDetails/>,
//             },
//             {
//               id: "2",
//               label: "Mobile Application Activity",
//               Component: <NbpChecks />,
//             },
            
//             {
//                 id: "3",
//                 label: "Virtual Card",
//                 Component: <ThirdPartyVerification />,
//               },
//           ]}
//         />
//       </Colxx>
//     </>
//   );
// };

// export default MerchantInfoDetails;

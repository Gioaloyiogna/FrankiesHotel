// import { Calendar } from 'antd';
// import { SetStateAction, useState } from 'react';
// import { GuestDetails } from '../../guestsFormEntry/GuestDetails';
// // import ReservationPage from './ReservationPage';
// // import CheckinPage from './CheckinPage';
// // import CheckoutPage from './CheckoutPage';

// const WalkInPlanning = () => {
//   const [activeButton, setActiveButton] = useState('reservation');

//   const handleButtonClick = (buttonName: SetStateAction<string>) => {
//     setActiveButton(buttonName);
//   };

//   const renderPage = () => {
//     switch (activeButton) {
//       case 'reservation':
//         return <Calendar />;
//       case 'checkin':
//         return <GuestDetails />;
//       case 'checkout':
//         return <GuestDetails />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <button
//           style={{
//             height: '50px',
//             width: '200px',
//             backgroundColor: activeButton === 'reservation' ? '#1e1e2d' : '#f5f5f5',
//             borderRadius: '8px',
//             marginLeft: '10px',
//             fontWeight: 'bold',
//             fontSize: '16px',
//             color: activeButton === 'reservation' ? '#fff' : '#333',
//             cursor: 'pointer',
//           }}
//           onClick={() => handleButtonClick('reservation')}
//         >
//           Reservation
//         </button>
//         <button
//           style={{
//             height: '50px',
//             width: '200px',
//             backgroundColor: activeButton === 'checkin' ? '#1e1e2d' : '#f5f5f5',
//             borderRadius: '8px',
//             marginLeft: '10px',
//             fontWeight: 'bold',
//             fontSize: '16px',
//             color: activeButton === 'checkin' ? '#fff' : '#333',
//             cursor: 'pointer',
//           }}
//           onClick={() => handleButtonClick('checkin')}
//         >
//           Check In
//         </button>
//         <button
//           style={{
//             height: '50px',
//             width: '200px',
//             backgroundColor: activeButton === 'checkout' ? '#1e1e2d' : '#f5f5f5',
//             borderRadius: '8px',
//             marginLeft: '10px',
//             fontWeight: 'bold',
//             fontSize: '16px',
//             color: activeButton === 'checkout' ? '#fff' : '#333',
//             cursor: 'pointer',
//           }}
//           onClick={() => handleButtonClick('checkout')}
//         >
//           Check Out
//         </button>
//       </div>
//       {renderPage()}
//     </>
//   );
// };

// export default WalkInPlanning;



import axios from 'axios'
// import {Calendar} from './calendar/Calendar'
import {Link, useNavigate} from 'react-router-dom'
import {useQuery} from 'react-query'
import {SetStateAction, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import {BASE_URL} from "../../../urls";
import {Space} from "antd";
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";
// import {fetchDepartments, fetchLeaveTypes} from "../../../../../services/ApiCalls";
import {Calendar} from './calendar/Calendar';
import { GuestDetails } from '../../guestsFormEntry/GuestDetails';
import { CheckIn } from './checkIn/checkIn';
import { CheckOut } from './checkOut/checkOut';

const WalkInPlanning = () => {
  let dropDownListObj: any
  const [chosenFilter, setChosenFilter] = useState(null)
  const [activeButton, setActiveButton] = useState('reservation');
  const navigate = useNavigate()

  const handleButtonClick = (buttonName: SetStateAction<string>) => {
    setActiveButton(buttonName);
    console.log(`${buttonName} button clicked!`);
  };

  const renderPage = () => {
    switch (activeButton) {
      case 'reservation':
        return <Calendar/>;
      case 'checkin':
        return <CheckIn />;
      case 'checkout':
        return <CheckOut />;
      default:
        return null;
    }
  };
  return (
    <>
      <KTCard>
        <KTCardBody className='py-5 px-2 d-flex '>
        {/* <KTCardBody className='py-5 px-2 d-flex justify-content-between'> */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px',width:'200px', backgroundColor: activeButton === 'reservation' ? '#1e1e2d' : '#f5f5f5', borderRadius: '8px',marginLeft: '10px' }}>
        <button style={{ flex: 1, height: '100%',border: 'none', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: '16px', color: activeButton === 'reservation' ? '#fff' : '#333', cursor: 'pointer' }} onClick={() => handleButtonClick('reservation')}>Reservation</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px',width:'200px', backgroundColor: activeButton === 'checkin' ? '#1e1e2d' : '#f5f5f5', borderRadius: '8px',marginLeft: '10px' }}>
        <button style={{ flex: 1, height: '100%',border: 'none', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: '16px', color: activeButton === 'checkin' ? '#fff' : '#333', cursor: 'pointer' }} onClick={() => handleButtonClick('checkin')}>Check In</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px',width:'200px', backgroundColor: activeButton === 'checkout' ? '#1e1e2d' : '#f5f5f5', borderRadius: '8px',marginLeft: '10px' }}>
        <button style={{ flex: 1, height: '100%',border: 'none', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: '16px', color: activeButton === 'checkout' ? '#fff' : '#333', cursor: 'pointer' }} onClick={() => handleButtonClick('checkout')}>Check Out</button>
      </div>

          {/* <Space style={{marginBottom: 16}}>
          </Space>
          <div>
            <DropDownListComponent ref={(dropdownlist) => { dropDownListObj = dropdownlist }} id="ddlelement" dataSource={[]} placeholder="Filter by leave type" change={() => setChosenFilter(dropDownListObj.value)}></DropDownListComponent>
          </div> */}
        </KTCardBody>
        {/* <Calendar chosenFilter={chosenFilter} /> */}
        {renderPage()}
      </KTCard>
    </>
  )
}

export {WalkInPlanning}




// // import axios from 'axios'
// // // import {Calendar} from './calendar/Calendar'
// // import {Link, useNavigate} from 'react-router-dom'api
// // import {useQuery} from 'react-query'
// // import {useState} from 'react'
// // import {KTCard, KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
// // import {BASE_URL} from "../../../urls";
// // import {Space} from "antd";
// // import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";
// // import {fetchDepartments, fetchLeaveTypes} from "../../../../../services/ApiCalls";
// // import Calendar from './calendar/Calendar';

// // const WalkInPlanning = () => {
// //   let dropDownListObj: any
// //   const [chosenFilter, setChosenFilter] = useState(null)
// //   const navigate = useNavigate()


// //   return (
// //     <>
// //       <KTCard>
// //         <KTCardBody className='py-5 px-2'>
// //           <div className='d-flex justify-content-between'>
// //             <Space style={{marginBottom: 16}}>
// //             </Space>
// //           </div>
// //           <Calendar chosenFilter={chosenFilter} />
// //         </KTCardBody>
// //       </KTCard>
// //     </>
// //   )
// // }

// // export {WalkInPlanning}

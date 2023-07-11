import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import '@syncfusion/ej2-base/styles/material.css'
import '@syncfusion/ej2-calendars/styles/material.css'
import '@syncfusion/ej2-dropdowns/styles/material.css'
import '@syncfusion/ej2-inputs/styles/material.css'
import '@syncfusion/ej2-lists/styles/material.css'
import '@syncfusion/ej2-navigations/styles/material.css'
import '@syncfusion/ej2-popups/styles/material.css'
import '@syncfusion/ej2-splitbuttons/styles/material.css'
import '@syncfusion/ej2-react-schedule/styles/material.css'
import '@syncfusion/ej2-buttons/styles/material.css'
import {Alert, message, Space, Spin} from 'antd'
import axios from 'axios'
import {L10n} from '@syncfusion/ej2-base'
import {
  ScheduleComponent,
  Month,
  Day,
  Week,
  ViewsDirective,
  ViewDirective,
  TimelineViews,
  TimelineMonth,
  Inject,
  ResourcesDirective,
  ResourceDirective,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule'
// import {Input, message} from 'antd'
import {
  Api_Endpoint,
  fetchRooms,
  fetchGuests,
  fetchBookings,
} from '../../../../../../services/ApiCalls'
import {BASE_URL} from '../../../../urls'
import './index.css'
//Editing editor buttons
L10n.load({
  'en-US': {
    schedule: {
      saveButton: 'Book',
      cancelButton: 'Cancel',
      deleteButton: 'Remove',
      newEvent: 'Book Room',
    },
  },
})

const Calendar = () => {
  let scheduleObj
  let queryClient = useQueryClient()
  const {data: roomsdata} = useQuery('rooms', fetchRooms)
  const {data: guestsdata} = useQuery('guests', fetchGuests)
  const {data: bookingsdata} = useQuery('bookings', fetchBookings)
  const {mutate: addNewBooking} = useMutation((values) => axios.post(`${BASE_URL}/Booking`, values))

  // console.log('Guests ',guestsdata)
  // console.log('Guests ',guestsdata?.data[0])
  // console.log('Rooms ',roomsdata?.data[0])
  // console.log('Booking ',bookingsdata?.data)
  const listData = guestsdata?.data.map((e) => {
    // console.log('e',e?.firstname+' '+e?.lastname)
    return {
      id: e?.id,
      name: e?.firstname + ' ' + e?.lastname,
    }
  })

  const onActionBegin = (args) => {
    // console.log('first args', args)
    // args.cancel = true
    // console.log('args', args)

    if (args.data !== undefined) {
      const data = args.data[0] ? args.data[0] : args.data
      // console.log(args?.data[0].Room)
      // console.log(roomsdata?.data.filter(e=>e.name===args?.data[0].Room))
      const dat = roomsdata?.data.find((e) => e.name === args?.data[0].Room)
      // console.log('dat ',dat);
      // console.log('dat.id ',dat['id']);
      // for (let index = 0; index < roomsdata?.data.length; index++) {
      //   // const element = array[index];

      // }
      //Save
      if (args.requestType === 'eventCreate') {
        // console.log("This one here")
        const bookingSchedule = {
          // room: roomsdata?.data[args?.data?.Id-1]?.id,
          roomId: dat['id'],
          bookStart: data.StartTime,
          bookEnd: data.EndTime,
          guestId: data.guests,
          timestamp: new Date(),
          // gameTypeId: data.gameType,
        }

        // if (args.elementType === 'monthCells' && bookingsdata?.data) {
        //   const roomIndex = parseInt(args.element.getAttribute('data-group-index')) + 1

        //   const cellDate = new Date(parseInt(args.element.getAttribute('data-date')))
        //     .toISOString()
        //     .split('T')[0]

        //   const newRooms = bookingsdata?.data.filter((item) => {
        //     const startDate = new Date(item.bookStart).toISOString().split('T')[0]
        //     const endDate = new Date(item.bookEnd).toISOString().split('T')[0]

        //     return (
        //       parseInt(item.roomId) === parseInt(roomIndex) &&
        //       cellDate <= endDate &&
        //       cellDate >= startDate
        //     )
        //   })

        //   if (newRooms !== null && newRooms.length > 0) {
        //     args.element.style.backgroundColor = '#9f9ea3'
        //   }
        //   console.log('data', bookingsdata?.data)
        // } else {
        //   return false
        // }
        const filteredData = bookingsdata?.data.filter((item) => {
          const startDate = new Date(item.bookStart).toISOString().split('T')[0]
          const endDate = new Date(item.bookEnd).toISOString().split('T')[0]
          const startTime = new Date(data.StartTime).toISOString().split('T')[0]
          const endTime = new Date(data.EndTime).toISOString().split('T')[0]
          return (
            startDate <= endTime &&
            startDate >= startTime &&
            endDate <= endTime &&
            endDate >= startTime
          )
        })

        if (filteredData.length > 0) {
          message.info('Room might have been reserved on the specified date!')
          return
        } else {
          addNewBooking(bookingSchedule, {
            onSuccess: () => {
              message.success('Booking made successfully')
              queryClient.invalidateQueries('bookings')
            },
            onError: (error) => {
              message.error('Booking failed')
            },
          })
        }
        // addNewBooking(bookingSchedule, {
        //   onSuccess: () => {
        //     message.success('Booking made successfully')
        //     queryClient.invalidateQueries('bookings')
        //   },
        //   onError: (error) => {
        //     message.error('Booking failed')
        //   },
        // })
      }

      //Edit
      if (args.requestType === 'eventChange') {
        console.log('gameSchedule Edit', args)
        const gameSchedule = {
          id: data.id,
          subject: data.Subject,
          startTime: data.StartTime,
          endTime: data.EndTime,
          description: data.guest,
          gameTypeId: data.gameType,
        }
        // updateGameSchedule(gameSchedule)
      }

      if (args.requestType === 'eventRemove') {
        // deleteGameSchedule(data)
      }
    }
  }
  // console.log('gameType', gameType)
  let dropDownListObject //to access the dropdownlist component
  function editorTemplate(props) {
    // console.log('props in editor ', props)
    // console.log('roomName ', roomName)
    // console.log('props ', props['Name'])
    // console.log('props ', props['StartTime'])
    var startT = props['StartTime']
    var Room = props['Name']
    return props !== undefined ? (
      <table className='custom-event-editor' style={{width: '100%'}} cellPadding={5}>
        <tbody>
          <tr>
            <td className='e-textlabel'>Room</td>
            <td colSpan={4}>
              <input
                id='title'
                placeholder='Room'
                data-name='Room'
                name='Room'
                className='e-field e-input'
                type='text'
                style={{width: '100%'}}
                defaultValue={roomsdata?.data[props['Name'] - 1]?.name}
                disabled
              />
            </td>
          </tr>

          <tr>
            <td className='e-textlabel'>Guest</td>
            <td colSpan={4}>
              <DropDownListComponent
                id='guests'
                placeholder='Guest Name'
                data-name='guests'
                className='e-field'
                dataSource={listData}
                fields={{text: 'name', value: 'id'}}
                // value={props && props.gameTypeId ? props.gameTypeId : null}
                style={{width: '100%'}}
              />
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>From</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                id='StartTime'
                format='dd/MM/yy hh:mm a'
                data-name='StartTime'
                name={'StartTime'}
                // defaultValue={startT}
                value={props['StartTime'] ? props['StartTime'] : props['StartTime']}
                // disabled
                className='e-field'
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>To</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                id='EndTime'
                format='dd/MM/yy hh:mm a'
                data-name='EndTime'
                name={'EndTime'}
                value={props && props['EndTime'] ? new Date(props['EndTime']) : props['EndTime']}
                className='e-field'
              ></DateTimePickerComponent>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      message.error('Please select an event')
    )
  }
  function quickInfoTemplatesHeader(props) {
    console.log('props', props)
  }

  // let onCellClick = (args) => {
  //   // console.log('args ',args)
  //   const today = new Date(Date.now())
  //   const startTime = new Date(args.startTime)
  //   // console.log('today ',today)
  //   // console.log('startTime ',startTime)
  //   // if (today<=startTime) {
  //   args.cancel = true
  //   scheduleObj?.openEditor(args, false)
  //   // args.element.style.backgroundColor ==='blue'
  //   // }
  //   // else{
  //   //   args.cancel = true
  //   //  message.info('Cannot set events for past days!')

  //   // }
  // }
  let onCellClick = (args) => {
    if (args.element.style.backgroundColor == 'rgb(159, 158, 163)') {
      args.cancel = false
    } else {
      args.cancel = true
    }
  }
  const onCellDoubleClick = (args) => {
    if (args.element.style.backgroundColor == 'rgb(159, 158, 163)') {
      args.cancel = true
      scheduleObj?.openEditor(args, true)
      message.info('Room already occupied!')
    } else {
      args.cancel = true
      scheduleObj?.openEditor(args, 'Add', false)
    }
  }
  function onEventRendered(args) {
    // console.log("this args ", args)
    if (!args.element || !args.data) {
      return
    }
  }
  const book = bookingsdata?.data
  // console.log(book)
  function test(e) {
    book?.find((x) => {
      // console.log("x", x)

      if (x.bookStart === '2023-06-03T00:00:00') {
        return x
      }
    })
  }

  // renderCell(args) {
  //   const currentDate = new Date(); // Get the current date
  //   const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 3); // 3 days before current date
  //   const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 27); // 27 days after current date

  //   const dateRange = [];
  //   const currentDateIndex = args.dates.findIndex(date => date.toDateString() === currentDate.toDateString());

  //   // Generate the date range from 3 days before current date to 27 days afterwards
  //   for (let i = currentDateIndex - 3; i <= currentDateIndex + 27; i++) {
  //     const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
  //     dateRange.push(date);
  //   }

  //   // Render the cells with the generated date range
  //   return dateRange.map((date, index) => {
  //     return (
  //       <div key={index}>
  //         {date.getDate()}
  //       </div>
  //     );
  //   });
  // }

  // function onRenderCell(args) {
  //   var today = new Date()
  //   args.date = today
  //   console.log('ARGS ', args.date, 'today', today)
  //   if (args.date) {
  //     if (args.elementType === 'monthCells') {
  //       const formattedDate = new Date(args.date).toISOString().split('T')[0]
  //       bookingsdata?.data.find((e) => {
  //         if (
  //           new Date(e['bookStart']).toISOString().split('T')[0] === formattedDate &&
  //           e['roomId'] === 2
  //         ) {
  //           return args.element.classList.add('e-public-holiday')
  //         }
  //       })
  //     }
  //   }
  // }

  function onRenderCell(args) {
    if (args.elementType === 'monthCells' && bookingsdata?.data) {
      const roomIndex = parseInt(args.element.getAttribute('data-group-index')) + 1

      const cellDate = new Date(parseInt(args.element.getAttribute('data-date')))
        .toISOString()
        .split('T')[0]

      const newRooms = bookingsdata?.data.filter((item) => {
        const startDate = new Date(item.bookStart).toISOString().split('T')[0]
        const endDate = new Date(item.bookEnd).toISOString().split('T')[0]

        return (
          parseInt(item.roomId) === parseInt(roomIndex) &&
          cellDate <= endDate &&
          cellDate >= startDate
        )
      })

      if (newRooms !== null && newRooms.length > 0) {
        args.element.style.backgroundColor = '#9f9ea3'
      }
    } else {
      return false
    }
  }

  return roomsdata !== undefined ? (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent
            cssClass='timeline-resource'
            dateFormat='dd MM yyyy'
            currentView='TimelineMonth'
            ref={(t) => (scheduleObj = t)}
            actionBegin={onActionBegin}
            editorTemplate={editorTemplate}
            eventRendered={onEventRendered}
            cellClick={onCellClick}
            renderCell={onRenderCell.bind(this)}
            cellDoubleClick={onCellDoubleClick}
            loading={true}
            width='100%'
            height='650px'
            group={{enableCompactView: false, resources: ['MeetingRoom']}}
            eventSettings={{template: editorTemplate}}
            quickInfoTemplatesHeader={{template: quickInfoTemplatesHeader}}
          >
            <ResourcesDirective>
              <ResourceDirective
                field='Name'
                title='Name'
                name='MeetingRoom'
                allowMultiple={true}
                dataSource={roomsdata?.data}
                textField='name'
                idField='id'
                colorField='color'
              ></ResourceDirective>
            </ResourcesDirective>
            <ViewsDirective>
              <ViewDirective option='TimelineMonth' />
            </ViewsDirective>
            <Inject services={[TimelineViews, TimelineMonth, Week, Month, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  ) : (
    <Space size='middle'>
      <Spin size='large' />
    </Space>
  )
}
export {Calendar}

// import {L10n} from '@syncfusion/ej2-base'
// import { ScheduleComponent,Month,Day,Week, ViewsDirective, ViewDirective, TimelineViews,TimelineMonth, Inject, ResourcesDirective, ResourceDirective, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
// import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
// import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'
// import {useMutation, useQuery, useQueryClient} from 'react-query'
// import '@syncfusion/ej2-base/styles/material.css'
// import '@syncfusion/ej2-calendars/styles/material.css'
// import '@syncfusion/ej2-dropdowns/styles/material.css'
// import '@syncfusion/ej2-inputs/styles/material.css'
// import '@syncfusion/ej2-lists/styles/material.css'
// import '@syncfusion/ej2-navigations/styles/material.css'
// import '@syncfusion/ej2-popups/styles/material.css'
// import '@syncfusion/ej2-splitbuttons/styles/material.css'
// import '@syncfusion/ej2-react-schedule/styles/material.css'
// import '@syncfusion/ej2-buttons/styles/material.css'
// import {Input, message} from 'antd'
// import { Api_Endpoint, fetchRooms } from '../../../../../../services/ApiCalls'
// import CustomEventTooltip from './CustomEventTooltip';

// //Editing editor buttons
// L10n.load({
//   'en-US': {
//     schedule: {
//       saveButton: 'Book',
//       cancelButton: 'Cancel',
//       deleteButton: 'Remove',
//       newEvent: 'Booking',
//     },
//   },
// })

// const Calendar = ({chosenFilter}) => {
//   const eventSettings = {
//     template: CustomEventTooltip // Set the custom tooltip component as the template
//   };
//   const {data: roomsdata, isLoading: roomsLoad} = useQuery('rooms', fetchRooms)
//   const queryClient = useQueryClient()

//   let onCellClick = (args)=>{
//     args.cancel=true;
// console.log(args);
//   }

//   return (
//     <div className='schedule-control-section'>
//       <div className='col-lg-12 control-section'>
//         <div className='control-wrapper'>
//           <ScheduleComponent
//           cssClass='timeline-resource'
//           dateFormat='dd MM yyyy'
//           currentView='TimelineMonth'
//           onClick={onCellClick}
//           width='100%' group={{ enableCompactView: false, resources: ['MeetingRoom'] }}>
//                         <ResourcesDirective>
//                             <ResourceDirective field='Name' title='Name' name='MeetingRoom' allowMultiple={true} dataSource={roomsdata?.data} textField='name' idField='id' colorField='color'>
//                             </ResourceDirective>
//                         </ResourcesDirective>
//                         <ViewsDirective>
//                             <ViewDirective option='TimelineMonth'/>
//                         </ViewsDirective>
//                         <Inject services={[TimelineViews,TimelineMonth,Week, Month, Resize, DragAndDrop]}/>
//                     </ScheduleComponent>
//         </div>
//       </div>
//     </div>
//   )
// }
// export {Calendar}

// import * as React from 'react';
// import { ScheduleComponent,Month,Day,Week, ViewsDirective, ViewDirective, TimelineViews,TimelineMonth, Inject, ResourcesDirective, ResourceDirective, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
// import './RoomSchedulerTemplate.css';
// import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
// import * as dataSource from './datasource.json';

// function Calendar(chosenFilter) {
//   const timeScale = {
//     enable: true,
//     majorSlotTemplate: (date, type) => {
//       if (type === 'TimelineMonth') {
//         return null;
//       }
//       const index = Math.floor((date.getHours() * 60 + date.getMinutes()) / 30);
//       return (
//         <div>{ownerData[index]}</div>
//       );
//     },
//     minorSlotTemplate: (date) => {
//       return null;
//     }
//   };

//     const data = extend([], dataSource, null, true);
//     let scheduleObj;
//     const ownerData = [
//         { text: 'Room 1', id: 1},
//         { text: 'Room 2', id: 2},
//         { text: 'Room 3', id: 3},
//         { text: 'Room 4', id: 4},
//         { text: 'Room 5', id: 5},
//         { text: 'Room 6', id: 6},
//         { text: 'Room 7', id: 7},
//         { text: 'Room 8', id: 8},
//         { text: 'Room 9', id: 9},
//         { text: 'Room 10', id: 10},
//         { text: 'Room 11', id: 11},
//         { text: 'Room 12', id: 12},
//     ];
//     function getRoomName(value) {
//         return value.resourceData[value.resource.textField];
//     }
//     function isReadOnly(endDate) {
//         return (endDate < new Date(2021, 6, 31, 0, 0));
//     }
//     function resourceHeaderTemplate(props) {
//         return (<div className="template-wrap">
//             <div className="room-name">{getRoomName(props)}</div>
//         </div>);
//     }
//     function onActionBegin(args) {
//         if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
//             let data = args.data instanceof Array ? args.data[0] : args.data;
//             args.cancel = !scheduleObj.isSlotAvailable(data);
//         }
//     }
//     function onEventRendered(args) {
//         let data = args.data;
//         if (isReadOnly(data.EndTime)) {
//             args.element.setAttribute('aria-readonly', 'true');
//             args.element.classList.add('e-read-only');
//         }
//     }
//     function onRenderCell(args) {
//         if (args.element.classList.contains('e-work-cells')) {
//             if (args.date < new Date(2021, 6, 31, 0, 0)) {
//                 args.element.setAttribute('aria-readonly', 'true');
//                 args.element.classList.add('e-read-only-cells');
//             }
//         }
//         if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
//             let target = args.element.querySelector('.e-resource-text');
//             target.innerHTML = '<div class="name">Rooms</div>';
//         }
//     }
//     function onPopupOpen(args) {
//         let data = args.data;
//         if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
//             let target = (args.type === 'RecurrenceAlert' ||
//                 args.type === 'DeleteAlert') ? args.element[0] : args.target;
//             if (!isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
//                 if ((target.classList.contains('e-read-only-cells')) ||
//                     (!scheduleObj.isSlotAvailable(data))) {
//                     args.cancel = true;
//                 }
//             }
//         }
//     }
//     return (<div className='schedule-control-section'>
//             <div className='col-lg-12 control-section'>
//                 <div className='control-wrapper'>
//                     <ScheduleComponent cssClass='timeline-resource' dateFormat='dd MM yyyy' currentView='TimelineMonth' ref={schedule => scheduleObj = schedule} width='100%' eventSettings={{
//                         template: timeScale,
//             fields: {
//                 id: 'Id',
//                 subject: { title: 'Summary', name: 'Subject' },
//                 location: { title: 'Location', name: 'Location' },
//                 description: { title: 'Comments', name: 'Description' },
//                 startTime: { title: 'From', name: 'StartTime' },
//                 endTime: { title: 'To', name: 'EndTime' }
//             }
//         }} eventRendered={onEventRendered.bind(this)} popupOpen={onPopupOpen.bind(this)} actionBegin={onActionBegin.bind(this)} renderCell={onRenderCell.bind(this)} group={{ enableCompactView: false, resources: ['MeetingRoom'] }}>
//                         <ResourcesDirective>
//                             <ResourceDirective field='RoomId' title='Room Type' name='MeetingRoom' allowMultiple={true} dataSource={ownerData} textField='text' idField='id' colorField='color'>
//                             </ResourceDirective>
//                         </ResourcesDirective>
//                         <ViewsDirective>
//                             <ViewDirective option='TimelineMonth'/>
//                         </ViewsDirective>
//                         <Inject services={[TimelineViews,TimelineMonth,Week, Month, Resize, DragAndDrop]}/>
//                     </ScheduleComponent>
//                 </div>
//             </div>

//         </div>);
// }
// export default Calendar;

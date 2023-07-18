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
import {Alert, message, Space, Spin, Button, Input} from 'antd'
import {L10n} from '@syncfusion/ej2-base'
import {
  Api_Endpoint,
  fetchRooms,
  fetchGuests,
  fetchBookings,
  GuestCheckinApi,
  fetchRoomsTypes,
} from '../../../../../../services/ApiCalls'
import {BASE_URL} from '../../../../urls'

import './index.css'
import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import {axios} from 'axios'
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  TimelineViews,
  TimelineMonth,
  Inject,
  Week,
  Month,
  ResourcesDirective,
  ResourceDirective,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule'

import {extend, isNullOrUndefined} from '@syncfusion/ej2-base'
import {DataManager, WebApiAdaptor, UrlAdaptor, Query} from '@syncfusion/ej2-data'
import dataSource from './datasource.json'
import Item from 'antd/es/list/Item'
/**
 * schedule room scheduler sample
 */
const Calendar = () => {
  const {data: roomsdata} = useQuery('rooms', fetchRooms)
  const {data: guestsdata} = useQuery('guests', fetchGuests)
  const {data: bookingsdata} = useQuery('bookings', fetchBookings)
  const {mutate: addNewBooking} = useMutation((values) => axios.post(`${BASE_URL}/Booking`, values))
  const {data: roomsTypes} = useQuery('roomType', fetchRoomsTypes)
  const [isOpen, setIsOpen] = useState(false)
  const [bookingsDetails, setbookingsDetails] = useState([])
  const {mutate: checkGuestInQuery} = useMutation((values) => GuestCheckinApi(values))

  const data = extend([], dataSource.roomData, null, true)
  const {data: bookingdata} = useQuery('bookingdata', fetchBookings)
  const listData = guestsdata?.data.map((e) => {
    // console.log('e',e?.firstname+' '+e?.lastname)
    return {
      id: e?.id,
      name: e?.firstname + ' ' + e?.lastname,
    }
  })
  L10n.load({
    'en-US': {
      schedule: {
        saveButton: 'Save',
        cancelButton: 'Close',
        deleteButton: 'Cancel Booking',

        newEvent: 'Add Booking',
        editEvent: 'Booking Details',
      },
    },
  })

  let scheduleObj = useRef(null)
  let filteredBookings = []
  const allBookings = bookingdata?.data.map((item) => {
    const allGuests = guestsdata?.data.filter((data) => {
      return data.id == item.guestId
    })
    filteredBookings.push({
      Id: item.id,
      Subject: allGuests ? allGuests[0].firstname : null,
      StartTime: item.bookStart,
      EndTime: item.bookEnd,
      RoomId: item.roomId,
      checkInTime: item.checkInTime,
    })
    return item
  })

  const roomsArr = []
  const joinedData = roomsdata?.data.filter((room) => {
    const matchingType = roomsTypes?.data.find((type) => type.id === room.typeId)

    if (matchingType) {
      var roomObj = {roomId: room.id, roomName: room.name, roomType: matchingType.name}
      roomsArr.push(roomObj)
      return roomObj
    } else {
      return false
    }
  })

  const getRoomName = (value) => {
    return value.resourceData[value.resource.textField]
  }
  const getRoomType = (value) => {
    return value.resourceData.roomType
  }
  const getRoomCapacity = (value) => {
    return value.resourceData.capacity
  }
  const isReadOnly = (endDate) => {
    return endDate < new Date(2021, 6, 31, 0, 0)
  }
  const resourceHeaderTemplate = (props) => {
    return (
      <div className='template-wrap'>
        <div className='room-name'>{getRoomName(props)}</div>
        <div className='room-type'>{getRoomType(props)}</div>
      </div>
    )
  }
  const editorTemplate = (props) => {
    return props !== undefined ? (
      <table className='custom-event-editor' style={{width: '100%'}} cellPadding={5}>
        <tbody>
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
                //value={props && props.gameTypeId ? props.gameTypeId : null}
                value={props.Subject}
                style={{width: '100%'}}
              />
            </td>
          </tr>

          <tr>
            <td className='e-textlabel'>Room</td>
            <td colSpan={4}>
              <input
                id='RoomId'
                placeholder='Room'
                data-name='RoomId'
                name='RoomId'
                className='e-field e-input'
                type='text'
                style={{width: '100%'}}
                value={`Room ${props.RoomId}`}
                disabled
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
                disabled
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
                value={new Date(props.EndTime || props.enTime)}
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
  const onActionBegin = (args) => {
    console.log('ghio', args)
    // if (args.requestType === 'eventCreate') {
    //   let data = args.data instanceof Array ? args.data[0] : args.data
    //   args.cancel = !scheduleObj.current.isSlotAvailable(data)
    //   console.log(args)
    // }
  }
  const onEventRendered = (args) => {
    let data = args.data
    if (isReadOnly(data.EndTime)) {
      args.element.setAttribute('aria-readonly', 'true')
      args.element.classList.add('e-read-only')
    }
  }
  const onRenderCell = (args) => {
    // if (args.elementType === 'monthCells') {
    //     scheduleObj?.current.eventsData.map((item)=>{
    //       if (item.checkInTime!=null || item.checkInTime != undefined) {
    //         args.element.style.backgroundColor='red'
    //       }
    //     })
    // }

    // if (args.element.classList.contains('e-work-cells')) {
    //   if (args.date < new Date(2021, 6, 31, 0, 0)) {
    //     args.element.setAttribute('aria-readonly', 'true')
    //     args.element.classList.add('e-read-only-cells')
    //   }
    // }
    if (
      args.elementType === 'emptyCells' &&
      args.element.classList.contains('e-resource-left-td')
    ) {
      let target = args.element.querySelector('.e-resource-text')
      target.innerHTML =
        '<div class="d-flex justify-content-between"> <div class="name">Rooms</div><div class="type">Rooms Type</div></div>'
    }
  }
  const handleDataSave = () => {
    console.log('hehj')
  }
  const onPopupOpen = (args) => {
    let data = args.data
    if (
      args.type === 'QuickInfo' ||
      args.type === 'Editor' ||
      args.type === 'RecurrenceAlert' ||
      args.type === 'DeleteAlert'
    ) {
      let target =
        args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert'
          ? args.element[0]
          : args.target
      if (!isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
        if (
          target.classList.contains('e-read-only-cells') ||
          !scheduleObj.current.isSlotAvailable(data)
        ) {
          args.cancel = true
        }
      } else if (
        !isNullOrUndefined(target) &&
        target.classList.contains('e-appointment') &&
        isReadOnly(data.EndTime)
      ) {
        args.cancel = true
      }
    }
  }
  return roomsArr != undefined && filteredBookings != null ? (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent
            cssClass='timeline-resource'
            ref={scheduleObj}
            width='100%'
            height='650px'
            selectedDate={new Date()}
            workHours={{start: '08:00', end: '18:00'}}
            timeScale={{interval: 60, slotCount: 1}}
            resourceHeaderTemplate={resourceHeaderTemplate}
            editorTemplate={editorTemplate}
            allowDragAndDrop={false}
            allowMultiCellSelection={false}
            editorSave={handleDataSave}
            eventSettings={{
              dataSource: filteredBookings,
              fields: {
                id: 'Id',
                subject: {title: 'Guest', name: 'Subject'},
                //   description: {title: 'Comments', name: 'Description'},
                startTime: {title: 'From', name: 'StartTime'},
                endTime: {title: 'To', name: 'EndTime'},
              },
            }}
            eventRendered={onEventRendered}
            popupOpen={onPopupOpen}
            actionBegin={onActionBegin}
            renderCell={onRenderCell}
            group={{enableCompactView: false, resources: ['MeetingRoom']}}
          >
            <ResourcesDirective>
              <ResourceDirective
                field='RoomId'
                title='Room Type'
                name='MeetingRoom'
                allowMultiple={true}
                dataSource={roomsArr}
                textField='roomName'
                idField='roomId'
                colorField='color'
              />
            </ResourcesDirective>

            <ViewsDirective>
              {/* <ViewDirective option='TimelineDay' />
              <ViewDirective option='TimelineWeek' /> */}
              <ViewDirective option='TimelineMonth' />
            </ViewsDirective>
            <Inject services={[TimelineViews, TimelineMonth, Week, Month, Resize, DragAndDrop]} />
            {/* <Inject services={[TimelineViews, Resize, DragAndDrop]} /> */}
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

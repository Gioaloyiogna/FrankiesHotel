import {Button, Form, Input, InputNumber, Modal, Select, Space, Table, message} from 'antd'

import {useEffect, useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../../_metronic/helpers'
import {BASE_URL} from '../../../../urls'
import {Link} from 'react-router-dom'
import {employeedata} from '../../../../../../data/DummyData'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {
  Api_Endpoint,
  fetchGuests,
  fetchBookings,
  fetchRooms,
  GuestCheckinApi,
  GuestCheckoutApi,
  addBookingApi,
} from '../../../../../../services/ApiCalls'
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns/src/drop-down-list/dropdownlist.component'
import TextArea from 'antd/es/input/TextArea'
import {useForm} from 'react-hook-form'

// import { Api_Endpoint, fetchDepartments, fetchEmployees, fetchGrades, fetchNotches, fetchPaygroups } from '../../../../../../services/ApiCalls'

const CheckIn = () => {
  const Option: any = Select.Option
  const [gridData, setGridData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  const [img, setImg] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const {data: getNotes, isLoading: NotesLoad} = useQuery('Notes', fetchNotes)
  const {data: getGuests, isLoading: GetGuestsLoad} = useQuery('Guests', fetchGuests)
  const {data: roomsdata, isLoading: GetRoomsLoad} = useQuery('rooms', fetchRooms)
  const {data: bookingData, isLoading: BookingsLoad} = useQuery('Bookings', fetchBookings)
  const {mutate: checkGuestInQuery} = useMutation((values: any) => GuestCheckinApi(values))
  const [isOpen, setIsOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const {mutate: addReservation} = useMutation((values: any) => addBookingApi(values))
  const queryClient = useQueryClient()
  const {mutate: checkGuestOutQuery} = useMutation((values: any) => GuestCheckoutApi(values))
  const [addBookingForm] = Form.useForm()

  // roomsTypedata?.data.find(roomTypedata => {
  //   if(roomTypedata.id==roo)
  //   return
  // })
  // const roomTypeData = roomsTypedata?.data;
  // // console.log('room', roomTypeData)
  // const testData = roomsdata?.data.map((e:any)=>{
  //   console.log('e', e)

  //  const dat = guestsData?.find((x:any)=>{
  //     // console.log("x", x)

  //     if(x.id===e.typeId){
  //       return x;
  //     }
  //   })

  //   // console.log('dat',dat)
  //   return {
  //     roomId: e?.id,
  //   room: e?.name,
  //   isActive:e?.isActive,
  //   lastname: dat?.name,
  //   Email:dat?.Email
  //   }

  // });

  const guestList = getGuests?.data.map((e: any) => {
    // console.log('e',e?.firstname+' '+e?.lastname)
    return {
      id: e?.id,
      name: e?.firstname + ' ' + e?.lastname,
    }
  })
  const roomList = roomsdata?.data
  const guestsData = getGuests?.data
  // console.log('room', roomTypeData)
  const data = bookingData?.data.map((e: any) => {
    const guest = guestsData?.find((x: any) => {
      // console.log("x", x)

      if (x.id === e.guestId) {
        return x
      }
    })
    const room = roomList?.find((x: any) => {
      // console.log("x", x)
      // console.log("e", e)

      if (x.id === e.roomId) {
        return x
      }
    })

    // console.log('room',room?.name)
    // reservationData.push({
    //   id: e?.id,
    //   guest: guest?.firstname+" "+guest?.lastname,
    //   // room:'Room X',
    //   room:room?.name,
    //   bookStart: e?.bookStart,
    //   checkInTime: e?.checkInTime,
    //   })

    var checkinTimeData = new Date(e?.checkInTime)

    var bookStartTime = new Date(e?.bookStart)
    return {
      id: e?.id,
      guest: guest?.firstname + ' ' + guest?.lastname,
      room: room?.name,
      bookStart: bookStartTime.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      checkInTime: e?.checkInTime
        ? checkinTimeData.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        : e?.checkInTime,
      checkOutTime: e?.checkOutTime,
    }
  })
  const newFilteredData = data?.filter((e: any) => {
    return e.checkOutTime == null && e.checkInTime !=null
  })

  // console.log("roomList", roomsdata?.data);
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }
  const closeModal = () => {
    setIsOpen(false)
    addBookingForm.resetFields()
  }

  const deleteData = async (element: any) => {
    try {
      const response = await axios.delete(`${BASE_URL}/Notes`)
      // update the local state so that react can refecth and re-render the table with the new data
      const newData = gridData.filter((item: any) => item.id !== element.id)
      setGridData(newData)
      return response.status
    } catch (e) {
      return e
    }
  }
  // checking in guests
  const checkGuestIn = (guestData: any) => {
    // Modal.confirm({
    //   okText: 'Yes',
    //   okType: 'danger',
    //   title: 'Are you sure, you want to activate Member?',
    //   onOk: () => {
    //     axios.post(`${API_URL}/ActivateMember?id=${id}`).then((response) => {
    //       if (response.status == 200) {
    //         messageApi.success('Member was successfully activated!')
    //         queryClient.invalidateQueries('membersQuery')
    //       }
    //     })
    //   },
    // })
    Modal.confirm({
      okText: 'Confirm',
      okType: 'primary',
      title: 'Kindly confirm check-in!',
      onOk: () => {
        checkGuestInQuery(guestData, {
          onSuccess: () => {
            message.success('Guest successfully ckecked in!')
            queryClient.invalidateQueries('Bookings')
            queryClient.invalidateQueries('Guests')
            queryClient.invalidateQueries('rooms')
          },
        })
      },
    })
  }

  function handleDelete(element: any) {
    deleteData(element)
  }
  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'guest',
      sorter: (a: any, b: any) => {
        if (a.guest > b.guest) {
          return 1
        }
        if (b.guest > a.guest) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Room',
      dataIndex: 'room',
      sorter: (a: any, b: any) => {
        if (a.room > b.room) {
          return 1
        }
        if (b.room > a.room) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Start',
      dataIndex: 'bookStart',
      sorter: (a: any, b: any) => {
        if (a.checkInTime > b.checkInTime) {
          return 1
        }
        if (b.checkInTime > a.checkInTime) {
          return -1
        }
        return 0
      },
    },
    // {
    //   title: 'Check In Time',
    //   dataIndex: 'checkInTime',
    //   sorter: (a: any, b: any) => {
    //     if (a.checkInTime > b.checkInTime) {
    //       return 1
    //     }
    //     if (b.checkInTime > a.checkInTime) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },

    {
      title: 'Action',
      fixed: 'right',
      // width: 20,
      render: (_: any, record: any) => (
        <Space size='middle'>
          {/* <a
            href='#'
            className='btn btn-light-warning btn-sm'
            onClick={() => checkGuestIn({id: record.id, checkInOutTime: new Date()})}
          >
            Ckeck In
          </a> */}
          <a
            href='#'
            className='btn btn-light-primary btn-sm'
            onClick={() =>
              checkGuestOut({
                id: record.id,
                checkInTime: record.checkInTime,
                checkInOutTime: new Date(),
              })
            }
          >
            Ckeck Out
          </a>
          {/*      
        <Space size='middle'>
          {/* <Link to={`/notes-form/${record.id}`}>
          <span className='btn btn-light-info btn-sm delete-button' style={{ backgroundColor: 'blue', color: 'white' }}>Note</span>
          </Link> 
           <Link to={`/employee-edit-form/${record.id}`}>
          <span className='btn btn-light-info btn-sm delete-button' style={{ backgroundColor: 'Green', color: 'white' }}>Check In</span>
          </Link> */}
        </Space>
      ),
    },
  ]
  // const {data:allNotes} = useQuery('Notes', fetchNotes, {cacheTime:5000})

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${Api_Endpoint}/RoomsType`)
      setGridData(response.data)
      setLoading(false)
    } catch (error) {
      // console.log(error)
    }
  }
  const checkGuestOut = (guestData: any) => {
    if (guestData.checkInTime === null) {
      message.info('Please, check In before you check out!')
      return
    }

    Modal.confirm({
      okText: 'Confirm',
      okType: 'primary',
      title: 'Kindly confirm check-out!',
      onOk: () => {
        checkGuestOutQuery(guestData, {
          onSuccess: () => {
            message.success('Guest successfully ckecked out!')
            queryClient.invalidateQueries('Bookings')
            queryClient.invalidateQueries('Guests')
            queryClient.invalidateQueries('rooms')
          },
        })
      },
    })
  }

  useEffect(() => {
    loadData()
    // fetchImage()
  }, [])

  // const sortedEmployees = gridData.sort((a:any, b:any) => a?.departmentId.localeCompare(b?.departmentId));
  // const females = sortedEmployees.filter((employee:any) => employee.gender === 'female');

  var out_data: any = {}

  gridData.forEach(function (row: any) {
    if (out_data[row.departmentId]) {
      out_data[row.departmentId].push(row)
    } else {
      out_data[row.departmentId] = [row]
    }
  })

  const dataWithIndex = gridData.map((item: any, index: any) => ({
    ...item,
    key: index,
  }))

  const handleInputChange = (e: any) => {
    globalSearch(e.target.value)
    if (e.target.value === '') {
      loadData()
    }
  }
  const addCheckIn = () => {
    setIsOpen(true)
    addBookingForm.resetFields()
  }
  const globalSearch = (value: any) => {
    // @ts-ignore
    filteredData = dataWithIndex.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchText.toLowerCase()) ||
        value.description.toLowerCase().includes(searchText.toLowerCase()) ||
        value.Email.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }
  const submitBooking = (values: any) => {
    values.timestamp = new Date()
    const checkData = bookingData?.data.filter((item: any) => {
      return (
        item.guestId == values.guestId &&
        item.roomId == values.roomId &&
        item.bookStart.split('T')[0] == values.bookStart &&
        item.bookEnd.split('T')[0] >= values.bookEnd
      )
    })

    if (checkData.length > 0) {
      message.success('Room already occupied!')
      return
    }
    Modal.confirm({
      okText: 'Ok',
      okType: 'primary',
      title: 'Are you sure, you want to add this booking?',
      onOk: () => {
        addReservation(values, {
          onSuccess: () => {
            message.success('Booking successfully done!')
            queryClient.invalidateQueries('Bookings')
            queryClient.invalidateQueries('Guests')
            queryClient.invalidateQueries('rooms')
            setIsOpen(false)
            addBookingForm.resetFields()
          },
        })
      },
    })
  }
  return (
    // <div
    //   style={{
    //     backgroundColor: 'white',
    //     padding: '20px',
    //     borderRadius: '5px',
    //     boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
    //   }}
    // >
    <div
      style={{
        // width:'50%',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
      }}
    >
      <KTCardBody className='py-4 '>
        <div className='table-responsive'>
          <div className='d-flex justify-content-between'>
            <Space style={{marginBottom: 16}}>
              <Input
                placeholder='Enter Search Text'
                onChange={handleInputChange}
                type='text'
                allowClear
                value={searchText}
              />
              <Button type='primary' onClick={globalSearch}>
                Search
              </Button>
            </Space>
            <Space style={{marginBottom: 16}}>
              <button
                type='button'
                className='btn btn-light-primary me-3'
                onClick={() => addCheckIn()}
              >
                Add
              </button>
              <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                Export
              </button>
            </Space>
          </div>
          <Table
            columns={columns}
            dataSource={newFilteredData}
            loading={BookingsLoad}
            className='table-responsive'
          />
          {/* <Table columns={columns} dataSource={reservationData}  loading={BookingsLoad}/> */}
          {/* <Table columns={columns} dataSource={testData}  loading={GetGuestsLoad}/> */}
          <Modal
            open={isOpen}
            onCancel={closeModal}
            footer={null}
            title='Add Booking'
            width={'50%'}
          >
            <Form
              name='basic'
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              style={{maxWidth: 600}}
              initialValues={{remember: true}}
              autoComplete='off'
              onFinish={submitBooking}
              form={addBookingForm}
            >
              <Form.Item name='timestamp' label='Guest' hidden={true}>
                <Input type='text' />
              </Form.Item>

              <div className='form-group row mb-7'>
                <div className='col-6'>
                  <Form.Item name='guestId' label='Guest' rules={[{required: true}]}>
                    <Select>
                      {getGuests?.data.map((item: any) => (
                        <Select.Option value={item.id} key={item.id}>
                          {item.firstname} {item.lastname}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className='col-6 '>
                  <Form.Item name='roomId' label='Room' rules={[{required: true}]}>
                    <Select>
                      {roomsdata?.data.map((item: any) => (
                        <Select.Option value={item.id} key={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className='form-group row mb-7'>
                <div className='col-6'>
                  <Form.Item name='bookStart' label='From' rules={[{required: true}]}>
                    <Input type='date' />
                  </Form.Item>
                </div>
                <div className='col-6 '>
                  <Form.Item name='bookEnd' label='To' rules={[{required: true}]}>
                    <Input type='date' />
                  </Form.Item>
                </div>
              </div>
              <Form.Item wrapperCol={{offset: 4, span: 16}}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}

export {CheckIn}

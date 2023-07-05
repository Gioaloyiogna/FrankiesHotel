import {Button, Form, Input, InputNumber, Modal, Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../../_metronic/helpers'
import { BASE_URL } from '../../../../urls'
import { Link } from 'react-router-dom'
import { employeedata } from '../../../../../../data/DummyData'
import { useQuery } from 'react-query'
import { Api_Endpoint,fetchGuests,fetchBookings,fetchRooms} from '../../../../../../services/ApiCalls'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns/src/drop-down-list/dropdownlist.component'
// import { Api_Endpoint, fetchDepartments, fetchEmployees, fetchGrades, fetchNotches, fetchPaygroups } from '../../../../../../services/ApiCalls'

const CheckIn = () => {
  const [gridData, setGridData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  const [img, setImg] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const {data: getNotes, isLoading: NotesLoad} = useQuery('Notes', fetchNotes)
  const {data: getGuests, isLoading: GetGuestsLoad} = useQuery('Guests', fetchGuests)
  const {data: roomsdata, isLoading: GetRoomsLoad} = useQuery('rooms', fetchRooms)
  const {data: bookingData, isLoading: BookingsLoad} = useQuery('Bookings', fetchBookings)
  
 const [isOpen, setIsOpen]=useState(false)
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
  let reservationData:any=[]
  const guestList = getGuests?.data.map((e:any)=>{
    
    // console.log('e',e?.firstname+' '+e?.lastname)
    return {
      id: e?.id,
      name: e?.firstname+' '+e?.lastname,
    }
    
  });
  const roomList = roomsdata?.data;
  const guestsData = getGuests?.data;
  // console.log('room', roomTypeData)
  const data = bookingData?.data.map((e:any)=>{
    // console.log('e', e)

   const guest = guestsData?.find((x:any)=>{
      // console.log("x", x)

      if(x.id===e.guestId){
        return x;
      }
    })
   const room = roomList?.find((x:any)=>{
      // console.log("x", x)
      // console.log("e", e)

      if(x.id===e.roomId){
        return x;
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
    return {
    id: e?.id,
    guest: guest?.firstname+" "+guest?.lastname,
    room:room?.name,
    bookStart: e?.bookStart,
    checkInTime: e?.checkInTime,
    }
    
  });
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
  }
 const openModal=()=>{
  setIsOpen(true)
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
    {
      title: 'Check In Time',
      dataIndex: 'checkInTime',
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
   
    

    {
      title: 'Action',
      fixed: 'right',
      // width: 20,
      render: (_: any, record: any) => (
        <Space size='middle'>
          {/* <Link to={`/notes-form/${record.id}`}>
          <span className='btn btn-light-info btn-sm delete-button' style={{ backgroundColor: 'blue', color: 'white' }}>Note</span>
          </Link> */}
           <Link to={`/employee-edit-form/${record.id}`}>
          <span className='btn btn-light-info btn-sm delete-button' style={{ backgroundColor: 'Green', color: 'white' }}>Check In</span>
          </Link>
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

  useEffect(() => {
    loadData()
    // fetchImage()
  }, [])



  // const sortedEmployees = gridData.sort((a:any, b:any) => a?.departmentId.localeCompare(b?.departmentId));
  // const females = sortedEmployees.filter((employee:any) => employee.gender === 'female');
  
  
  var out_data:any = {};
  
  gridData.forEach(function(row:any) {
    if (out_data[row.departmentId]) {
      out_data[row.departmentId].push(row);
    } else {
      out_data[row.departmentId] = [row];
    }
  });
  
  const dataWithIndex = gridData.map((item: any, index:any) => ({
    ...item,
    key: index,
  }))

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      loadData()
    }
  }

  const globalSearch = () => {
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
              {/* <Link to='/guest-form'>
              <button type='button' className='btn btn-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                Add
              </button>
              </Link> */}
              
              <button type='button' className='btn btn-primary me-3' onClick={openModal} >
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                Add
              </button>
              

              <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                Export
            </button>
            </Space>
          </div>
          <Table columns={columns} dataSource={data}  loading={BookingsLoad}/>
          {/* <Table columns={columns} dataSource={reservationData}  loading={BookingsLoad}/> */}
          {/* <Table columns={columns} dataSource={testData}  loading={GetGuestsLoad}/> */}
          <Modal
          open={isOpen}
          // onCancel={closeModal}
          footer={null}
          title='Checking'
          width={'50%'}
          >
         <form onSubmit={closeModal}>
         <div className="form-group row mb-7">
          
          <div className="col-4 mr-7">
          <label htmlFor="guestName" className="col-2 col-form-label required">
            Guest
          </label>
          <DropDownListComponent
                id='guests'
                placeholder='Guest Name'
                data-name='guests'
                className='e-field'
                dataSource={guestList}
                fields={{text: 'name', value: 'id'}}
                // value={props && props.gameTypeId ? props.gameTypeId : null}
                style={{width: '100%'}}
              />
          </div>
          
          <div className="col-4">
          <label htmlFor="room" className="col-4 col-form-label">
            Room
          </label>
          <DropDownListComponent
                id='guests'
                placeholder='Guest Name'
                data-name='guests'
                className='e-field'
                dataSource={guestList}
                fields={{text: 'name', value: 'id'}}
                // value={props && props.gameTypeId ? props.gameTypeId : null}
                style={{width: '100%'}}
              />
            {/* <input
              type="text"
              id="room"
              className="form-control"
              // value={room}
              // onChange={(e) => setRoom(e.target.value)}
            /> */}
          </div>
          <div className='col-4'>

          <label htmlFor="timestamp" className="col-5 col-form-label">
            Timestamp
          </label>
        
            <input
              type="text"
              id="timestamp"
              className="form-control"
              // value={timestamp}
              // onChange={(e) => setTimestamp(e.target.value)}
            />
          
          </div>
        </div>


        <div className="mt-3 text-end">
          <button type="button" className="btn btn-secondary me-2" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
          </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}

export {CheckIn}

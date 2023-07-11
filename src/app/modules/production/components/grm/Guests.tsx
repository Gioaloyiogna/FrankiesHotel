import {Button, Form, Input, InputNumber, Modal, Space, Table, message} from 'antd'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../_metronic/helpers'
import {BASE_URL} from '../../urls'
import {Link} from 'react-router-dom'
// import { employeedata } from '../../../../../data/DummyData'
import {QueryClient, useMutation, useQuery, useQueryClient} from 'react-query'
import {Api_Endpoint, addNoteApi, deleteGuestApi, fetchGuests} from '../../../../services/ApiCalls'
import Checkbox from 'antd/es/checkbox/Checkbox'
import TextArea from 'antd/es/input/TextArea'

const Guests = () => {
  const [gridData, setGridData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  const [img, setImg] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {data: getGuest, isLoading: guestsLoad} = useQuery('guests', fetchGuests)
  const [openNoteModal, setOpenNoteModal] = useState(false)
  const {data: addGuestNote} = useMutation((values: any) => addNoteApi(values))
  const {mutate: guestDeletion} = useMutation((id: any) => deleteGuestApi(id))
  const queryClient = useQueryClient()
  // const {data: roomsTypedata, isLoading: roomsTypeLoad} = useQuery('roomsType', fetchRoomsTypes)

  // roomsTypedata?.data.find(roomTypedata => {
  //   if(roomTypedata.id==roo)
  //   return
  // })
  // const roomTypeData = roomsTypedata?.data;
  // // console.log('room', roomTypeData)
  // const testData = roomsdata?.data.map((e:any)=>{
  //   // console.log('e', e)

  //  const dat = roomTypeData?.find((x:any)=>{
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
  // console.log("testData", testData);
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

  const deleteData = async (element: any) => {
    try {
      const response = await axios.delete(`${BASE_URL}/guests`)
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
      dataIndex: 'firstname',
      sorter: (a: any, b: any) => {
        if (a.firstname > b.firstname) {
          return 1
        }
        if (b.firstname > a.firstname) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      sorter: (a: any, b: any) => {
        if (a.lastname > b.lastname) {
          return 1
        }
        if (b.lastname > a.lastname) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a: any, b: any) => {
        if (a.email > b.email) {
          return 1
        }
        if (b.email > a.email) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a: any, b: any) => {
        if (a.gender > b.gender) {
          return 1
        }
        if (b.gender > a.gender) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Account',
      dataIndex: 'account',
      sorter: (a: any, b: any) => {
        if (a.account > b.account) {
          return 1
        }
        if (b.account > a.account) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      sorter: (a: any, b: any) => {
        if (a.nationality > b.nationality) {
          return 1
        }
        if (b.nationality > a.nationality) {
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
          <a href='#' className='btn btn-light-warning btn-sm' onClick={() => addNotes(record)}>
            Note
          </a>
          <a
            href='#'
            className='btn btn-light-danger btn-sm'
            onClick={() => deleteGuest(record.id)}
          >
            Delete
          </a>
        </Space>
        // <Space size='middle'>
        //   <Link to={`/notes-form/${record.id}`}>
        //   <span className='btn btn-light-info btn-sm delete-button' style={{ backgroundColor: 'blue', color: 'white' }}>Note</span>
        //   </Link>
        //    <Link to={`/employee-edit-form/${record.id}`}>
        //   <span className='btn btn-light-info btn-sm delete-button' style={{ backgroundColor: 'red', color: 'white' }}>Delete</span>
        //   </Link>
        // </Space>
      ),
    },
  ]
  const {data: allGuests} = useQuery('guests', fetchGuests, {cacheTime: 5000})

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
    setSearchText(e.target.value)
    if (e.target.value === '') {
      loadData()
    }
  }
  const addNotes = (notes: any) => {
    form.setFieldsValue({
      guestId: notes.id,
      notes: '',
      timestamp: new Date(),
    })
    setOpenNoteModal(true)
  }
  const deleteGuest = (id: any) => {
    Modal.confirm({
      okText: 'Delete',
      okType: 'primary',
      title: 'Are you sure, you want to delete this guest?',
      onOk: () => {
        guestDeletion(id, {
          onSuccess: () => {
            message.success('Guest successfully deleted')
            queryClient.invalidateQueries('guests')
          },
        })
        // axios.post(`${Api_Endpoint}/Notes`, values).then((res) => {
        //   if (res.status == 200) {
        //     message.success('Note added successfully')
        //     setOpenNoteModal(false)
        //   }
        // })
      },
    })
  }
  const cancelNoteModal = () => {
    setOpenNoteModal(false)
  }
  const submitNotes = (values: any) => {
    console.log('values', values)

    Modal.confirm({
      okText: 'Confirm',
      okType: 'primary',
      title: 'Kindly confirm check-in!',
      onOk: () => {
        axios.post(`${Api_Endpoint}/Notes`, values).then((res) => {
          if (res.status == 200) {
            message.success('Note added successfully')
            setOpenNoteModal(false)
          }
        })
      },
    })
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
              <Link to='/guest-form'>
                <button type='button' className='btn btn-primary me-3'>
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add
                </button>
              </Link>

              <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                Export
              </button>
            </Space>
          </div>
          <Table columns={columns} dataSource={getGuest?.data} loading={guestsLoad} />
        </div>
        {/* Notes Modal */}
        <Modal
          open={openNoteModal}
          okText='Ok'
          title='Add Note'
          closable={true}
          onCancel={cancelNoteModal}
          footer={null}
        >
          <Form style={{maxWidth: 600}} form={form} disabled={false} onFinish={submitNotes}>
            <Form.Item hidden={true} name={'guestId'} hasFeedback></Form.Item>
            <Form.Item hidden={true} name={'timestamp'} hasFeedback>
              <input type='date' />
            </Form.Item>
            <Form.Item
              label='Note'
              rules={[{required: true, message: 'Please enter note'}]}
              name={'notes'}
              hasFeedback
            >
              <TextArea rows={4} />
            </Form.Item>
            <Button type='primary' key='submit' htmlType='submit' style={{marginLeft: '50px'}}>
              Submit
            </Button>
          </Form>
        </Modal>
      </KTCardBody>
    </div>
  )
}

export {Guests}

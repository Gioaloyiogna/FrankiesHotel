import {Button, Form, Input, InputNumber, Modal, Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import { BASE_URL } from '../../../urls'
import { Link } from 'react-router-dom'
// import { employeedata } from '../../../../../data/DummyData'
import { useQuery } from 'react-query'
import { Api_Endpoint, fetchRoomsTypes } from '../../../../../services/ApiCalls'

const RoomType = () => {
  const [gridData, setGridData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  const [img, setImg] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {data: roomsdata, isLoading: roomsLoad} = useQuery('rooms', fetchRoomsTypes)
  


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
      const response = await axios.delete(`${BASE_URL}/RoomsType`)
    //   const response = await axios.delete(`${BASE_URL}/RoomsType/${element.id}`)
      // update the local state so that react can refecth and re-render the table with the new data
      const newData = gridData.filter((item: any) => item.id !== element.id)
      setGridData(newData)
      return response.status
    } catch (e) {
      return e
    }
  }

//   const fetchImage = async () => {
//     const res = await fetch("https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80");
//     const imageBlob = await res.blob();
//     const imageObjectURL:any  = URL.createObjectURL(imageBlob);
//     setImg(imageObjectURL);
//   };
  

  function handleDelete(element: any) {
    deleteData(element)
  }
  const columns: any = [
//    {
//       title: 'Profile',
//       dataIndex: 'name',
//       render: (a: any, b: any) => {
//         return  <img style={{borderRadius:"10px"}} src={img} width={50} height={50}></img>
//       }
//     },
    // {
    //   title: 'EmployeeID',
    //   dataIndex: 'employeeId',
    //   sorter: (a: any, b: any) => {
    //     if (a.employeeId > b.employeeId) {
    //       return 1
    //     }
    //     if (b.employeeId > a.employeeId) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => {
        if (a.firstName > b.firstName) {
          return 1
        }
        if (b.firstName > a.firstName) {
          return -1
        }
        return 0
      },
    },
   
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a: any, b: any) => {
        if (a.surname > b.surname) {
          return 1
        }
        if (b.surname > a.surname) {
          return -1
        }
        return 0
      },
    },

    {
      title: 'Price',
      dataIndex: 'price',
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
    // {
    //   title: 'Paygroup',
    //   key: 'paygroupId',
    //   render: (row: any) => {
    //     return getPaygroupName(row.paygroupId)
    //   },
    //   sorter: (a: any, b: any) => {
    //     if (a.paygroupId > b.paygroupId) {
    //       return 1
    //     }
    //     if (b.paygroupId > a.paygroupId) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },
    // {
    //   title: 'Salary Grade',
    //   key: 'gradeId',
    //   render: (row: any) => {
    //     return getGradeName(row.gradeId)
    //   },
    //   sorter: (a: any, b: any) => {
    //     if (a.gradeId > b.gradeId) {
    //       return 1
    //     }
    //     if (b.gradeId > a.gradeId) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },
    // {
    //   title: 'Notch',
    //   key: 'notchId',
    //   render: (row: any) => {
    //     return getNotchName(row.notchId)
    //   },
    //   sorter: (a: any, b: any) => {
    //     if (a.notchId > b.notchId) {
    //       return 1
    //     }
    //     if (b.notchId > a.notchId) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },
    // {
    //   title: 'Department',
    //   key: 'departmentId',
    //   render: (row: any) => {
    //     return getDepartmentName(row.departmentId)
    //   },
      
    //   sorter: (a: any, b: any) => {
    //     if (a.departmentId > b.departmentId) {
    //       return 1
    //     }
    //     if (b.departmentId > a.departmentId) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },
    // {
    //   title: 'Phone',
    //   dataIndex: 'phone',
    //   sorter: (a: any, b: any) => {
    //     if (a.phone > b.phone) {
    //       return 1
    //     }
    //     if (b.phone > a.phone) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },

    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Link to={`/rooms/${record.id}`} state={record.id}>
          <span className='btn btn-light-info btn-sm delete-button' style={{ backgroundColor: 'blue', color: 'white' }}>Rooms</span>
          </Link>
          {/* <Link to={`/employee-edit-form/${record.id}`}>
          <span className='btn btn-light-info btn-sm delete-button' style={{ backgroundColor: 'blue', color: 'white' }}>Rooms</span>
          </Link> */}
          <Link to={`/employee-edit-form/${record.id}`}>
          <span className='btn btn-light-info btn-sm delete-button' style={{ backgroundColor: 'red', color: 'white' }}>Delete</span>
          </Link>



          {/* <Link to={`/employee-edit-form/${record.id}`}>
            <span className='btn btn-light-info btn-sm'>Update</span>
          </Link>
          <Link to={`/employee-details/${record.id}`}>
            <span className='btn btn-light-success btn-sm'>Details</span>
          </Link> */}
        </Space>
      ),
      
    },
  ]

  // const {data:allEmployee} = useQuery('employee', fetchEmployees, {cacheTime:5000})
  // const {data:allDepartments} = useQuery('department', fetchDepartments, {cacheTime:5000})
  // const {data:allPaygroups} = useQuery('paygroup', fetchPaygroups, {cacheTime:5000})
  // const {data:allNotches} = useQuery('notches', fetchNotches, {cacheTime:5000})
  // const {data:allGrades} = useQuery('grades', fetchGrades, {cacheTime:5000})
  const {data:allRoomTypes} = useQuery('roomsTypes', fetchRoomsTypes, {cacheTime:5000})
 
//   const getDepartmentName = (departmentId: any) => {
//     let departmentName = null
//     allDepartments?.data.map((item: any) => {
//       if (item.id === departmentId) {
//         departmentName=item.name
//       }
//     })
//     return departmentName
//   } 
//   const getGradeName = (gradeId: any) => {
//     let gradeName = null
//     allGrades?.data.map((item: any) => {
//       if (item.id === gradeId) {
//         gradeName=item.name
//       }
//     })
//     return gradeName
//   } 
//   const getPaygroupName = (paygroupId: any) => {
//     let paygroupName = null
//     allPaygroups?.data.map((item: any) => {
//       if (item.id === paygroupId) {
//         paygroupName=item.name
//       }
//     })
//     return paygroupName
//   } 
//   const getNotchName = (notchId: any) => {
//     let notchName = null
//     allNotches?.data.map((item: any) => {
//       if (item.id === notchId) {
//         notchName=item.name
//       }
//     })
//     return notchName
//   } 

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${Api_Endpoint}/RoomsType`)
      setGridData(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
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
        value.price.toLowerCase().includes(searchText.toLowerCase())
        // value.employeeId.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  return (
    <div
      style={{
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
              <Link to='/roomTypeForm'>
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
          <Table columns={columns} dataSource={roomsdata?.data}  loading={roomsLoad}/>
          
        </div>
      </KTCardBody>
    </div>
  )
}

export {RoomType}

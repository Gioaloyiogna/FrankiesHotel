import {Button, Form, Input, InputNumber, Modal, Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import { BASE_URL } from '../../../urls'
import { Link, useParams } from 'react-router-dom'
// import { employeedata } from '../../../../../data/DummyData'
import { useQuery } from 'react-query'
import { Api_Endpoint, fetchRooms } from '../../../../../services/ApiCalls'
import Checkbox from 'antd/es/checkbox/Checkbox'

const Rooms = () => {
  const [gridData, setGridData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  const [img, setImg] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {data: roomsdata, isLoading: roomsLoad} = useQuery('rooms', fetchRooms)
  

  const parms: any = useParams();
//   console.log(parms)
//   console.log(roomsdata?.data?.filter((rooms: any)=>rooms.typeId===parms.id))
//   console.log(roomsdata?.data?.filter((rooms: any)=>rooms?.typeId===1))
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
      dataIndex: 'name',
      sorter: (a: any, b: any) => {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      },
    },
   
    {
        title: 'IsActive',
        dataIndex: 'isActive',
        render: (isActive: boolean) => (
          <Checkbox checked={isActive} />
        ),
        sorter: (a: any, b: any) => {
          if (a.isActive > b.isActive) {
            return 1;
          }
          if (b.isActive > a.isActive) {
            return -1;
          }
          return 0;
        },
      },

    {
      title: 'Action',
      fixed: 'right',
      width: 20,
      render: (_: any, record: any) => (
        <Space size='middle'>
          {/* <Link to={`/employee-edit-form/${record.id}`}>
          <span className='btn btn-light-info btn-sm delete-button' style={{ backgroundColor: 'blue', color: 'white' }}>Rooms</span>
          </Link> */}
          <Link to={`/employee-edit-form/${record.id}`}>
          <span className='btn btn-light-info btn-sm delete-button' style={{ backgroundColor: 'red', color: 'white' }}>Delete</span>
          </Link>
        </Space>
      ),
      
    },
  ]
  const {data:allRoomss} = useQuery('roomsTypes', fetchRooms, {cacheTime:5000})
 

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
    width:'50%',
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
              <Link to={`/roomsForm/${parms.id}`}>
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
          <Table columns={columns} dataSource={roomsdata?.data?.filter((rooms: any)=>rooms.typeId===parseInt(parms.id))}  loading={roomsLoad}/>
          
        </div>
      </KTCardBody>
    </div>
  )
}

export {Rooms}

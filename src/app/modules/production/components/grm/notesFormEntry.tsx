import {useState} from 'react'
import {Link, useParams} from 'react-router-dom'
// import "./formStyle.css"
import type {RcFile, UploadFile, UploadProps} from 'antd/es/upload/interface'
import {UploadOutlined} from '@ant-design/icons'
import {Button, Upload} from 'antd'
import {
  BANKS,
  CATEGORY,
  DEPARTMENTS,
  DIVISION,
  GRADES,
  NOTCHES,
  NOTES,
  PAYGROUP,
  UNITS,
} from '../../../../data/DummyData'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {Api_Endpoint} from '../../../../services/ApiCalls'
// import { Api_Endpoint, fetchCategories, fetchDepartments, fetchDivisions, fetchGrades, fetchJobTitles, fetchNationalities, fetchNotches, fetchPaygroups, fetchUnits } from '../../../../services/ApiCalls';
import {useQuery} from 'react-query'
import {useNavigate, Navigate} from 'react-router-dom'

const NotesForm = () => {
  const [formData, setFormData] = useState({})
  //   const [activeTab, setActiveTab] = useState('tab1');
  const {register, reset, handleSubmit} = useForm()
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null)
  //   const handleTabClick = (tab:any) => {
  //     setActiveTab(tab);
  //   }

  const parms: any = useParams()
  const navigate = useNavigate()

  // const {data:allDepartments} = useQuery('departments', fetchDepartments, {cacheTime:5000})
  // const {data:allDivisions} = useQuery('divisions', fetchDivisions, {cacheTime:5000})
  // const {data:allCategories} = useQuery('categories', fetchCategories, {cacheTime:5000})
  // const {data:allPaygroups} = useQuery('paygroups', fetchPaygroups, {cacheTime:5000})
  // const {data:allUnits} = useQuery('units', fetchUnits, {cacheTime:5000})
  // const {data:allGrades} = useQuery('grades', fetchGrades, {cacheTime:5000})
  // const {data:allNotches} = useQuery('notches', fetchNotches, {cacheTime:5000})
  // const {data:allNations} = useQuery('nations', fetchNationalities, {cacheTime:5000})
  // const {data:allJobTitles} = useQuery('jobtitle', fetchJobTitles, {cacheTime:5000})

  //   const handleTabChange = (newTab:any) => {
  //     setActiveTab(newTab);
  //   }

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
    setFileList(newFileList)
  }

  // to preview the uploaded file
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const url = `${Api_Endpoint}/Notes`
  const OnSUbmit = handleSubmit(async (values, event) => {
    event?.preventDefault()
    setLoading(true)
    const data = {
      guestId: parms.id,
      notes: values.notes,
    }
    console.log(data)
    try {
      console.log(data)
      const response = await axios.post(url, data)
      setSubmitLoading(false)
      reset()
      navigate('/grm/Guests/', {replace: true})
      return response.statusText
    } catch (error: any) {
      setSubmitLoading(false)
      return error.statusText
    }
  })

  return (
    <div
      className='col-12'
      style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '5px',

        boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
      }}
    >
      <Link to='/grm/Guests/'>
        <a
          style={{fontSize: '16px', fontWeight: '500'}}
          className='mb-7 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'
        >
          Back to list
        </a>
      </Link>
      <form onSubmit={OnSUbmit}>
        <div className='tab-content'>
          {/* Details */}
          {
            <div className='col-8'>
              {/* <div className='row mb-0'>
              <div className='col-6 mb-7'>
                <Upload
                      
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                > 
                  <UploadOutlined />
                </Upload>
              </div>
              
            </div> */}
              <div className='row mb-0'>
                <div className='col-6 mb-7'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Note
                  </label>
                  <textarea
                    {...register('notes')}
                    className='form-control form-control-solid'
                    style={{height: '100px'}}
                  />
                </div>
              </div>
            </div>
          }
        </div>
        <button className='btn btn-primary' onClick={OnSUbmit} type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export {NotesForm}


import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./formStyle.css"
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { BANKS, CATEGORY, DEPARTMENTS, DIVISION, GRADES, NOTCHES, NOTES, PAYGROUP, UNITS } from '../../../../data/DummyData';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Api_Endpoint} from '../../../../services/ApiCalls';
import { useQuery } from 'react-query';
import {useNavigate, Navigate } from 'react-router-dom';

const GuestMultiTabForm= () =>{
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('tab1');
  const {register, reset, handleSubmit} = useForm();
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
  const handleTabClick = (tab:any) => {
    setActiveTab(tab);
  }

  const navigate = useNavigate();

  const handleTabChange = (newTab:any) => {
    setActiveTab(newTab);
  }

  const [fileList, setFileList] = useState<UploadFile[]>([
    
  ]);

  const onChange: UploadProps['onChange'] = (info) => {
    let fileList = [...info.fileList];
    
    // Limit the file list to only one file
    fileList = fileList.slice(-1);
    
    // Update the state with the new file list
    setFileList(fileList);
  };

  const onPreview = async (file:any) => {
    let src = file.url;
    
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    
    const image = new Image();
    image.src = src;
    
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

    const url = `${Api_Endpoint}/guests`
    // const OnSUbmit = handleSubmit( async (values, event)=> {
    //   event?.preventDefault();
    //   setLoading(true)
    //   const data = {
    //     firstName: values.firstName,
    //     lastname: values.lastname,
    //     email: values.email,
    //     account: values.account,
    //     gender: values.gender,
    //     dob: values.dob,
    //     phoneNumber: values.phoneNumber,
    //     idType: values.idType,
    //     nationality: values.nationality,
    //     idNumber: values.idNumber,
    //     docUrl:'',
    //       }
    //       console.log(data)
    //   try {
    //     console.log(data)
    //     const response = await axios.post(url, data)
    //     setSubmitLoading(false)
    //     reset()
    //     navigate('/grm/Guests/', {replace: true})
    //     return response.statusText
    //   } catch (error: any) {
    //     setSubmitLoading(false)
    //     return error.statusText
    //   }
    // })
  
    const OnSubmit = handleSubmit(async (values, event) => {
      event?.preventDefault();
      setLoading(true);
    
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastname", values.lastname);
      formData.append("email", values.email);
      formData.append("account", values.account);
      formData.append("gender", values.gender);
      formData.append("dob", values.dob);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("idType", values.idType);
      formData.append("nationality", values.nationality);
      formData.append("idNumber", values.idNumber);
      if (fileList[0]?.originFileObj) {
        const file = fileList[0].originFileObj as File;
        formData.append("file", file);
      }
      
      // formData.append("file", fileList[0]?.originFileObj);
    
      try {
        const response = await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        setSubmitLoading(false);
        reset();
        navigate('/grm/Guests/', { replace: true });
        return response.statusText;
      } catch (error:any) {
        setSubmitLoading(false);
        return error.statusText;
      }
    });
    

  return (
    <div
    className="col-12"
      style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '5px',
     
        boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
      }}
    >


      
      <Link to="/grm/Guests/">
        <a style={{fontSize:"16px", fontWeight: "500"}} className='mb-7 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
          Back to list
        </a>
      </Link>
      
       
        <div className="tabs">
        
          
        </div>
        <form onSubmit={OnSubmit}>
        {/* <form onSubmit={OnSUbmit}> */}
        <div className="tab-content">
        
          {/* Details */}
          {activeTab === 'tab1' && 
          <div className='col-8'>
            <div className='row mb-0'>
              <div className='col-6 mb-7'>
              <Upload
  listType="picture-card"
  fileList={fileList}
  onChange={onChange}
  onPreview={onPreview}
  multiple={false}
> 
  <UploadOutlined />
</Upload>

              </div>
              
            </div>
            <div className='row mb-0'>
              <div className='col-6 mb-7'>
              <label htmlFor="exampleFormControlInput1" className="required form-label">First Name</label>
              <input type="text"  {...register("firstName")}  className="form-control form-control-solid" />
              </div>
              <div className='col-6 mb-7'>
              <label htmlFor="exampleFormControlInput1" className="required form-label">Last Name</label>
              <input type="text" {...register("lastname")}  className="form-control form-control-solid" />
              </div>
            </div>
            <div className='row mb-0'>
              <div className='col-6 mb-7'>
              <label htmlFor="exampleFormControlInput1" className="required form-label">Email</label>
              <input type="text"  {...register("email")}  className="form-control form-control-solid" />
              </div>
              

              <div className='col-6 mb-7'>
                <label htmlFor="exampleFormControlInput1" className=" form-label">Account</label>
                  <select {...register("account")} className="form-select form-select-solid" aria-label="Select example">
                  <option>select </option>
                  <option value="NESTLE">NESTLE</option>
                  <option value="UN">UN</option>
                  <option value="WHO">WHO</option>
                  <option value="MICROSOFT">MICROSOFT</option>
                 
                </select>
              </div>
            </div>

            <div className='row mb-0'>
              <div className='col-6 mb-7'>
              <label htmlFor="exampleFormControlInput1" className="required form-label">Date of Birth</label>
                <input type="date" {...register("dob")}  className="form-control form-control-solid" />
              </div>
              <div className='col-6 mb-7'>
                <label htmlFor="exampleFormControlInput1" className="required form-label">Phone Number</label>
                <input type="text" {...register("phoneNumber")}  className="form-control form-control-solid" />
              </div>
            </div>
            <div className='row mb-0'>
              
              <div className='col-6 mb-7'>
                <label htmlFor="exampleFormControlInput1" className=" form-label">Gender</label>
                  <select {...register("gender")} className="form-select form-select-solid" aria-label="Select example">
                  <option>select </option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                 
                </select>
              </div>
              <div className='col-6 mb-7'>
                <label htmlFor="exampleFormControlInput1" className=" form-label">ID Type</label>
                  <select {...register("idType")} className="form-select form-select-solid" aria-label="Select example">
                  <option>select </option>
                  <option value="PASSPORT">PASSPORT</option>
                  <option value="LICENCE">LICENCE</option>
                  <option value="NATIONAL ID">NATIONAL ID</option>
                 
                </select>
              </div>
            </div>
            <div className='row mb-0'>
            <div className='col-6 mb-7'>
              <label htmlFor="exampleFormControlInput1" className="required form-label">Nationality</label>
              <input type="text" {...register("nationality")}  className="form-control form-control-solid" />
              </div>
              <div className='col-6 mb-7'>
                <label htmlFor="exampleFormControlInput1" className=" form-label">ID Number</label>
                <input type="text" {...register("idNumber")} className="form-control form-control-solid" /> 
              </div>
            </div>

          </div>
          }
          
        </div>
        <button className='btn btn-primary' onClick={OnSubmit} type="submit">Submit</button>
        {/* <button className='btn btn-primary' onClick={OnSUbmit} type="submit">Submit</button> */}
      </form>
    </div>
  );
}


export  {GuestMultiTabForm}
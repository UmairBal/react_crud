import React from "react"
import './style.css'
import { deletePost, getContacts } from "../../api/Postapi";
import  { useEffect, useState } from "react";
import HeaderSection from "../headerSection";



const ContentSection = () => {
    const [data, setData] = useState([])
    const [updateDataApi, setUpdateApi] = useState({})
  
    
    const getPostdata = async () => {
        const res = await getContacts();
        setData(res.data)
        console.log(res.data)
    }
    
    useEffect(() => {
        getPostdata();
        
    }, []);
    
    
    const handleDeletePost = async (id) => {
        try {
        
            const res = await deletePost(id);
            console.log(res)
            if (res.status === 200 || res.status === 204) {
                
                
                const newUpdatedData = data.filter((currItem) => {
                    return currItem.id !== id;
                });
                
                setData(newUpdatedData);
            }

        }catch(e) {
            console.log(e)
        }

    };

    // handleUpdatePost
    
    const handleUpdatePost =  (item) => setUpdateApi(item);

    
    return(
        <div className="contacts-section bg-black">
            <HeaderSection updateDataApi = {updateDataApi} setUpdateDataApi = {setUpdateApi} data = {data} setData = {setData}/>
          
            <div className="row gap-1 justify-content-center align-items">
                {data &&
                    data.sort((a, b) => b.id - a.id).map((item) => (
                        <div key={`${item.id}`} className="content-section col-md-3 border-start border-4 border-white text-white" >
                            <div className="p-2">
                                <h3>{item.name}</h3>
                                <p>{item.phone_number}</p>
                                
                                <button className="edt-button" onClick={ () => {handleUpdatePost(item)} }>Edit</button>
                                <button className="del-btn" onClick={ () => {handleDeletePost(item.id)} }>
                                    Delete
                                </button> 
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ContentSection;
// import '../../App.css'
import './style.css'
import { addPost, updateData } from '../../api/Postapi';
import { useEffect, useState } from 'react';


const HeaderSection = ({ data, setData, updateDataApi, setUpdateDataApi }) => {

    const [addData, setAddData] = useState({
        name: '',
        phone_number: '',
    });


    const isEmpty = Object.keys(updateDataApi).length === 0;

    useEffect(() => {
        updateDataApi && setAddData({
            name: updateDataApi.name || '',
            phone_number: updateDataApi.phone_number || '',
        })
    }, [updateDataApi])
    
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value

        setAddData ((prev) => { 
            return {
                ...prev,
                [name]: value,
            };
        });
    };


    const addPostData = async () => { 
        const res = await addPost(addData);
        if (res.status === 201){
            setData([...data, res.data])
            setAddData({name: "", phone_number:"",})
            
        }
    }

    
    const updatePostData = async () => {
       try{
           const res = await updateData(updateDataApi.id, addData);
        if (res.status === 200){
            setData((prev) => {
                return prev.map((currItem) => {
                    return currItem.id === res.data.id? res.data: currItem
                });
            });
            setAddData({name:'',phone_number:''});
            setUpdateDataApi({});
        }
            
        }catch(e) {
            console.log(e)
       }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if (action === "Add"){
            addPostData();
        }
        else if (action === "Edit") {
            updatePostData();
        }

    };
    
    return (

        <div className="container">
            <form className='header' onSubmit={handleFormSubmit}>
                <div className='header-content'>
                    <input name='name' id='name' value={addData.name} onChange={handleInputChange}  className="col" type="text" placeholder='Add title' required />
                    <input name= 'phone_number' id= 'phone_number' value={addData.phone_number} onChange={handleInputChange} className="col" type="text" placeholder='Add Content' required />

                    <button className="col" type='submit' value={isEmpty? "Add": "Edit"}>
                        {isEmpty? "Add": "Update"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default HeaderSection;
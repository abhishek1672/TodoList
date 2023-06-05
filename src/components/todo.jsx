import React, { useState,useEffect } from 'react'
import './style.css'

const Todo = () => {

    // get local storage data
    const getLocalData=()=>
    {
        const lists=localStorage.getItem("myTodoList");
        if(lists)
        {
            return JSON.parse(lists);
        }
        else
        {
            return []
        }
    }
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem,setIsEditItem]=useState("");
    const [toggleBtn,setToggleBtn]=useState(false);


    // Functions-----Start--------------

    //add the items
    const addItem = () => {

        if (!inputData) {
            alert("please fill the data")
        }
        else if(inputData && toggleBtn==true)
        {
            setItems(items.map((currElem)=>
            {
                if(currElem.id===isEditItem)
                {
                    return{...currElem,name:inputData}
                }
                else{
                return currElem;}
                
            }));
            setInputData("");
            setIsEditItem(null);
            setToggleBtn(false)
        }
        else {
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:inputData,
            }
            setItems([...items, myNewInputData]);
            setInputData("")
        }
    }

    // Edit items

    const editItem=(index)=>{

        const item_to_edit=items.find((currElem)=>
        {
            return currElem.id===index;

        });
            setIsEditItem(index);
            setInputData(item_to_edit.name)
            setToggleBtn(true)
    }

    //delete items function

    const deleteItems=(index)=>
    {
        const updatedItems=items.filter((currElem)=>
        {
            return currElem.id!==index;
        });
        setItems(updatedItems)
    }

    //remove All The Elements function

        const removeAll=()=>
        {
            setItems([])
                      
        }


        // Adding Localstorage 

    useEffect(() => {
      localStorage.setItem("myTodoList",JSON.stringify(items))
    }, [items]);
    

    // Functions-----End---------------


// -------------------------------------------//
    return (


        <>

            <div className='main-div'>
                <div className="child-div">
                    <figure>
                        <img src="./images/todolist.jfif" alt="" />
                        <figcaption>Add Your List Here ✌️</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text"
                            placeholder='✍️ Add Item'
                            className='form-control'
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        {toggleBtn == false ? <i className="fa-solid fa-plus fa-lg  add-btn" onClick={addItem} style={{ color: "#37e643", marginLeft: "-20px" }}></i> : <i className=" fa-sharp fa-solid fa-xl fa-pen-to-square" onClick={addItem} ></i>}
                        
                    </div>



                    {/* show items */}
                    <div className="showItems">

                        {items.map((currElem) => {
                            return (
                                <div className="eachItem" key={currElem.id}>
                                    <h3>{currElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className=" fa-sharp fa-solid fa-xl fa-pen-to-square"onClick={()=>editItem(currElem.id)}></i>
                                        <i className="fa-solid fa-trash fa-xl" onClick={()=>deleteItems(currElem.id)}></i>
                                    </div>
                                </div>

                            )
                        })};

                    </div>


                    {/* remove all btn */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>
                    </div>
                </div>


            </div>


        </>
    )
}

export default Todo
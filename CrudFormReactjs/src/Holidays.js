import React,{Component, useState} from 'react';
import {variables} from './Variables.js';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

export class Holidays extends Component{
    
    
    constructor(props){
        super(props);

        this.state={
            holidays:[],
            modalTitle:"",
            HolidayId:0,
            HolidayName:"",
            HolidayStartDate:"",
            HolidayEndDate:""
        
        }
    }

    refreshList(){
        fetch('http://localhost:5191/api/Holiday')
        .then(response=>response.json())
        .then(data=>{
            this.setState({holidays:data});
        });
    } 

    componentDidMount(){
        this.refreshList();
    }
    
    changeHolidayId=(e)=>{
        this.setState({HolidayId:e.target.value});
    }
    changeHolidayName =(e)=>{
        this.setState({HolidayName:e.target.value});
    }
    changeHolidayStartDate =(e)=>{
        this.setState({HolidayStartDate:e.target.value});
    }
    changeHolidayEndDate =(e)=>{
        this.setState({HolidayEndDate:e.target.value});
    }
    addClick(){
        this.setState({
            modalTitle:"Add Holiday Data",       
            HolidayId:0,
            HolidayName:"",
            HolidayStartDate:"",
            HolidayEndDate:""
        });
    }
    editClick(ev){
        this.setState({
            modalTitle:"Edit Holiday Data",
            HolidayId:ev.HOLIDAY_ID,
            HolidayName:ev.HOLIDAY_NAME,
            HolidayStartDate:ev.HOLIDAY_STARTDATE,
            HolidayEndDate:ev.HOLIDAY_ENDDATE

        });
    }

    createClick(){
        fetch('http://localhost:5191/api/Holiday' ,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                HolidayName:this.state.HolidayName,
                HolidayStartDate:this.state.HolidayStartDate,
                HolidayEndDate:this.state.HolidayEndDate
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch('http://localhost:5191/api/Holiday' ,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                HolidayName:this.state.HolidayName,
                HolidayStartDate:this.state.HolidayStartDate,
                HolidayEndDate:this.state.HolidayEndDate
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(Id){
        if(window.confirm('Are you sure?')){
        fetch('http://localhost:5191/api/Holiday/' +Id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
                holidays,
                modalTitle,
                HolidayId,
                HolidayName,
                HolidayStartDate,
                HolidayEndDate,
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Holiday
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">
            </div>
            HolidayId
        </th>
        <th>
        <div className="d-flex flex-row">
            </div>
            HolidayName
      
        </th>
        <th>
            HolidayStartDate
        </th>
        <th>
            HolidayEndDate
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
       
        {holidays.map(ev=>
            <tr key={ev.HOLIDAY_ID}>
                <td>{ev.HOLIDAY_NAME}</td>
                <td>{ev.HOLIDAY_STARTDATE}</td>
                <td>{ev.HOLIDAY_ENDDATE}</td>


                
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(ev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(ev.HOLIDAY_ID)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>
    
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
       

       <div className="input-group mb-3">
        <span className="input-group-text">HolidayName</span>
        <input type="text" className="form-control"
        value={HolidayName}
        onChange={this.changeHolidayName}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">HolidayStartDate</span>
        <input type="text" className="form-control"
        value={HolidayStartDate}
        onChange={this.changeHolidayStartDate}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">HolidayEndDate</span>
        <input type="text" className="form-control"
        value={HolidayEndDate}
        onChange={this.changeHolidayEndDate}/>
       </div>


        {HolidayId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {HolidayId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

</div>
</div> 
</div>


</div>

        )
    
    }
}
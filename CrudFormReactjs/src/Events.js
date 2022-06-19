import React,{Component, useState} from 'react';
import {variables} from './Variables.js';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

export class Events extends Component{
    
    
    constructor(props){
        super(props);

        this.state={
            events:[],
            modalTitle:"",
            EventId:0,
            EventName:"",
            EventStartDate:"",
            EventEndDate:"",
            Status:""
        
        }
    }

    refreshList(){
        fetch('http://localhost:5191/api/Events' )
        .then(response=>response.json())
        .then(data=>{
            this.setState({events:data});
        });
    } 

    componentDidMount(){
        this.refreshList();
    }
    
    changeEventId=(e)=>{
        this.setState({EventId:e.target.value});
    }
    changeEventName =(e)=>{
        this.setState({EventName:e.target.value});
    }
    changeEventDescription=(e)=>{
        this.setState({EventDescription:e.target.value});
    }
    changeEventStartDate =(e)=>{
        this.setState({EventStartDate:e.target.value});
    }
    changeEventEndDate =(e)=>{
        this.setState({EventEndDate:e.target.value});
    }
    changeStatus =(e)=>{
        this.setState({Status:e.target.value});
    }
    addClick(){
        this.setState({
            modalTitle:"Add Events Data",       
            EventId:0,
            EventName:"",
            EventStartDate:"",
            EventEndDate:"",
            Status:""
        });
    }
    editClick(ev){
        this.setState({
            modalTitle:"Edit Events Data",
            EventId:ev.EVENT_ID,
            EventName:ev.EVENT_NAME,
            EventDescription:ev.EVENT_DESCRIPTION,
            EventStartDate:ev.EVENT_STARTDATE,
            EventEndDate:ev.EVENT_ENDDATE,
            Status:ev.STATUS

        });
    }

    createClick(){
        fetch('http://localhost:5191/api/Events' ,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EventName:this.state.EventName,
                EventDescription:this.state.EventDescription,
                EventStartDate:this.state.EventStartDate,
                EventEndDate:this.state.EventEndDate,
                Status:this.state.Status
                
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
        fetch('http://localhost:5191/api/Events' ,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EventName:this.state.EventName,
                EventDescription:this.state.EventDescription,
                EventStartDate:this.state.EventStartDate,
                EventEndDate:this.state.EventEndDate,
                Status:this.state.Status
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
        fetch('http://localhost:5191/api/Events/' +Id,{
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
                events,
                modalTitle,
                EventId,
                EventName,
                EventDescription,
                EventStartDate,
                EventEndDate,
                Status
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Events
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">
            </div>
            EventId
        </th>
        <th>
        <div className="d-flex flex-row">
            </div>
            EventName
      
        </th>
        <th>
           EventDescription
        </th>
        <th>
            EventStartDate
        </th>
        <th>
            EventEndDate
        </th>
        <th>
            Status
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
       
        {events.map(ev=>
            <tr key={ev.EVENT_ID}>
                <td>{ev.EVENT_NAME}</td>
                <td>{ev.EVENT_DESCRIPTION}</td>
                <td>{ev.EVENT_STARTDATE}</td>
                <td>{ev.EVENT_ENDDATE}</td>
                <td>{ev.STATUS}</td>


                
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
                onClick={()=>this.deleteClick(ev.EVENT_ID)}>
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
        <span className="input-group-text">EventName</span>
        <input type="text" className="form-control"
        value={EventName}
        onChange={this.changeEventName}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">EventDescription</span>
        <input type="text" className="form-control"
        value={EventDescription}
        onChange={this.changeEventDescription}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">EventStartDate</span>
        <input type="text" className="form-control"
        value={EventStartDate}
        onChange={this.changeEventStartDate}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">EventEndDate</span>
        <input type="text" className="form-control"
        value={EventEndDate}
        onChange={this.changeEventEndDate}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Status</span>
        <input type="text" className="form-control"
        value={Status}
        onChange={this.changeStatus}/>
       </div>


        {EventId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {EventId!=0?
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
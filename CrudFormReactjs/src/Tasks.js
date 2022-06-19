import React,{Component, useState} from 'react';
import {variables} from './Variables.js';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

export class Tasks extends Component{
    
    
    constructor(props){
        super(props);

        this.state={
            tasks:[],
            modalTitle:"",
            TaskId:0,
            Task:"",
            TaskType:"",
            DueDate:"",
            InsertDate:"",
            Status:"",
            EmployeeId:""
        
        }
    }

    refreshList(){
        fetch('http://localhost:5191/api/Tasks')
        .then(response=>response.json())
        .then(data=>{
            this.setState({tasks:data});
        });
    } 

    componentDidMount(){
        this.refreshList();
    }
    
    changeTaskId=(e)=>{
        this.setState({TaskId:e.target.value});
    }
    changeTask =(e)=>{
        this.setState({Task:e.target.value});
    }
    changeTaskType =(e)=>{
        this.setState({TaskType:e.target.value});
    }
    changeDueDate =(e)=>{
        this.setState({DueDate:e.target.value});
    }
    changeInsertDate =(e)=>{
        this.setState({InsertDate:e.target.value});
    }
    changeStatus=(e)=>{
        this.setState({Status:e.target.value});
    }
    changeEmployeeId=(e)=>{
        this.setState({EmployeeId:e.target.value});
    }
    addClick(){
        this.setState({
            modalTitle:"Add Contact Data",       
            TaskId:0,
            Task:"",
            TaskType:"",
            DueDate:"",
            InsertDate:"",
            Status:"",
            EmployeeId:""
        });
    }
    editClick(ev){
        this.setState({
            modalTitle:"Edit Contact Data",
            TaskId:ev.TASK_ID,
            Task:ev.TASK,
            TaskType:ev.TASK_TYPE,
            DueDate:ev.DUE_DATE,
            InsertDate:ev.INSERT_DATE,
            Status:ev.STATUS,
            EmployeeId:ev.EMPLOYEE_ID

        });
    }

    createClick(){
        fetch('http://localhost:5191/api/Tasks' ,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Task:this.state.Task,
                TaskType:this.state.TaskType,
                DueDate:this.state.DueDate,
                InsertDate:this.state.InsertDate,
                Status:this.state.Status,
                EmployeeId:this.state.EmployeeId

                
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
        fetch('http://localhost:5191/api/Tasks' ,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Task:this.state.Task,
                TaskType:this.state.TaskType,
                DueDate:this.state.DueDate,
                InsertDate:this.state.InsertDate,
                Status:this.state.Status,
                EmployeeId:this.state.EmployeeId
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
        fetch('http://localhost:5191/api/Tasks/' +Id,{
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
                tasks,
                modalTitle,
                TaskId,
                Task,
                TaskType,
                DueDate,
                InsertDate,
                Status,
                EmployeeId
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Contact
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">
            </div>
            TaskId
        </th>
        <th>
        <div className="d-flex flex-row">
            </div>
            Task
      
        </th>
        <th>
            DueDate
        </th>
        <th>
            InsertDate
        </th>
        <th>
            Status
        </th>
        <th>
            EmployeeId
        </th>
    </tr>
    </thead>
    <tbody>
       
        {tasks.map(ev=>
            <tr key={ev.TASK_ID}>
                <td>{ev.TASK}</td>
                <td>{ev.DUE_DATE}</td>
                <td>{ev.INSERT_DATE}</td>
                <td>{ev.STATUS}</td>
                <td>{ev.EMPLOYEE_ID}</td>


                
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
                onClick={()=>this.deleteClick(ev.TASK_ID)}>
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
        <span className="input-group-text">Task</span>
        <input type="text" className="form-control"
        value={Task}
        onChange={this.changeTask}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">TaskType</span>
        <input type="text" className="form-control"
        value={TaskType}
        onChange={this.changeTaskType}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">DueDate</span>
        <input type="text" className="form-control"
        value={DueDate}
        onChange={this.changeDueDate}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">InsertDate</span>
        <input type="text" className="form-control"
        value={InsertDate}
        onChange={this.changeInsertDate}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Status</span>
        <input type="text" className="form-control"
        value={Status}
        onChange={this.changeStatus}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">EmployeeId</span>
        <input type="text" className="form-control"
        value={EmployeeId}
        onChange={this.changeEmployeeId}/>
       </div>


        {TaskId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {TaskId!=0?
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
import React,{Component, useState} from 'react';
import {variables} from './Variables.js';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

export class EmergencyContact extends Component{
    
    
    constructor(props){
        super(props);

        this.state={
            emergencycontacts:[],
            modalTitle:"",
            RowId:0,
            FirstName:"",
            LastName:"",
            Address:"",
            Email:"",
            PhoneNumber:"",
            Relation:"",
            EmployeeId:""
        
        }
    }

    refreshList(){
        fetch('http://localhost:5191/api/EmergencyContact')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emergencycontacts:data});
        });
    } 

    componentDidMount(){
        this.refreshList();
    }
    
    changeRowId=(e)=>{
        this.setState({RowId:e.target.value});
    }
    changeFirstName =(e)=>{
        this.setState({FirstName:e.target.value});
    }
    changeLastName =(e)=>{
        this.setState({LastName:e.target.value});
    }
    changeAddress =(e)=>{
        this.setState({Address:e.target.value});
    }
    changeEmail =(e)=>{
        this.setState({Email:e.target.value});
    }
    changePhoneNumber =(e)=>{
        this.setState({PhoneNumber:e.target.value});
    }
    changeRelation =(e)=>{
        this.setState({Relation:e.target.value});
    }
    changeEmployeeId=(e)=>{
        this.setState({EmployeeId:e.target.value});
    }
    addClick(){
        this.setState({
            modalTitle:"Add Contact Data",       
            RowId:0,
            FirstName:"",
            LastName:"",
            Address:"",
            Email:"",
            PhoneNumber:"",
            Relation:"",
            EmployeeId:""
        });
    }
    editClick(ev){
        this.setState({
            modalTitle:"Edit Contact Data",
            RowId:ev.ROW_ID,
            FirstName:ev.FIRST_NAME,
            LastName:ev.LAST_NAME,
            Address:ev.ADDRESS,
            Email:ev.EMAIL,
            PhoneNumber:ev.PHONE_NUMBER,
            Relation:ev.RELATION,
            EmployeeId:ev.EMPLOYEE_ID

        });
    }

    createClick(){
        fetch('http://localhost:5191/api/EmergencyContact' ,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                FirstName:this.state.FirstName,
                LastName:this.state.LastName,
                Address:this.state.Address,
                Email:this.state.Email,
                PhoneNumber:this.state.PhoneNumber,
                Relation:this.state.Relation,
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
        fetch('http://localhost:5191/api/EmergencyContact' ,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                FirstName:this.state.FirstName,
                LastName:this.state.LastName,
                Address:this.state.Address,
                Email:this.state.Email,
                PhoneNumber:this.state.PhoneNumber,
                Relation:this.state.Relation,
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
        fetch('http://localhost:5191/api/EmergencyContact/' +Id,{
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
                emergencycontacts,
                modalTitle,
                RowId,
                FirstName,
                LastName,
                Address,
                Email,
                PhoneNumber,
                Relation,
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
            RowId
        </th>
        <th>
        <div className="d-flex flex-row">
            </div>
            FirstName
      
        </th>
        <th>
            LastName
        </th>
        <th>
            Address
        </th>
        <th>
            Email
        </th>
        <th>
            PhoneNumber
        </th>
        <th>
            Relation
        </th>
        <th>
            EmployeeId
        </th>
    </tr>
    </thead>
    <tbody>
       
        {emergencycontacts.map(ev=>
            <tr key={ev.ROW_ID}>
                <td>{ev.FIRST_NAME}</td>
                <td>{ev.LAST_NAME}</td>
                <td>{ev.ADDRESS}</td>
                <td>{ev.EMAIL}</td>
                <td>{ev.PHONE_NUMBER}</td>
                <td>{ev.RELATION}</td>
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
                onClick={()=>this.deleteClick(ev.ROW_ID)}>
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
        <span className="input-group-text">FirstName</span>
        <input type="text" className="form-control"
        value={FirstName}
        onChange={this.changeFirstName}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">LastName</span>
        <input type="text" className="form-control"
        value={LastName}
        onChange={this.changeLastName}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Address</span>
        <input type="text" className="form-control"
        value={Address}
        onChange={this.changeAddress}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Email</span>
        <input type="text" className="form-control"
        value={Email}
        onChange={this.changeEmail}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">PhoneNumber</span>
        <input type="text" className="form-control"
        value={PhoneNumber}
        onChange={this.changePhoneNumber}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Relation</span>
        <input type="text" className="form-control"
        value={Relation}
        onChange={this.changeRelation}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">EmployeeId</span>
        <input type="text" className="form-control"
        value={EmployeeId}
        onChange={this.changeEmployeeId}/>
       </div>


        {RowId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {RowId!=0?
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
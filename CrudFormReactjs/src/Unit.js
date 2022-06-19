import React,{Component, useState} from 'react';
import {variables} from './Variables.js';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

export class Unit extends Component{
    
    
    constructor(props){
        super(props);

        this.state={
            unit:[],
            modalTitle:"",
            UnitId:0,
            UnitName:"",
            UnitDescription:"",
            CreatedDate:""
        
        }
    }

    refreshList(){
        fetch('http://localhost:5191/api/Units')
        .then(response=>response.json())
        .then(data=>{
            this.setState({unit:data});
        });
    } 

    componentDidMount(){
        this.refreshList();
    }
    
    changeUnitId=(e)=>{
        this.setState({UnitId:e.target.value});
    }
    changeUnitName =(e)=>{
        this.setState({UnitName:e.target.value});
    }
    changeUnitDescription =(e)=>{
        this.setState({UnitDescription:e.target.value});
    }
    changeCreatedDate=(e)=>{
        this.setState({CreatedDate:e.target.value});
    }
    addClick(){
        this.setState({
            modalTitle:"Add Unit Data",       
            UnitId:0,
            UnitName:"",
            UnitDescription:"",
            CreatedDate:""
        });
    }
    editClick(ev){
        this.setState({
            modalTitle:"Edit Unit Data",
            UnitId:ev.UNIT_ID,
            UnitName:ev.UNIT_NAME,
            UnitDescription:ev.UNIT_DESCRIPTION,
            CreatedDate:ev.CREATED_DATE

        });
    }

    createClick(){
        fetch('http://localhost:5191/api/Units'  ,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UnitName:this.state.UnitName,
                UnitDescription:this.state.UnitDescription,
                CreatedDate:this.state.CreatedDate
                
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
        fetch('http://localhost:5191/api/Units'  ,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UnitName:this.state.UnitName,
                UnitDescription:this.state.UnitDescription,
                CreatedDate:this.state.CreatedDate
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
        fetch('http://localhost:5191/api/Units/'  +Id,{
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
                unit,
                modalTitle,
                UnitId,
                UnitName,
                UnitDescription,
                CreatedDate,
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Unit
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">
            </div>
            UnitId
        </th>
        <th>
        <div className="d-flex flex-row">
            </div>
            UnitName
      
        </th>
        <th>
            UnitDescription
        </th>
        <th>
            CreatedDate
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
       
        {unit.map(ev=>
            <tr key={ev.UNIT_ID}>
                <td>{ev.UNIT_NAME}</td>
                <td>{ev.UNIT_NAME}</td>
                <td>{ev.UNIT_DESCRIPTION}</td>
                <td>{ev.CREATED_DATE}</td>


                
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
                onClick={()=>this.deleteClick(ev.UNIT_ID)}>
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
        <span className="input-group-text">UnitName</span>
        <input type="text" className="form-control"
        value={UnitName}
        onChange={this.changeUnitName}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">UnitDescription</span>
        <input type="text" className="form-control"
        value={UnitDescription}
        onChange={this.changeUnitDescription}/>
       </div>

       <div className="input-group mb-3">
        <span className="input-group-text">CreatedDate</span>
        <input type="text" className="form-control"
        value={CreatedDate}
        onChange={this.changeCreatedDate}/>
       </div>


        {UnitId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {UnitId!=0?
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
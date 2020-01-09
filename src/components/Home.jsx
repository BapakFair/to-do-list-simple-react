import React, { Component, useState } from 'react'
import ReactDOM from "react-dom";
import { Card, Form, Button, Table, FormCheck } from 'react-bootstrap'
// import './style.css'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal'

export class Home extends Component {
    state = {
            title:"",
            description:"",
        
        list: [
            {   "id": 1,
                "title": "Make a meal",
                "description":"lorem ipsum",
                "status": 0,
                "createdAt": "2019-11-15 18:00"
            },
            {   "id": 2,
                "title": "Dinner with family",
                "description":"lorem ipsum",
                "status": 0,
                "createdAt":"2019-11-16 18:00"
            },
            {   "id": 3,
                "title": "Watch scary movie",
                "description": "lorem ipsum",
                "status": 0,
                "createdAt": "2019-11-15 13:00"
            },
            {   "id": 4,
                "title": "Learn something new",
                "description": "lorem ipsum",
                "status": 1,
                "createdAt": "2019-11-15 08:00"
            },
            {   "id": 5,
                "title": "Make a phone call to mom",
                "description": "lorem ipsum",
                "status": 1,
                "createdAt": "2019-11-15 04:00"
            }
        ]
    }
    

    updateInput(key, value) {
        this.setState({ [key]: value });
    }

    addItem() {
        const newTask = {
            id: 1 + Math.random(),
            title: this.state.title,
            status:0,
            description: this.state.description,
            createdAt: new Date()
        };
        const list = [...this.state.list];
        list.push(newTask);
        this.setState({
            list
        });
    }

    showTask = () => {
        let rendTask = this.state.list.map(val => {
            if (val.status == 0) {
                return (
                    <tr key={val.id}>
                        <td>{val.title}</td>
                        <td>
                            <Button variant="success" onClick={() => { this.doneTask(val.id) }} className="mr-2">Done</Button>
                            <Button className="btn btn-floating mr-2" variant="danger" onClick={() => this.deleteItem(val.id)}>
                                <i class="material-icons">x </i>
                            </Button>
                            <Button className="btn btn-floating" onClick={() => this.updateItem(val.id)}>
                                <i class="material-icons"> update</i>
                            </Button>
                        </td>
                    </tr>
                )
            }
        })
        return rendTask
    }

    showTaskDone = () => {
        let rendTask = this.state.list.map(val => {
            if (val.status == 1) {
                return (
                    <tr>
                        <td><strike><i>{val.title}</i></strike></td>
                        <td>
                            <Button variant="danger" onClick={() => { this.cancelTask(val.id) }} className="mr-3">Cancel</Button>
                        </td>
                    </tr>
                )   
            }
        })
        return rendTask
    }

    deleteItem(id) {
        const list = [...this.state.list];
        const updatedList = list.filter(item => item.id !== id);
        this.setState({ list: updatedList });
    }

    cancelTask(id) {
        const list = [...this.state.list];
        const updatedList = list.filter(item => item.id !== id);
        let dataUpdate = list.filter(item => item.id === id);
        let dataPush = {
            id: dataUpdate[0].id,
            title: dataUpdate[0].title,
            status: 0,
            description: dataUpdate[0].description,
            createdAt: new Date()
        }
        console.log(dataPush)
        let List = [...updatedList, dataPush]
        this.setState({ list: List });
    }

    doneTask(id) {
        const list = [...this.state.list];
        const updatedList = list.filter(item => item.id !== id);
        let dataUpdate = list.filter(item => item.id === id);
        let dataPush = {
            id: dataUpdate[0].id,
            title: dataUpdate[0].title,
            status: 1,
            description: dataUpdate[0].description,
            createdAt: new Date()   
        }
        console.log(dataPush)
        let List = [...updatedList, dataPush]
        this.setState({ list: List });
    }
    
    render() {
        return (
            <div className="row container mt-2 ">
                <div className="col-8" style={{marginLeft:"auto", marginRight:"auto"}}>
                    <Card style={{ width: '90%' }} className="p-2 ml-4">
                        <Card>
                            <h2 className="mx-auto mt-2 mb-2">To do list</h2>
                            <hr className="w-50 mx-auto"></hr>
                            
                            <input
                                type="text"
                                placeholder="Type task here"
                                value={this.state.title}
                                onChange={e => this.updateInput("title", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Type description here"
                                value={this.state.description}
                                onChange={e => this.updateInput("description", e.target.value)}
                            />
                            <button
                                className="add-btn btn-floating"
                                onClick={() => this.addItem()}
                            >
                                <i class="material-icons"> Add Task </i>
                            </button>
                            
                        </Card>
                    </Card>
                </div>
                    
                    <div className="col-6 " style={{marginLeft: "auto", marginTop: 15}}>
                        <Card style={{ width: 'auto' }} className=" p-2">
                            <Table striped bordered hover>
                                <thead className="text-center">
                                    <tr>
                                        <th style={{ width: 'auto' }}><h1 className="mt-1">List Tasks</h1></th>
                                        <th><h5 className="mx-auto">Action</h5></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showTask()}
                                </tbody>
                            </Table>
                        </Card>
                    </div>

                    <div className="col-6" style={{marginRight: "auto", marginTop: 15}}>
                        <Card style={{ width: 'auto' }} className=" p-2">
                            <Table striped bordered hover>
                                <thead className="text-center">
                                    <tr>
                                        <th style={{ width: '31rem' }}><h1 className="mt-1">List Tasks Done</h1></th>
                                        <th><h5 className="mt-1 mb-3 mx-auto">Action</h5></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showTaskDone()}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
            </div>
        )
    }
}

export default Home

import React, { Component } from 'react'
import { Card, Form, Button, Table, FormCheck } from 'react-bootstrap'
// import './style.css'
import Swal from 'sweetalert2'

export class Home extends Component {
    state = {
            title:"",
            description:""
        ,
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
        // update react state
        this.setState({ [key]: value });
    }

    addItem() {
        const newTask = {
            id: this.state.list.length + 1,
            title: this.state.title,
            status:0,
            description: this.state.description

        };
        const list = [...this.state.list];

        list.push(newTask);

        this.setState({
            list,
            // newTask: ""
        });
    }

    showTask = () => {
        let rendTask = this.state.list.map(val => {
            if (val.status == 0) {
                return (
                    <tr key={val.id}>
                        <td>{val.title}</td>
                        <td>
                            <Button variant="success" onClick={() => { this.doneTask(val.id) }} className="mr-3">Done</Button>
                            <Button className="btn btn-floating" onClick={() => this.deleteItem(val.id)}>
                                <i class="material-icons">x</i>
                            </Button>
                            <Button className="btn btn-floating" onClick={() => this.deleteItem(val.id)}>
                                <i class="material-icons">update</i>
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
        // copy current list of items
        const list = [...this.state.list];
        // filter out the item being deleted
        const updatedList = list.filter(item => item.id !== id);

        this.setState({ list: updatedList });
    }
    // isiState = () =>{
    //     this.setState({newTask:target.value})
    // }
    
    render() {
        console.log(this.state.title)
        console.log(this.state.description)
        console.log(this.state.list)


        return (
            <div className="row container mt-5 ">
                <div className="col-12 col-md-5">
                    <Card style={{ width: '90%' }} className="p-2 ml-4">
                        <Card>
                            <h2 className="mx-auto mt-3">To do list</h2>
                            <hr className="w-50 mx-auto"></hr>
                            {/* <Form>
                                <Form.Group className="w-100 mx-auto">
                                    <Form.Control ref={(input) => this.task = input} type="text" placeholder="What do you want to do ?" />
                                </Form.Group>
                            </Form>
                            <Button onClick={this.submitTask} style={{ width: '40%' }} variant="secondary" className="mb-3 mx-auto">Add</Button> */}
                            <input
                                type="text"
                                placeholder="Type item here"
                                value={this.state.title}
                                onChange={e => this.updateInput("title", e.target.value)}
                                // onChange={this.isiState}
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
                                // disabled={!this.state.newItem.length}
                            >
                                <i class="material-icons"> + </i>
                            </button>
                            
                        </Card>
                    </Card>
                </div>
                <div className="col-4 col-md-4">
                    <Card style={{ width: '150%' }} className=" p-2">
                        <Table striped bordered hover>
                            <thead className="text-center">
                                <tr>
                                    <th style={{ width: '31rem' }}><h1 className="mt-1">List Tasks</h1></th>
                                    <th><h5 className="mt-1 mb-3 mx-auto">Action</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showTask()}
                            </tbody>
                        </Table>
                    </Card>
                </div>

                <div className="col-4 col-md-4">
                    <Card style={{ width: '150%' }} className=" p-2">
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
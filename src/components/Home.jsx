import React, { Component } from 'react';
import { Card, Button, Table, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'

class Home extends Component {
    state = {
            title:"",
            description:"",
            show:false,
            isi:[],
            list: []
    };
    

    updateInput(key, value) {
        this.setState({ [key]: value });
    };

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
    };

    showTask = () => {
        let urut = [...this.state.list]
            urut = urut.sort((a, b) => a.createdAt - b.createdAt)
        let rendTask = urut.map(val => {
            if (val.status === 0) {
                return (
                    <tr key={val.id}>
                        <td>{val.title}</td>
                        <td>
                            <Button variant="success" onClick={() => { this.doneTask(val.id) }} className="mr-2">Done</Button>
                            <Button className="btn btn-floating mr-2" variant="danger" onClick={() => this.deleteItem(val.id)}>
                                <i class="material-icons">x </i>
                            </Button>
                            <Button className="btn btn-floating" onClick={() => this.detailTask(val.id)}>
                                <Modal show={this.state.show} onHide={()=> this.setState({show:false})}>
                                    <Modal.Header closeButton> Detail </Modal.Header>
                                    <Modal.Body>
                                       <div>
                                            id= {this.state.isi.id} <br />
                                            title: {this.state.isi.title} <br /> 
                                            status: {this.state.isi.status} <br />
                                            description: {this.state.isi.description} <br />
                                            createdAt: {this.state.isi.createdAt} <br />
                                       </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={()=>{this.onShowHandler()}}>
                                            Close
                                        </Button>
                                        <Button>
                                            Save
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                detail
                            </Button>
                        </td>
                    </tr>
                );
            };
        });
        return rendTask
    };

    onShowHandler(){
        this.setState({show:false});
    };

    detailTask(id) {
        this.setState({ show: !this.state.show});

        const list = [...this.state.list];
        const dataIsi = list.filter(item => item.id === id);
        const Isi = {
                id: dataIsi[0].id,
                title: dataIsi[0].title,
                status: dataIsi[0].status,
                description: dataIsi[0].description,
                createdAt: dataIsi[0].createdAt
         };
        this.setState({
            isi: Isi
        });
    };
    

    showTaskDone = () => {
        let rendTask = this.state.list.map(val => {
            if (val.status === 1) {
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
    };

    deleteItem(id) {
        const list = [...this.state.list];
        const updatedList = list.filter(item => item.id !== id);
        this.setState({ list: updatedList });
    };

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
        };
        let List = [...updatedList, dataPush]
        this.setState({ list: List });
    };

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
        };
        let List = [...updatedList, dataPush]
        this.setState({ list: List });
    };

    componentDidMount(){
        this.setState({list:this.props.LIST})
    };
    
    render() {
        // console.log(GlobalState)
        console.log(this.props.LIST)
        return (
            <div className="row container mt-2 ">
                <div className="col-2" style={{marginLeft:"auto", marginRight:"auto", marginTop:15}}>
                    <Card style={{ width: '90%' }} className="p-2 ml-4">
                        <Card>
                            <h2 className="mx-auto mt-2 mb-2">To do</h2>
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
                    
                    <div className="col-5 " style={{marginLeft: "auto", marginTop: 15}}>
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

                    <div className="col-5" style={{marginRight: "auto", marginTop: 15}}>
                        <Card style={{ width: 'auto' }} className=" p-2">
                            <Table striped bordered hover>
                                <thead className="text-center">
                                    <tr>
                                        <th style={{ width: '31rem' }}><h1 className="mt-1">List Done</h1></th>
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
        );
    };
};

const mapStateToProps = (state) => {
    return {
        LIST: state
    }
}
export default connect(mapStateToProps)(Home);

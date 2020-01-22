import React, { Component } from 'react';
import { Card, Button, Table, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import "./Home.css";

class Home extends Component {
    state = {
            title:"",
            status:0,
            description:"",
            show:false,
            isi:[],
            list: []
    };
    

    updateInput(key, value) {
        this.setState({ [key]: value });
    };

    addItem() {
        var d = new Date();
        var waktu = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
        const newTask = {
            id: 1 + Math.random(),
            title: this.state.title,
            status: this.state.status,
            description: this.state.description,
            createdAt: waktu
        };
        const list = [...this.state.list];
        list.push(newTask);
        this.setState({
            list
        });
    };

    updateItem() {
        var d = new Date();
        var waktu = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
        let newTask = {
            id: this.state.isi.id,
            title: this.state.title,
            status: this.state.status,
            description: this.state.description,
            createdAt: waktu
        }
        if(!this.state.title){
            newTask = {
            id: this.state.isi.id,
            title: this.state.isi.title,
            status: this.state.status,
            description: this.state.description,
            createdAt: waktu
        };
        }
        if (!this.state.description) {
            newTask = {
                id: this.state.isi.id,
                title: this.state.title,
                status: this.state.status,
                description: this.state.isi.description,
                createdAt: waktu
            };
        }
        const list = [...this.state.list];
        const data = list.filter(item => item.id !== this.state.isi.id);
        data.push(newTask);
        this.setState({
            list:data,
            title: "",
            description: "",
            show:false
        });
    };


    titleHandler(e){
            this.setState({ title: e.target.value }) 
        } 
    
    desHandler(e){
        this.setState({description : e.target.value})
    }

    showTask = () => {
        let urut = [...this.state.list]
            urut = urut.sort((a, b) => a.createdAt - b.createdAt)
        let rendTask = urut.map(val => {
            if (val.status === 0) {
                return (
                    <tr key={val.id}>
                        <td>{val.title}</td>
                        <td>
                            <div className="row">
                            <Button variant="success" onClick={() => { this.doneTask(val.id) }} className="mr-1">Done</Button>
                            <Button className="btn btn-floating mr-1" variant="danger" onClick={() => this.deleteItem(val.id)}>
                                <i className="material-icons">Del </i>
                            </Button>
                            <Button className="btn btn-floating" onClick={() => this.detailTask(val.id)}>
                                <Modal 
                                    show={this.state.show} 
                                    onHide={()=> this.setState({show:false})}
                                    onClick={(e) => {
                                    e.stopPropagation();
                        }}
                                                            >
                                    <Modal.Header closeButton> Detail </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                                <p> id =  {this.state.isi.id}</p>
                                                <p> title = <input defaultValue={this.state.isi.title} onChange={(e) => this.titleHandler(e)} /></p>
                                                <p> status = {this.state.isi.status}</p>
                                                <p> description = <input defaultValue={this.state.isi.description} onChange={(e) => this.desHandler(e)} /></p>
                                        </div>     
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button 
                                            onClick={()=>{this.updateItem()}}
                                            >
                                            Update
                                        </Button>
                                        <Button 
                                            variant= "secondary"
                                            onClick={()=> {this.setState({show:false})}}
                                            >
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                detail
                            </Button>
                            </div>
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
        console.log(dataIsi)
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
            createdAt: dataUpdate[0].createdAt
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
            createdAt: dataUpdate[0].createdAt
        };
        let List = [...updatedList, dataPush]
        this.setState({ list: List });
    };

    componentDidMount(){
        this.setState({list:this.props.LIST})
    };
    
    render() {

        console.log(this.state.id)
        return (
            <div className= "containerr " >
                <div className= "todo" >
                    {/* <Card> */}
                        <Card>
                            <h2 className="mt-2 mb-2">To do</h2>                            
                            <input
                                style={{ margin:3}}
                                type="text"
                                placeholder="Type task here"
                                value={this.state.title}
                                onChange={e => this.updateInput("title", e.target.value)}
                            />
                            <input
                                style={{margin:3}}
                                type="text"
                                placeholder="Type description here"
                                value={this.state.description}
                                onChange={e => this.updateInput("description", e.target.value)}

                            />
                            <Button
                                className="add-btn btn-floating addTask"
                                onClick={() => this.addItem()}
                            >
                                <i className="material-icons"> Add Task </i>
                            </Button>
                            
                        </Card>
                    {/* </Card> */}
                </div>
                    
                    <div className="show">
                        {/* <Card> */}
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
                        {/* </Card> */}
                    </div>

                    <div className="show">
                        {/* <Card> */}
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
                        {/* </Card> */}
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

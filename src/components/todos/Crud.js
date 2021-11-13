import React, { Component } from 'react';
import {toast } from 'react-toastify';
import AddTodo from './AddTodo';

class Crud extends Component {
    state={
        todoList:[
            {id: 1, title: 'code React'},
            {id: 2, title: 'code Redux'},
            {id: 3, title: 'code NodeJS'}
        ],

        editTodo:{}
    }

    addNewTodo =(todo)=>{
        this.setState({
            todoList:[...this.state.todoList, todo],
        })
        toast.success("Them moi thanh cong")
    }

    editTodo =(todo)=>{
        let{editTodo, todoList}= this.state;
        let isEmptyObj =Object.keys(editTodo).length===0;

        //Save
        if(isEmptyObj===false && editTodo.id===todo.id){
            let listTodoCopy=[...todoList];
            let objIndex=listTodoCopy.findIndex((item=> item.id===todo.id))
            listTodoCopy[objIndex].title=editTodo.title;
            this.setState({
                todoList: listTodoCopy,
                editTodo: {}
            })
            toast.success("update thanh cong")
            return;
        }

        //edit
        this.setState({
            editTodo: todo
        })
    }

    deleteTodo = (todo) =>{
        let currentTodos = this.state.todoList;
        currentTodos=currentTodos.filter(item=>item.id !== todo.id)
        this.setState({
            todoList: currentTodos
        })
        toast.success("xoa thanh cong")
    }

    handleOnChangeEditTodo=(event)=>{
        let editTodoCopy={...this.state.editTodo};
        editTodoCopy.title=event.target.value

        this.setState({
            editTodo: editTodoCopy
        })
    }

    
    render() {
        let {todoList, editTodo}=this.state;
        let isEmptyObj =Object.keys(editTodo).length===0;
        
     
        return (
            <div className="container">
                <AddTodo addNewTodo={this.addNewTodo} />

                <div className="list__note row">
                    {
                        todoList && todoList.length > 0 &&
                        todoList.map((item, index)=>{
                            return (
                                <div className="col-md-12 row mb-2" key = {index}>
                                    {isEmptyObj===true ? 
                                        <span>{index+1}-{item.title}</span>
                                    :
                                        <>
                                            {
                                                editTodo.id===item.id ?
                                                <span>
                                                    {index+1}- 
                                                    <input value={editTodo.title} onChange={(event) => this.handleOnChangeEditTodo(event)} /> 
                                                </span>
                                                :
                                                <span>{index+1}-{item.title}</span>
                                            }
                                        </>
                                    }

                                    <div className="control ml-3">
                                        <button onClick={()=>this.editTodo(item)} type="button" className="btn btn-primary btn-sm">
                                            {isEmptyObj===false && editTodo.id===item.id ? 'save' : 'edit'}
                                        </button>
                                        <button onClick={() =>this.deleteTodo(item)} className="btn btn-"type="button" className="btn btn-danger btn-sm">Xoa</button>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
export default Crud;

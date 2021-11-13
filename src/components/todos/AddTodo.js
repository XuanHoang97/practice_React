import React, { Component } from 'react';

class AddTodo extends Component {
    state={
        title: ''
    }

    handleOnChangeTitle = (event) => {
        this.setState({
            title: event.target.value,
        })
    }

    handleAddTodo=()=>{
        let todo={
            id: Math.floor(Math.random()*1000),
            title: this.state.title
        }

        this.props.addNewTodo(todo);
        this.setState({
            title:''
        })
    }

    render() {
        let {title} = this.state;
        return (
            <div className="addTodo mb-2">
                <input onChange={(event)=> this.handleOnChangeTitle(event)} type="text" value={title} />
                <button onClick={()=>this.handleAddTodo()}type="button" className="btn btn-success btn-sm">Add</button>
            </div>
        );
    }
}

export default AddTodo;
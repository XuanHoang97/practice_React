import Covid from 'components/covid/Covid';
import React, { useState, useEffect} from 'react';

function CRUDHook(props) {
    const [address, setAddress] = useState('')

    const [todos, setTodo] = useState([
        {id: 'a', name: "learning react"},
        {id: 'b', name: "playing game"},
        {id: 'c', name: "work from home"},
    ]);

    useEffect(() => {

    })

    const handleChangeInput = (e) => {
        setAddress(e.target.value)
    }

    //add todo
    const handleEventClick = () => {
        let newTodo = {id: Math.floor((Math.random() *100) + 1), name: address}
        setTodo([...todos, newTodo]);
        setAddress('')
    }

    //press enter
    const handleKeyDown=(e)=>{
        if(e.key=== 'Enter' || e.keyCode=== 13){     
            handleEventClick();
        }
    }

    // delete todos
    const deleteTodo = (id)=>{
        let currentTodos = todos;  //clones
        currentTodos = currentTodos.filter(item => item.id !== id);
        setTodo(currentTodos);
    }
    
    
    return (
        <div>
            <input type="text" onKeyDown={(e)=>handleKeyDown(e)} onChange = {(e) => handleChangeInput(e)} />
            <button onClick={() => handleEventClick()} type="button" className="btn btn-primary">Add</button>

            <div className="list-todos">
                {
                    todos.map((item, index) => {
                        return (
                            <div className="row  my-2"  key={item.id}>
                                <li className="todo-item">{item.name}</li>
                                {/* <button onClick = {() => EditTodo()} type="button" className="btn btn-danger btn-sm">Edit</button> */}
                                <button onClick = {() => deleteTodo(item.id)} type="button" className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        )
                    })
                }
            </div>

            <Covid />
        </div>
    );
}

export default CRUDHook;
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { useSelector } from "react-redux";
import { LabState, TodoType } from "../../../store";


function TodoItem()
{
    const { todo } = useSelector((state: LabState) => state.todosReducer);
    const dispatch = useDispatch();

    return (
        <li key={todo.id} className="list-group-item">
            <button onClick={() => dispatch(deleteTodo(todo.id))}> Delete </button>
            <button onClick={() => dispatch(setTodo(todo))}> Edit </button>
            {todo.title}
        </li>
    );
}
export default TodoItem;
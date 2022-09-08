import React from "react";
import AddTodo from "./AddTodo";
import "./ListTodo.scss";
import { toast } from "react-toastify";

class ListTodo extends React.Component {
  state = {
    listTodos: [
      {
        id: "todo1",
        title: "Doing homework",
      },
      {
        id: "todo2",
        title: "Making videos",
      },
      {
        id: "todo3",
        title: "Fixing bugs",
      },
    ],
    editTodo: {},
  };

  addNewTodo = (todo) => {
    this.setState({
      listTodos: [...this.state.listTodos, todo],
    });
    toast.success("Added!");
  };

  handleDeleteTodo = (todo) => {
    let currentTodo = this.state.listTodos;
    currentTodo = currentTodo.filter((item) => item.id !== todo.id);
    this.setState({ listTodos: currentTodo });
    toast.success("Deleted!");
  };

  handleEditTodo = (todo) => {
    let { editTodo, listTodos } = this.state;
    let isEmtyObj = Object.keys(editTodo).length === 0;

    if (isEmtyObj === false && editTodo.id === todo.id) {
      let listTodosCopy = [...listTodos];
      let objIndex = listTodosCopy.findIndex((item) => item.id === todo.id);

      listTodosCopy[objIndex].title = editTodo.title;
      this.setState({ listTodos: listTodosCopy, editTodo: {} });
      return;
    }
    this.setState({ editTodo: todo });
  };

  handleOnChangeEditTodo = (event) => {
    let editTodoCopy = { ...this.state.editTodo };
    editTodoCopy.title = event.target.value;
    this.setState({
      editTodo: editTodoCopy,
      // editTodo: {},
    });
    // toast.success("Wow so easy!");
    return;
  };
  render() {
    let { listTodos, editTodo } = this.state;
    let isEmtyObj = Object.keys(editTodo).length === 0;
    return (
      <div className="list-todo-container">
        <AddTodo addNewTodo={this.addNewTodo}></AddTodo>
        <div className="list-todo-content">
          {listTodos &&
            listTodos.length > 0 &&
            listTodos.map((item, index) => {
              return (
                <div className="todo-child" key={item.id}>
                  {isEmtyObj === true ? (
                    <span>
                      {index + 1} - {item.title}
                    </span>
                  ) : (
                    <>
                      {editTodo.id === item.id ? (
                        <span>
                          {index + 1} -{" "}
                          <input
                            value={editTodo.title}
                            onChange={(event) =>
                              this.handleOnChangeEditTodo(event)
                            }
                          />
                        </span>
                      ) : (
                        <span>
                          {index + 1} - {item.title}
                        </span>
                      )}
                    </>
                  )}

                  <button
                    className="edit"
                    onClick={() => this.handleEditTodo(item)}
                  >
                    {isEmtyObj === false && editTodo.id === item.id
                      ? "Save"
                      : "Edit"}
                  </button>
                  <button
                    className="delete"
                    onClick={() => this.handleDeleteTodo(item)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default ListTodo;

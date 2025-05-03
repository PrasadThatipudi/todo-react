import { Component } from "react";

class TaskItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const textDecoration = this.props.done ? "line-through" : "none";

    return (
      <>
        <div>
          <p style={{ textDecoration }}>{this.props.description}</p>
        </div>
      </>
    );
  }
}

class Tasks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tasks = this.props.tasks.map((task, index) => {
      return (
        <TaskItem
          key={`${this.props.todoId}-${index}`}
          description={task.description}
          done={task.done}
        ></TaskItem>
      );
    });

    return <>{tasks}</>;
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>{this.props.title}</h1>
        <Tasks tasks={this.props.tasks} todoId={this.props.todoId}></Tasks>
      </>
    );
  }
}

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          title: "Shopping",
          todoId: 0,
          tasks: [{ description: "Item1", done: true }],
        },
      ],
      nextTodoId: 1,
    };
  }

  render() {
    const todos = this.state.todos.map((todo) => {
      return (
        <Todo
          key={todo.todoId}
          tasks={todo.tasks}
          todoId={todo.todoId}
          title={todo.title}
        ></Todo>
      );
    });

    return <>{todos}</>;
  }
}

export default Todos;

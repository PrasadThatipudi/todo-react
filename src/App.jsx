import { Component } from "react";

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onToggle(this.props.todoId, this.props.taskId, !this.props.done);
  }

  render() {
    const textDecoration = this.props.done ? "line-through" : "none";

    return (
      <>
        <p style={{ textDecoration }} onClick={this.onClick}>
          {this.props.description}
        </p>
      </>
    );
  }
}

class Tasks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.tasks);
    const tasks = this.props.tasks.map((task) => {
      return (
        <TaskItem
          key={`${this.props.todoId}-${task.taskId}`}
          taskId={this.props.taskId}
          description={task.description}
          done={task.done}
          todoId={this.props.todoId}
          onToggle={this.props.onToggle}
        ></TaskItem>
      );
    });

    return <>{tasks}</>;
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(description) {
    this.props.addTask(description, this.props.todoId);
  }

  render() {
    return (
      <>
        <h1>{this.props.title}</h1>
        <Input handleSubmit={this.handleSubmit}></Input>
        <div>
          <Tasks
            tasks={this.props.tasks}
            todoId={this.props.todoId}
            onToggle={this.props.onToggle}
          ></Tasks>
        </div>
      </>
    );
  }
}
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onKeyDown(event) {
    if (event.key === "Enter" && this.state.value) {
      this.props.handleSubmit(this.state.value);
      this.setState({ value: "" });
    }
  }

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.value}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
        />
      </>
    );
  }
}

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      nextTodoId: 0,
      nextTaskId: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  handleSubmit(title) {
    this.setState((prev) => {
      return {
        ...prev,
        todos: [
          ...prev.todos,
          { title, todoId: this.state.nextTodoId, tasks: [] },
        ],
        nextTodoId: prev.nextTodoId + 1,
      };
    });
  }

  addTask(description, todoId) {
    const task = { description, done: false, taskId: this.state.nextTaskId };

    this.setState((prev) => {
      const todos = prev.todos.map((todo) => {
        return todo.todoId === todoId
          ? { ...todo, tasks: [...todo.tasks, task] }
          : todo;
      });

      return { ...prev, todos, nextTaskId: prev.nextTaskId + 1 };
    });
  }

  onToggle(todoId, taskId, done) {
    this.setState((prev) => {
      const todos = prev.todos.map((todo) => {
        return todo.todoId === todoId
          ? {
              ...todo,
              tasks: todo.tasks.map((task) => {
                return task.taskId === taskId ? { ...task, done } : task;
              }),
            }
          : todo;
      });

      return { ...prev, todos, nextTaskId: prev.nextTaskId + 1 };
    });
  }

  render() {
    const todos = this.state.todos.map((todo) => {
      return (
        <Todo
          key={todo.todoId}
          tasks={todo.tasks}
          todoId={todo.todoId}
          title={todo.title}
          addTask={this.addTask}
          onToggle={this.onToggle}
        ></Todo>
      );
    });

    return (
      <>
        <Input handleSubmit={this.handleSubmit}></Input>
        <div>{todos}</div>
      </>
    );
  }
}

export default Todos;

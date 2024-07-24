import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { updateTodo } from '../api/todos';

type Props = {
  todos: Todo[];
  handleNewTodo: (event: React.ChangeEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  loadingTodoId: number[];
};

export const Header: React.FC<Props> = ({
  todos,
  handleNewTodo,
  inputRef,
  title,
  setTitle,
  setTodos,
  loadingTodoId,
}) => {
  const loading = loadingTodoId.length > 0;
  const todoComleted = todos.every(todo => todo.completed);
  const allToggle = !loading && todos.length > 0;

  const toggleTodos = () => {
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !todoComleted,
      })),
    );
    todos
      .filter(todo => todo.completed !== todoComleted)
      .forEach(todo => {
        updateTodo({
          ...todo,
          completed: todoComleted,
        }).catch(() => {
          setTodos(current =>
            current.map(a => {
              if (a.id === todo.id) {
                return { ...a, completed: !todoComleted };
              }

              return a;
            }),
          );
        });
      });
  };

  return (
    <header className="todoapp__header">
      {allToggle && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todoComleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleTodos}
        />
      )}
      <form onSubmit={handleNewTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value.trimStart())}
          ref={inputRef}
        />
      </form>
    </header>
  );
};

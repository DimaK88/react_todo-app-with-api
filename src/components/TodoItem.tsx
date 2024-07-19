import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

export type Props = {
  todo: Todo;
  onloadingTodoIds?: number[];
  handleToggleTodo: (id: number) => void;
  handleTodoDelete?: (id: number) => void;
  isEditing: boolean;
  editedTitle: string;
  handleEditTodo: (todo: Todo) => void;
  handleEditInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditSave: (todo: Todo) => void;
  handleEditCancel: () => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onloadingTodoIds = [],
  handleToggleTodo = () => {},
  handleTodoDelete = () => {},
  isEditing,
  editedTitle,
  handleEditTodo,
  handleEditInput,
  handleEditSave,
  handleEditCancel,
}) => {
  const { title, completed, id } = todo;
  const isActiveTodoIds = onloadingTodoIds.includes(id) || id === 0;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditSave(todo);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
        editing: isEditing,
      })}
      onDoubleClick={() => handleEditTodo(todo)}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => handleToggleTodo(id)}
        />
      </label>
      {isEditing ? (
        <form onSubmit={handleSubmit} onBlur={handleEditCancel}>
          <input
            type="text"
            className="edit"
            value={editedTitle}
            onChange={handleEditInput}
            onBlur={() => handleEditSave(todo)}
            ref={inputRef}
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleEditSave(todo);
              } else if (e.key === 'Escape') {
                handleEditCancel();
              }
            }}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleTodoDelete(id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isActiveTodoIds,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

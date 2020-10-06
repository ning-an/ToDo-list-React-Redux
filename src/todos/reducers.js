import {
  CREATE_TODO,
  REMOVE_TODO,
  MARK_COMPLETE,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  data: [],
};
export const todos = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TODO: {
      const { text } = payload;
      return { ...state, data: state.data.concat(text) };
    }
    case REMOVE_TODO: {
      const { text } = payload;
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== text.id),
      };
    }
    case MARK_COMPLETE: {
      const { text } = payload;
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === text.id) return { ...todo, isCompleted: true };
          return todo;
        }),
      };
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return { ...state, isLoading: false, data: todos };
    }
    case LOAD_TODOS_IN_PROGRESS:
      return { ...state, isLoading: true };
    case LOAD_TODOS_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

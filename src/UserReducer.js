import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer(props) {
  const { name } = props;
  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log(state);

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onWrite = (event) =>
    dispatch({ type: actionTypes.write, payload: event.target.value });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

  React.useEffect(() => {
    console.log('Empezando el efecto');

    if (state.loading) {
      setTimeout(() => {
        console.log('Haciendo la validación');

        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
        console.log('Terminando la validación');
      }, 3000);
    }

    console.log('Terminando el efecto');
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {state.error && !state.loading && <p>Error: el código es incorrecto</p>}

        {state.loading && <p>Cargando...</p>}

        <input
          placeholder="Código de Seguridad"
          value={state.value}
          onChange={onWrite}
        />
        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Pedimos confirmación, Estas seguro?</p>
        <button onClick={onDelete}>Si, Eliminar</button>
        <button onClick={onReset}>No, volver atrás</button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con éxito</p>
        <button onClick={onReset}>Resetear, volver al estado inicial</button>
      </>
    );
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET',
};

const reducerObject = (state, payload) => {
  return {
    [actionTypes.confirm]: {
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    },
    [actionTypes.error]: { ...state, error: true, loading: false },
    [actionTypes.write]: { ...state, value: payload },
    [actionTypes.check]: { ...state, loading: true },
    [actionTypes.delete]: { ...state, deleted: true, confirmed: false },
    [actionTypes.reset]: {
      ...state,
      deleted: false,
      confirmed: false,
      value: '',
    },
  };
};

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };

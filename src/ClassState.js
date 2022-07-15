import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      value: '',
    };
  }

  // componentWillMount() {
  //   UNSAFE_componentWillMount() {
  //     console.log('componentWillMount');
  //   }
  //   componentDidMount() {
  //     console.log('componentDidMount');
  //   }
  //   componentWillUnmount() {
  //     console.log('componentWillUnmount');
  //   }

  componentDidUpdate() {
    console.log('Actualizacion');
    if (this.state.loading) {
      setTimeout(() => {
        console.log('Haciendo la validación');

        if (this.state.value === SECURITY_CODE) {
          this.setState({ error: false, loading: false });
        } else {
          this.setState({ error: true, loading: false });
        }
        console.log('Terminando la validación');
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {this.state.error && !this.state.loading && <p>Error: el código es incorrecto</p>}
        {this.state.loading && <Loading />}

        <input
          placeholder="Código de Seguridad"
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };

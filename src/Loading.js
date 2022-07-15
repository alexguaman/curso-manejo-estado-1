import React from 'react';

class Loading extends React.Component {
  // componentWillMount() {
  //   UNSAFE_componentWillMount() {
  //     console.log('componentWillMount');
  //   }
  //   componentDidMount() {
  //     console.log('componentDidMount');
  //   }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    return <p>Cargando...</p>;
  }
}

export { Loading };

import { Component } from 'react'

// Atrapa errores inesperados al renderizar y muestra "fallback" en vez de dejar la pantalla en blanco.
// Tiene que ser una clase: los hooks todavía no pueden atrapar errores de render.
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { log } from "../services/logger";

interface Props {
  nombre?: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    log.error(`Fallo en el módulo ${this.props.nombre ?? ""}`.trim(), {
      error: error.message,
      componentStack: info.componentStack,
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      const que = this.props.nombre ? `el módulo de ${this.props.nombre}` : "este módulo";
      return (
        <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-red-400">No se pudo cargar {que}.</p>
          <p className="text-sm text-white/50">
            Revisa que el microfrontend esté disponible e inténtalo de nuevo.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="rounded-md px-3 py-2 text-sm text-portal-green ring-1 ring-portal-green/40 transition hover:bg-portal-green/10"
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

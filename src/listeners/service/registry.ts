import { DefaultServiceListener, IServiceListener } from "./base";

class ServiceListenerRegistry {
  #registry = { default: new DefaultServiceListener() };

  register(service: string, listener: IServiceListener): void {
    if (!this.#registry.hasOwnProperty(service)) {
      this.#registry[service] = [listener];

      return;
    }

    if (!this.#registry[service].includes(listener)) {
      this.#registry[service].push(listener);
    }
  }

  getListeners(service: string): IServiceListener[] {
    let listeners = this.#registry[service];

    return listeners == null ? [this.#registry.default] : listeners;
  }
}

const registry = new ServiceListenerRegistry();

export { registry, ServiceListenerRegistry };

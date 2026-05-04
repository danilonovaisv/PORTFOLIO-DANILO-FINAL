import { getConsoleFunction, setConsoleFunction } from 'three';

const CLOCK_DEPRECATION_WARNING =
  'THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.';

let installed = false;

export function installThreeConsoleFilter() {
  if (installed || typeof window === 'undefined') return;

  const previousConsoleFunction = getConsoleFunction();

  setConsoleFunction((type, message, ...params) => {
    if (type === 'warn' && message === CLOCK_DEPRECATION_WARNING) {
      return;
    }

    if (previousConsoleFunction) {
      previousConsoleFunction(type, message, ...params);
      return;
    }

    if (type === 'error') {
      console.error(message, ...params);
      return;
    }

    if (type === 'warn') {
      console.warn(message, ...params);
      return;
    }

    Reflect.apply(globalThis.console.log, globalThis.console, [
      message,
      ...params,
    ]);
  });

  installed = true;
}

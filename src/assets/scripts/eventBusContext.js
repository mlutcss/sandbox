import { createNanoEvents } from 'nanoevents';
import { createContext } from '@lit/context';

export const eventBusContext = createContext('eventBus');
export const eventBus = createNanoEvents();

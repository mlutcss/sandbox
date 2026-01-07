import Emitter from 'component-emitter';
import { createContext } from '@lit/context';

export const eventBus = new Emitter();
export const eventBusContext = createContext('eventBus');

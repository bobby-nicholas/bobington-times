/* eslint-disable @typescript-eslint/no-explicit-any */
import events from "events";

const em = new events.EventEmitter();
const PUBLISHING_EVENT_NAME = 'pubmessage';
const PUBLISHING_COMPLETE_NAME = 'pubcomplete';


export const sendPubMessage = (message: string) => em.emit(PUBLISHING_EVENT_NAME, `data:${message}\n\n`);
export const receivePubMessage = (listener: (...args: any[]) => void) => em.addListener(PUBLISHING_EVENT_NAME, listener);
export const sendPubComplete = () => em.emit(PUBLISHING_COMPLETE_NAME);
export const receivePubComplete = (on: (() => void)) => em.addListener(PUBLISHING_COMPLETE_NAME, on);
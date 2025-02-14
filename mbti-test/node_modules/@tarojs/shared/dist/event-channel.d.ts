import { Events } from "./event-emitter.js";
interface RouteEvt extends Events {
    addEvents: (events: any) => void;
    emit?: (events: any, data: any) => void;
}
interface PageEvt extends Events {
    exeList: any[];
    emit?: (events: any, data: any) => void;
}
declare const EventChannel: {
    pageChannel: PageEvt;
    routeChannel: RouteEvt;
};
export { EventChannel };

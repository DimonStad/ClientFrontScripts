import { DateTimeFormat } from "@docsvision/webclient/Legacy/DateTimeFormat";
import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { ITicketData } from "../Models/ITicketData";


export class TicketController {
    public GetTicketData(homeCity: string, bisTripCity: string, depart_date: Date,return_date: Date): JQueryDeferred<ITicketData> {
        let url = urlStore.urlResolver.resolveUrl("GetTicketData", "Ticket");
        let data = {
            homeCity: homeCity,
            bisTripCity: bisTripCity,
            depart_date: depart_date,
            return_date: return_date
        }
        return requestManager.post(url, JSON.stringify(data));
    }
}

export type $TicketController = { TicketController: TicketController }
export const $TicketController = new TicketController()
import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
var TicketController = /** @class */ (function () {
    function TicketController() {
    }
    TicketController.prototype.GetTicketData = function (homeCity, bisTripCity, depart_date, return_date) {
        var url = urlStore.urlResolver.resolveUrl("GetTicketData", "Ticket");
        var data = {
            homeCity: homeCity,
            bisTripCity: bisTripCity,
            depart_date: depart_date,
            return_date: return_date
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    return TicketController;
}());
export { TicketController };
export var $TicketController = new TicketController();
//# sourceMappingURL=TicketController.js.map
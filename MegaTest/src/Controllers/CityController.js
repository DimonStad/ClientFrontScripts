import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
var CityController = /** @class */ (function () {
    function CityController() {
    }
    CityController.prototype.GetCityData = function (cityId) {
        var url = urlStore.urlResolver.resolveUrl("GetCityData", "City");
        var data = {
            cityId: cityId
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    return CityController;
}());
export { CityController };
export var $CityController = new CityController();
//# sourceMappingURL=CityController.js.map
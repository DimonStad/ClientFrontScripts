import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
var SecretaryController = /** @class */ (function () {
    function SecretaryController() {
    }
    SecretaryController.prototype.GetSecretary = function (nameGroup) {
        var url = urlStore.urlResolver.resolveUrl("GetSecretary", "Secretary");
        var data = {
            nameGroup: nameGroup
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    return SecretaryController;
}());
export { SecretaryController };
export var $SecretaryController = new SecretaryController();
//# sourceMappingURL=SecretaryController.js.map
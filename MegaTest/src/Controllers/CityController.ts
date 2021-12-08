import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { ICityData } from "../Models/ICityData";


export class CityController {
    public GetCityData(cityId: string): JQueryDeferred<ICityData> {
        let url = urlStore.urlResolver.resolveUrl("GetCityData", "City");
        let data = {
            cityId: cityId
        }
        return requestManager.post(url, JSON.stringify(data));
    }
}

export type $CityController = { CityController: CityController }
export const $CityController = new CityController()
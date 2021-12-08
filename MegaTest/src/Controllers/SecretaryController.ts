import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { ISecretaryData } from "../Models/ISecretary";

export class SecretaryController {
    public GetSecretary(nameGroup: string): JQueryDeferred<ISecretaryData> {
        let url = urlStore.urlResolver.resolveUrl("GetSecretary", "Secretary");
        let data = {
            nameGroup: nameGroup
        }
        return requestManager.post(url, JSON.stringify(data));
    }
}

export type $SecretaryController = { SecretaryController: SecretaryController }
export const $SecretaryController = new SecretaryController()
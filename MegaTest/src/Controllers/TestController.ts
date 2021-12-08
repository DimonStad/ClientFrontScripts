import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { ICustomEmployeeData } from "../Models/ICustomEmployeeData";

export class TestController {
    /**
     * ����� ��������� ���������� � ����������
     * @param employeeId id ����������
     */
    public GetEmployeeData(employeeId: string): JQueryDeferred<ICustomEmployeeData> {
        let url = urlStore.urlResolver.resolveUrl("GetEmployeeData", "Test");
        let data = {
            employeeId: employeeId
        }
        return requestManager.post(url, JSON.stringify(data));
    }
}

export type $TestController = { TestController: TestController }
export const $TestController = new TestController()
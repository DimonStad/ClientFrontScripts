import { Numerator } from "@docsvision/webclient/BackOffice/Numerator";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { ISaveControlData } from "@docsvision/webclient/Legacy/LegacyModels";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { TextArea } from "@docsvision/webclient/Platform/TextArea";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { NumberControl } from "@docsvision/webclient/Platform/Number";
import { ICancelableEventArgs } from "@docsvision/webclient/System/ICancelableEventArgs";
import { Layout } from "@docsvision/webclient/System/Layout";
import { Employee } from "@docsvision/webclient/BackOffice/Employee";
import { $TestController } from "../Controllers/TestController";
import { MultipleEmployees } from "@docsvision/webclient/BackOffice/MultipleEmployees";
import { $SecretaryController } from "../Controllers/SecretaryController";
import { DirectoryDesignerRow } from "@docsvision/webclient/BackOffice/DirectoryDesignerRow";
import { $CityController } from "../Controllers/CityController";
import { $TicketController } from "../Controllers/TicketController";


export async function getCardInfo(sender: CustomButton) {
    let layout = sender.layout;
    let numberControl = layout.controls.tryGet<Numerator>("Number");
    let creationDateControl = layout.controls.tryGet<DateTimePicker>("CreationDate");
    let dateIntoControl = layout.controls.tryGet<DateTimePicker>("DateInto");
    let dateOnControl = layout.controls.tryGet<DateTimePicker>("DateOn");
    let reasonControl = layout.controls.tryGet<TextArea>("Reason");
    if (!numberControl || !creationDateControl || !dateIntoControl || !dateOnControl || !reasonControl) { return; }
    let message = "Номер заявки: {0}\n Дата создания заявки: {1}\n Дата командировки с: {2}\n По:{3}\n Основание поездки: {4}\n".format(
        (numberControl.hasValue() ? numberControl.params.value.number : "не сформирован"),
        creationDateControl.params.value.toLocaleString(),
        dateIntoControl.params.value.toLocaleDateString(),
        dateOnControl.params.value.toLocaleDateString(),
        reasonControl.params.value.toString());
    MessageBox.ShowInfo(message);
}

export async function changeData(sender: DateTimePicker) {
    let layout = sender.layout;
    let dateIntoControl = layout.controls.tryGet<DateTimePicker>("DateInto");
    let dateOnControl = layout.controls.tryGet<DateTimePicker>("DateOn");
    let countDayControl = layout.controls.tryGet<NumberControl>("CountDay");

    if (!countDayControl || !dateOnControl || !countDayControl) { return; }

    let tmp = Math.ceil((dateOnControl.params.value.getTime() - dateIntoControl.params.value.getTime()) / 1000 / 60 / 60 / 24);
    countDayControl.params.value = tmp;

}

export async function saveName(sender: Layout, e: ICancelableEventArgs<ISaveControlData>) {
    let layout = sender.layout;
    let nameControl = layout.controls.tryGet<TextBox>("Name");

    if (!nameControl) { return; }

    if (nameControl.params.value == null) {
        let message = "Заполните название!";
        MessageBox.ShowError(message);
        e.cancel();
    }

}

export async function changeCommanded(sender: Employee) {
    let layout = sender.layout;
    let bossControl = layout.controls.tryGet<Employee>("Boss");
    let phoneControl = layout.controls.tryGet<TextBox>("Phone");

    if (!phoneControl || !phoneControl) { return; }

    if (sender.hasValue()) {
        let employeeModel = await $TestController.GetEmployeeData(sender.params.value.id)
        phoneControl.params.value = employeeModel.phone;
        bossControl.params.value = employeeModel.manager;
    } else {
        bossControl.params.value = null;
        phoneControl.params.value = null;
    }
}

export async function newCard(sender: Layout) {
    let layout = sender.layout;
    let whoControl = layout.controls.tryGet<MultipleEmployees>("WhoDraws");
    if (!whoControl) { return; }
    if (layout.layoutInfo.action.toString() == "2") {
        let employeeModel = await $SecretaryController.GetSecretary("Секретарь");
        whoControl.params.value = employeeModel.secretary;
    }
     
}

export async function getDaily(sender: DirectoryDesignerRow){
    let layout = sender.layout;
    let countDayControl = layout.controls.tryGet<NumberControl>("CountDay");
    let sumDayControl = layout.controls.tryGet<NumberControl>("SumDay");

    if (!countDayControl || !sumDayControl) { return; }

    if (sender == null) { return; }


    let cityModel = await $CityController.GetCityData(sender.params.value.id);

    sumDayControl.params.value = cityModel.daily * countDayControl.params.value;
}


export async function changeState(sender: CustomButton) {
    let layout = sender.layout;
    if (layout.editOperations.available('CFDEED34-8DC0-497D-A22E-3D8E11483ADD')) {
        await layout.changeState('CFDEED34-8DC0-497D-A22E-3D8E11483ADD');
        MessageBox.ShowInfo('Состояние изменилось');
        sender.params.visibility = false;
    } else {
        MessageBox.ShowError('Операция недоступна');
    }
    
}

export async function getTicketPriceButtom(sender: CustomButton) {
    let layout = sender.layout;
    let dateIntoControl = layout.controls.tryGet<DateTimePicker>("DateInto");
    let dateOnControl = layout.controls.tryGet<DateTimePicker>("DateOn");
    let cityComanndedControl = layout.controls.tryGet<DirectoryDesignerRow>("CityComannded");
    let priceTicketControl = layout.controls.tryGet<NumberControl>("PriceTicketAir");
    if (!dateIntoControl || !dateOnControl || !cityComanndedControl || !cityComanndedControl || !priceTicketControl) { return;}
    if (cityComanndedControl.hasValue()) {
        let cityModel = await $CityController.GetCityData(cityComanndedControl.params.value.id);

        let tmp = await $TicketController.GetTicketData("LED", cityModel.codeAir, dateIntoControl.params.value, dateOnControl.params.value);

        priceTicketControl.params.value = tmp.ticketPrice;
    }
}
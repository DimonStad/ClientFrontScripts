var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { $TestController } from "../Controllers/TestController";
import { $SecretaryController } from "../Controllers/SecretaryController";
import { $CityController } from "../Controllers/CityController";
import { $TicketController } from "../Controllers/TicketController";
export function getCardInfo(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, numberControl, creationDateControl, dateIntoControl, dateOnControl, reasonControl, message;
        return __generator(this, function (_a) {
            layout = sender.layout;
            numberControl = layout.controls.tryGet("Number");
            creationDateControl = layout.controls.tryGet("CreationDate");
            dateIntoControl = layout.controls.tryGet("DateInto");
            dateOnControl = layout.controls.tryGet("DateOn");
            reasonControl = layout.controls.tryGet("Reason");
            if (!numberControl || !creationDateControl || !dateIntoControl || !dateOnControl || !reasonControl) {
                return [2 /*return*/];
            }
            message = "?????????? ????????????: {0}\n ???????? ???????????????? ????????????: {1}\n ???????? ???????????????????????? ??: {2}\n ????:{3}\n ?????????????????? ??????????????: {4}\n".format((numberControl.hasValue() ? numberControl.params.value.number : "???? ??????????????????????"), creationDateControl.params.value.toLocaleString(), dateIntoControl.params.value.toLocaleDateString(), dateOnControl.params.value.toLocaleDateString(), reasonControl.params.value.toString());
            MessageBox.ShowInfo(message);
            return [2 /*return*/];
        });
    });
}
export function changeData(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, dateIntoControl, dateOnControl, countDayControl, tmp;
        return __generator(this, function (_a) {
            layout = sender.layout;
            dateIntoControl = layout.controls.tryGet("DateInto");
            dateOnControl = layout.controls.tryGet("DateOn");
            countDayControl = layout.controls.tryGet("CountDay");
            if (!countDayControl || !dateOnControl || !countDayControl) {
                return [2 /*return*/];
            }
            tmp = Math.ceil((dateOnControl.params.value.getTime() - dateIntoControl.params.value.getTime()) / 1000 / 60 / 60 / 24);
            countDayControl.params.value = tmp;
            return [2 /*return*/];
        });
    });
}
export function saveName(sender, e) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, nameControl, message;
        return __generator(this, function (_a) {
            layout = sender.layout;
            nameControl = layout.controls.tryGet("Name");
            if (!nameControl) {
                return [2 /*return*/];
            }
            if (nameControl.params.value == null) {
                message = "?????????????????? ????????????????!";
                MessageBox.ShowError(message);
                e.cancel();
            }
            return [2 /*return*/];
        });
    });
}
export function changeCommanded(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, bossControl, phoneControl, employeeModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layout = sender.layout;
                    bossControl = layout.controls.tryGet("Boss");
                    phoneControl = layout.controls.tryGet("Phone");
                    if (!phoneControl || !phoneControl) {
                        return [2 /*return*/];
                    }
                    if (!sender.hasValue()) return [3 /*break*/, 2];
                    return [4 /*yield*/, $TestController.GetEmployeeData(sender.params.value.id)];
                case 1:
                    employeeModel = _a.sent();
                    phoneControl.params.value = employeeModel.phone;
                    bossControl.params.value = employeeModel.manager;
                    return [3 /*break*/, 3];
                case 2:
                    bossControl.params.value = null;
                    phoneControl.params.value = null;
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function newCard(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, whoControl, employeeModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layout = sender.layout;
                    whoControl = layout.controls.tryGet("WhoDraws");
                    if (!whoControl) {
                        return [2 /*return*/];
                    }
                    if (!(layout.layoutInfo.action.toString() == "2")) return [3 /*break*/, 2];
                    return [4 /*yield*/, $SecretaryController.GetSecretary("??????????????????")];
                case 1:
                    employeeModel = _a.sent();
                    whoControl.params.value = employeeModel.secretary;
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
export function getDaily(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, countDayControl, sumDayControl, cityModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layout = sender.layout;
                    countDayControl = layout.controls.tryGet("CountDay");
                    sumDayControl = layout.controls.tryGet("SumDay");
                    if (!countDayControl || !sumDayControl) {
                        return [2 /*return*/];
                    }
                    if (sender == null) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, $CityController.GetCityData(sender.params.value.id)];
                case 1:
                    cityModel = _a.sent();
                    sumDayControl.params.value = cityModel.daily * countDayControl.params.value;
                    return [2 /*return*/];
            }
        });
    });
}
export function changeState(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layout = sender.layout;
                    if (!layout.editOperations.available('CFDEED34-8DC0-497D-A22E-3D8E11483ADD')) return [3 /*break*/, 2];
                    return [4 /*yield*/, layout.changeState('CFDEED34-8DC0-497D-A22E-3D8E11483ADD')];
                case 1:
                    _a.sent();
                    MessageBox.ShowInfo('?????????????????? ????????????????????');
                    sender.params.visibility = false;
                    return [3 /*break*/, 3];
                case 2:
                    MessageBox.ShowError('???????????????? ????????????????????');
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function getTicketPriceButtom(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, dateIntoControl, dateOnControl, cityComanndedControl, priceTicketControl, cityModel, tmp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layout = sender.layout;
                    dateIntoControl = layout.controls.tryGet("DateInto");
                    dateOnControl = layout.controls.tryGet("DateOn");
                    cityComanndedControl = layout.controls.tryGet("CityComannded");
                    priceTicketControl = layout.controls.tryGet("PriceTicketAir");
                    if (!dateIntoControl || !dateOnControl || !cityComanndedControl || !cityComanndedControl || !priceTicketControl) {
                        return [2 /*return*/];
                    }
                    if (!cityComanndedControl.hasValue()) return [3 /*break*/, 3];
                    return [4 /*yield*/, $CityController.GetCityData(cityComanndedControl.params.value.id)];
                case 1:
                    cityModel = _a.sent();
                    return [4 /*yield*/, $TicketController.GetTicketData("LED", cityModel.codeAir, dateIntoControl.params.value, dateOnControl.params.value)];
                case 2:
                    tmp = _a.sent();
                    priceTicketControl.params.value = tmp.ticketPrice;
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=CardHandlers.js.map
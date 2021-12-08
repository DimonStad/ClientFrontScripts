define(['tslib', '@docsvision/webclient/Helpers/MessageBox/MessageBox', '@docsvision/webclient/System/RequestManager', '@docsvision/webclient/System/UrlStore', '@docsvision/webclient/System/ExtensionManager'], function (tslib, MessageBox, RequestManager, UrlStore, ExtensionManager) { 'use strict';

  //Some handlers
  function sampleEventHandler(sender, e) {
      return tslib.__awaiter(this, void 0, JQueryDeferred, function () {
          return tslib.__generator(this, function (_a) {
              return [2 /*return*/];
          });
      });
  }

  var SomeEventHandlers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    sampleEventHandler: sampleEventHandler
  });

  var TestController = /** @class */ (function () {
      function TestController() {
      }
      /**
       * ����� ��������� ���������� � ����������
       * @param employeeId id ����������
       */
      TestController.prototype.GetEmployeeData = function (employeeId) {
          var url = UrlStore.urlStore.urlResolver.resolveUrl("GetEmployeeData", "Test");
          var data = {
              employeeId: employeeId
          };
          return RequestManager.requestManager.post(url, JSON.stringify(data));
      };
      return TestController;
  }());
  var $TestController = new TestController();

  var SecretaryController = /** @class */ (function () {
      function SecretaryController() {
      }
      SecretaryController.prototype.GetSecretary = function (nameGroup) {
          var url = UrlStore.urlStore.urlResolver.resolveUrl("GetSecretary", "Secretary");
          var data = {
              nameGroup: nameGroup
          };
          return RequestManager.requestManager.post(url, JSON.stringify(data));
      };
      return SecretaryController;
  }());
  var $SecretaryController = new SecretaryController();

  var CityController = /** @class */ (function () {
      function CityController() {
      }
      CityController.prototype.GetCityData = function (cityId) {
          var url = UrlStore.urlStore.urlResolver.resolveUrl("GetCityData", "City");
          var data = {
              cityId: cityId
          };
          return RequestManager.requestManager.post(url, JSON.stringify(data));
      };
      return CityController;
  }());
  var $CityController = new CityController();

  var TicketController = /** @class */ (function () {
      function TicketController() {
      }
      TicketController.prototype.GetTicketData = function (homeCity, bisTripCity, depart_date, return_date) {
          var url = UrlStore.urlStore.urlResolver.resolveUrl("GetTicketData", "Ticket");
          var data = {
              homeCity: homeCity,
              bisTripCity: bisTripCity,
              depart_date: depart_date,
              return_date: return_date
          };
          return RequestManager.requestManager.post(url, JSON.stringify(data));
      };
      return TicketController;
  }());
  var $TicketController = new TicketController();

  function getCardInfo(sender) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var layout, numberControl, creationDateControl, dateIntoControl, dateOnControl, reasonControl, message;
          return tslib.__generator(this, function (_a) {
              layout = sender.layout;
              numberControl = layout.controls.tryGet("Number");
              creationDateControl = layout.controls.tryGet("CreationDate");
              dateIntoControl = layout.controls.tryGet("DateInto");
              dateOnControl = layout.controls.tryGet("DateOn");
              reasonControl = layout.controls.tryGet("Reason");
              if (!numberControl || !creationDateControl || !dateIntoControl || !dateOnControl || !reasonControl) {
                  return [2 /*return*/];
              }
              message = "Номер заявки: {0}\n Дата создания заявки: {1}\n Дата командировки с: {2}\n По:{3}\n Основание поездки: {4}\n".format((numberControl.hasValue() ? numberControl.params.value.number : "не сформирован"), creationDateControl.params.value.toLocaleString(), dateIntoControl.params.value.toLocaleDateString(), dateOnControl.params.value.toLocaleDateString(), reasonControl.params.value.toString());
              MessageBox.MessageBox.ShowInfo(message);
              return [2 /*return*/];
          });
      });
  }
  function changeData(sender) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var layout, dateIntoControl, dateOnControl, countDayControl, tmp;
          return tslib.__generator(this, function (_a) {
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
  function saveName(sender, e) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var layout, nameControl, message;
          return tslib.__generator(this, function (_a) {
              layout = sender.layout;
              nameControl = layout.controls.tryGet("Name");
              if (!nameControl) {
                  return [2 /*return*/];
              }
              if (nameControl.params.value == null) {
                  message = "Заполните название!";
                  MessageBox.MessageBox.ShowError(message);
                  e.cancel();
              }
              return [2 /*return*/];
          });
      });
  }
  function changeCommanded(sender) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var layout, bossControl, phoneControl, employeeModel;
          return tslib.__generator(this, function (_a) {
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
  function newCard(sender) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var layout, whoControl, employeeModel;
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      layout = sender.layout;
                      whoControl = layout.controls.tryGet("WhoDraws");
                      if (!whoControl) {
                          return [2 /*return*/];
                      }
                      if (!(layout.layoutInfo.action.toString() == "2")) return [3 /*break*/, 2];
                      return [4 /*yield*/, $SecretaryController.GetSecretary("Секретарь")];
                  case 1:
                      employeeModel = _a.sent();
                      whoControl.params.value = employeeModel.secretary;
                      _a.label = 2;
                  case 2: return [2 /*return*/];
              }
          });
      });
  }
  function getDaily(sender) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var layout, countDayControl, sumDayControl, cityModel;
          return tslib.__generator(this, function (_a) {
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
  function changeState(sender) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var layout;
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      layout = sender.layout;
                      if (!layout.editOperations.available('CFDEED34-8DC0-497D-A22E-3D8E11483ADD')) return [3 /*break*/, 2];
                      return [4 /*yield*/, layout.changeState('CFDEED34-8DC0-497D-A22E-3D8E11483ADD')];
                  case 1:
                      _a.sent();
                      MessageBox.MessageBox.ShowInfo('Состояние изменилось');
                      sender.params.visibility = false;
                      return [3 /*break*/, 3];
                  case 2:
                      MessageBox.MessageBox.ShowError('Операция недоступна');
                      _a.label = 3;
                  case 3: return [2 /*return*/];
              }
          });
      });
  }
  function getTicketPriceButtom(sender) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var layout, dateIntoControl, dateOnControl, cityComanndedControl, priceTicketControl, cityModel, tmp;
          return tslib.__generator(this, function (_a) {
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

  var CardHandlers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getCardInfo: getCardInfo,
    changeData: changeData,
    saveName: saveName,
    changeCommanded: changeCommanded,
    newCard: newCard,
    getDaily: getDaily,
    changeState: changeState,
    getTicketPriceButtom: getTicketPriceButtom
  });

  // Главная входная точка всего расширения
  // Данный файл должен импортировать прямо или косвенно все остальные файлы, 
  // чтобы rollup смог собрать их все в один бандл.
  // Регистрация расширения позволяет корректно установить все
  // обработчики событий, сервисы и прочие сущности web-приложения.
  ExtensionManager.extensionManager.registerExtension({
      name: "Template front extension",
      version: "5.5.15",
      globalEventHandlers: [SomeEventHandlers, CardHandlers]
  });

});
//# sourceMappingURL=extension.js.map

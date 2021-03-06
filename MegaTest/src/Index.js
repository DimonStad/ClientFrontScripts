import * as SomeEventHandlers from "./EventHandlers/SomeEventHandlers";
import * as CardHandlers from "./EventHandlers/CardHandlers";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.
// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "Template front extension",
    version: "5.5.15",
    globalEventHandlers: [SomeEventHandlers, CardHandlers]
});
//# sourceMappingURL=Index.js.map
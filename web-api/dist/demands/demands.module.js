"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandsModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const demands_providers_1 = require("./demands.providers");
const demands_service_1 = require("./demands.service");
const demands_controller_1 = require("./demands.controller");
const documents_module_1 = require("../documents/documents.module");
let DemandsModule = class DemandsModule {
};
DemandsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, documents_module_1.DocumentsModule],
        providers: [...demands_providers_1.demandsServiceProviders, demands_service_1.DemandsService],
        controllers: [demands_controller_1.DemandsController],
    })
], DemandsModule);
exports.DemandsModule = DemandsModule;
//# sourceMappingURL=demands.module.js.map
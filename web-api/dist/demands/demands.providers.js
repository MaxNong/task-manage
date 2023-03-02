"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demandsServiceProviders = void 0;
const demands_entity_1 = require("./demands.entity");
const documents_service_1 = require("../documents/documents.service");
exports.demandsServiceProviders = [
    {
        provide: 'DemandsRepository',
        useFactory: (dataSource) => dataSource.getRepository(demands_entity_1.Demands),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'DocumentsService',
        useClass: documents_service_1.DocumentsService,
    },
];
//# sourceMappingURL=demands.providers.js.map
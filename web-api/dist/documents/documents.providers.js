"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentsServiceProviders = void 0;
const documents_entity_1 = require("./documents.entity");
exports.documentsServiceProviders = [
    {
        provide: 'DocumentsRepository',
        useFactory: (dataSource) => dataSource.getRepository(documents_entity_1.Documents),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=documents.providers.js.map
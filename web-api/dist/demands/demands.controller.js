"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandsController = void 0;
const common_1 = require("@nestjs/common");
const demands_service_1 = require("./demands.service");
const demands_entity_1 = require("./demands.entity");
let DemandsController = class DemandsController {
    constructor(remandsService) {
        this.remandsService = remandsService;
    }
    async create(params) {
        const { status, longMaoDemand = '', demandDocuments = [], relativeDocuments = [], developers = [], preReviewDate = '', reviewDate = '', technicalReviewDate = '', testDate = '', publishDate = '', relationalApps = [], remark = '', } = params;
        const demands = new demands_entity_1.Demands();
        demands.status = status;
        demands.longMaoDemand = longMaoDemand;
        demands.demandIds = [];
        for (let index = 0; index < demandDocuments.length; index++) {
            const saveItem = await this.remandsService.createDocument(demandDocuments[index]);
            demands.demandIds.push(saveItem.id);
        }
        demands.relativeDocumentIds = [];
        for (let index = 0; index < relativeDocuments.length; index++) {
            const saveItem = await this.remandsService.createDocument(relativeDocuments[index]);
            demands.relativeDocumentIds.push(saveItem.id);
        }
        demands.developers = developers;
        demands.preReviewDate = preReviewDate;
        demands.reviewDate = reviewDate;
        demands.technicalReviewDate = technicalReviewDate;
        demands.testDate = testDate;
        demands.publishDate = publishDate;
        demands.relationalApps = relationalApps;
        demands.remark = remark;
        return await this.remandsService.create(demands);
    }
    async findAll(params) {
        const data = await this.remandsService.findAll(params);
        for (let index = 0; index < data.length; index++) {
            const demandDocuments = await this.remandsService.queryDocumentByIds(data[index].demandIds);
            data[index].demandDocuments = demandDocuments;
        }
        for (let index = 0; index < data.length; index++) {
            const relativeDocuments = await this.remandsService.queryDocumentByIds(data[index].relativeDocumentIds);
            data[index].relativeDocuments = relativeDocuments;
        }
        return data;
    }
    async findDetail(params) {
        const { id } = params;
        const data = await this.remandsService.findDetail(id);
        for (let index = 0; index < data.length; index++) {
            const demandDocuments = await this.remandsService.queryDocumentByIds(data[index].demandIds);
            data[index].demandDocuments = demandDocuments;
        }
        for (let index = 0; index < data.length; index++) {
            const relativeDocuments = await this.remandsService.queryDocumentByIds(data[index].relativeDocumentIds);
            data[index].relativeDocuments = relativeDocuments;
        }
        return data;
    }
    async updateDemand(demands) {
        const { status, longMaoDemand = '', demandDocuments = [], relativeDocuments = [], developers = [], preReviewDate = '', reviewDate = '', technicalReviewDate = '', testDate = '', publishDate = '', relationalApps = [], remark = '', } = demands;
        demands.demandIds = [];
        for (let index = 0; index < demandDocuments.length; index++) {
            const saveItem = await this.remandsService.createDocument(demandDocuments[index]);
            demands.demandIds.push(saveItem.id);
        }
        demands.relativeDocumentIds = [];
        for (let index = 0; index < relativeDocuments.length; index++) {
            const saveItem = await this.remandsService.createDocument(relativeDocuments[index]);
            demands.relativeDocumentIds.push(saveItem.id);
        }
        delete demands.demandDocuments;
        delete demands.relativeDocuments;
        demands.status = status;
        demands.longMaoDemand = longMaoDemand;
        demands.developers = developers;
        demands.preReviewDate = preReviewDate;
        demands.reviewDate = reviewDate;
        demands.technicalReviewDate = technicalReviewDate;
        demands.testDate = testDate;
        demands.publishDate = publishDate;
        demands.relationalApps = relationalApps;
        demands.remark = remark;
        return await this.remandsService.updateDemand(demands);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('detail'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandsController.prototype, "findDetail", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandsController.prototype, "updateDemand", null);
DemandsController = __decorate([
    (0, common_1.Controller)('demands'),
    __metadata("design:paramtypes", [demands_service_1.DemandsService])
], DemandsController);
exports.DemandsController = DemandsController;
//# sourceMappingURL=demands.controller.js.map
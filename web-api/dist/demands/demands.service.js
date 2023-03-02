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
exports.DemandsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const documents_service_1 = require("../documents/documents.service");
let DemandsService = class DemandsService {
    constructor(demandsRepository, documentsService) {
        this.demandsRepository = demandsRepository;
        this.documentsService = documentsService;
    }
    async findAll(params) {
        const { member, demandStatus, longMaoId, startDate, endDate } = params;
        const list = await this.demandsRepository.find({
            where: {
                longMaoDemand: longMaoId ? (0, typeorm_1.Like)(`%${longMaoId}%`) : undefined,
                status: demandStatus ? demandStatus : undefined,
                publishDate: startDate && endDate ? (0, typeorm_1.Between)(startDate, endDate) : undefined,
                developers: (0, typeorm_1.Like)(`%${member}%`),
            },
            order: {
                publishDate: 'DESC',
            },
        });
        return list;
    }
    async create(tasks) {
        await this.demandsRepository.save(tasks);
    }
    async createDocument(documents) {
        return await this.documentsService.createDocument(documents);
    }
    async queryDocumentByIds(ids) {
        return await this.documentsService.findByIds(ids);
    }
    async findDetail(id) {
        return await this.demandsRepository.findBy({
            id: id,
        });
    }
    async updateDemand(demand) {
        const { id } = demand;
        return await this.demandsRepository.update({
            id: id,
        }, demand);
    }
};
DemandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DemandsRepository')),
    __param(1, (0, common_1.Inject)('DocumentsService')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        documents_service_1.DocumentsService])
], DemandsService);
exports.DemandsService = DemandsService;
//# sourceMappingURL=demands.service.js.map
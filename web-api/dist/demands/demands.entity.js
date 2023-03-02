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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Demands = void 0;
const typeorm_1 = require("typeorm");
let Demands = class Demands {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Demands.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 1,
    }),
    __metadata("design:type", Number)
], Demands.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
    }),
    __metadata("design:type", String)
], Demands.prototype, "longMaoDemand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
        charset: 'latin1',
    }),
    __metadata("design:type", Array)
], Demands.prototype, "demandIds", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
    }),
    __metadata("design:type", Array)
], Demands.prototype, "relativeDocumentIds", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
    }),
    __metadata("design:type", Array)
], Demands.prototype, "developers", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
    }),
    __metadata("design:type", String)
], Demands.prototype, "preReviewDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
    }),
    __metadata("design:type", String)
], Demands.prototype, "reviewDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
    }),
    __metadata("design:type", String)
], Demands.prototype, "technicalReviewDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
    }),
    __metadata("design:type", String)
], Demands.prototype, "testDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
    }),
    __metadata("design:type", String)
], Demands.prototype, "publishDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
    }),
    __metadata("design:type", Array)
], Demands.prototype, "relationalApps", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
    }),
    __metadata("design:type", String)
], Demands.prototype, "remark", void 0);
Demands = __decorate([
    (0, typeorm_1.Entity)()
], Demands);
exports.Demands = Demands;
//# sourceMappingURL=demands.entity.js.map
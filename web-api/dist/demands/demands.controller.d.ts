import { DemandsService } from './demands.service';
export declare class DemandsController {
    private readonly remandsService;
    constructor(remandsService: DemandsService);
    create(params: any): Promise<void>;
    findAll(params: any): Promise<any>;
    findDetail(params: any): Promise<any>;
    updateDemand(demands: any): Promise<any>;
}

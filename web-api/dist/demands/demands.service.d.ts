import { Repository } from 'typeorm';
import { Demands } from './demands.entity';
import { Documents } from '../documents/documents.entity';
import { DocumentsService } from '../documents/documents.service';
export declare class DemandsService {
    private demandsRepository;
    private documentsService;
    constructor(demandsRepository: Repository<Demands>, documentsService: DocumentsService);
    findAll(params: any): Promise<Demands[]>;
    create(tasks: Demands): Promise<void>;
    createDocument(documents: Documents): Promise<Documents>;
    queryDocumentByIds(ids: number[]): Promise<Documents[]>;
    findDetail(id: number): Promise<any>;
    updateDemand(demand: any): Promise<any>;
}

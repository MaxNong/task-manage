import { Repository } from 'typeorm';
import { Documents } from './documents.entity';
export declare class DocumentsService {
    private documentsRepository;
    constructor(documentsRepository: Repository<Documents>);
    createDocument(documents: Documents): Promise<Documents>;
    findAll(): Promise<Documents[]>;
    findByIds(ids: number[]): Promise<Documents[]>;
}

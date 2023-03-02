import { DataSource } from 'typeorm';
import { Demands } from './demands.entity';
import { DocumentsService } from '../documents/documents.service';
export declare const demandsServiceProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Demands>;
    inject: string[];
    useClass?: undefined;
} | {
    provide: string;
    useClass: typeof DocumentsService;
    useFactory?: undefined;
    inject?: undefined;
})[];

import { DataSource } from 'typeorm';
import { Documents } from './documents.entity';
export declare const documentsServiceProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Documents>;
    inject: string[];
}[];

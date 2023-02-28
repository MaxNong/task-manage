import { DataSource } from 'typeorm';
import { Demands } from './demands.entity';
import { DocumentsService } from '../documents/documents.service';

export const demandsServiceProviders = [
  {
    provide: 'DemandsRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Demands),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DocumentsService',
    useClass: DocumentsService,
  },
];

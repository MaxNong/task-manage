import { DataSource } from 'typeorm';
import { Documents } from './documents.entity';

export const documentsServiceProviders = [
  {
    provide: 'DocumentsRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Documents),
    inject: ['DATA_SOURCE'],
  },
];

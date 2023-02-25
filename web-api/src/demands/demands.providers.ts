import { DataSource } from 'typeorm';
import { Remands } from './demands.entity';

export const tasksServiceProviders = [
  {
    provide: 'PHOTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Remands),
    inject: ['DATA_SOURCE'],
  },
];

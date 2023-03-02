import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        // host: 'localhost',
        host: '139.224.221.14',
        port: 3306,
        // username: 'root',
        username: 'baoqiang782',
        // password: '123456',
        password: 'bQ@baoqiang782!',
        // database: 'task-manage',
        database: 'task-manage-api',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

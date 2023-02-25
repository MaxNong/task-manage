import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tasksServiceProviders } from './demands.providers';
import { DemandsService } from './demands.service';
import { TasksController } from './demands.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...tasksServiceProviders, DemandsService],
  controllers: [TasksController],
})
export class TasksModule {}

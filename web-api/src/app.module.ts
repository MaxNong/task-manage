import { Module } from '@nestjs/common';
import { TasksModule } from './demands/demands.module';

@Module({
  imports: [TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

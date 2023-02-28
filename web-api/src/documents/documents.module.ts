import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { documentsServiceProviders } from './documents.providers';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...documentsServiceProviders, DocumentsService],
  controllers: [DocumentsController],
  exports: [...documentsServiceProviders],
})
export class DocumentsModule {}

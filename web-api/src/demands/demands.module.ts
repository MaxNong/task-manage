import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { demandsServiceProviders } from './demands.providers';
import { DemandsService } from './demands.service';
import { DemandsController } from './demands.controller';
import { DocumentsModule } from '../documents/documents.module';

@Module({
  imports: [DatabaseModule, DocumentsModule],
  providers: [...demandsServiceProviders, DemandsService],
  controllers: [DemandsController],
})
export class DemandsModule {}

import { Module } from '@nestjs/common';
import { DemandsModule } from './demands/demands.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [DemandsModule, DocumentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

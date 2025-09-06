import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DatabaseModule } from '../generated/database/database.module'
// import { InspectionModule } from '../generated/inspection/modules/inspection.module';

@Module({
  imports: [
    // DatabaseModule,
    // InspectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

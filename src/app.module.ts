import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DatabaseModule } from '../generated/database/database.module'
// import { InspectionModule } from '../generated/inspection/modules/inspection.module';
// import { StatusModule } from '../generated/status/modules/status.module';

@Module({
  imports: [
    // DatabaseModule,
    // InspectionModule,
    // StatusModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

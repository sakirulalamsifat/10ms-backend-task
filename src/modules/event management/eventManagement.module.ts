import { Module } from '@nestjs/common';
import { EventManagementService } from './eventManagement.service';
import { EvenetManagementController } from './eventManagemen.controller';
import {eventManagementProviders} from './eventManagement.providers'
import {DatabaseModule} from '../../config/database/database.module'

@Module({
  providers: [EventManagementService,...eventManagementProviders], 
  imports:[DatabaseModule],
  exports: [EventManagementService],
  controllers: [EvenetManagementController]
})
export class EveneManagementModule {}

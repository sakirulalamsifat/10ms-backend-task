import { Controller, Post, Body } from '@nestjs/common';
import {EventManagementService} from './eventManagement.service'
import {UserDto, UserEmailDto} from '../../dto'

@Controller('v1')
export class EvenetManagementController {

    constructor(private eventManagementService: EventManagementService) {}
       
    @Post('/eventList')
    async userCreate( @Body() reqbody : any ) {
        const { page = 1, limit = 10 } = reqbody
        
        return await this.eventManagementService.eventList(limit, limit * (page - 1),page)
    }

    @Post('/eventDetails')
    async userFind( @Body() reqbody : any ) {

        return await this.eventManagementService.eventDetails(reqbody)
    }

    @Post('/callstoreprocedure')
    async callStoreProcedure( @Body() reqbody : any ) {

        return await this.eventManagementService.callStoreProcedure(reqbody.the_input_paramenter)
    }
}

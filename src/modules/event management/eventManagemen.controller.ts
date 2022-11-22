import { Controller, Post, Body } from '@nestjs/common';
import {EventManagementService} from './eventManagement.service'
import {UserDto, UserEmailDto} from '../../dto'

@Controller('v1')
export class EvenetManagementController {

    constructor(private eventManagementService: EventManagementService) {}
       
    @Post('/eventList')
    async eventList( @Body() reqbody : any ) {
        const { page = 1, limit = 10 } = reqbody
        
        return await this.eventManagementService.eventList(limit, limit * (page - 1),page)
    }

    @Post('/eventDetails')
    async eventDetails( @Body() reqbody : any ) {

        return await this.eventManagementService.eventDetails(reqbody)
    }

    @Post('/workshopList')
    async workshopList( @Body() reqbody : any ) {

        return await this.eventManagementService.workshopList(reqbody)
    }

    @Post('/workshopDetails')
    async workshopDetails( @Body() reqbody : any ) {

        return await this.eventManagementService.workshopDetails(reqbody)
    }
}

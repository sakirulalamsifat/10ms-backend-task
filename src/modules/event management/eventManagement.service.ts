import { Injectable, Inject } from '@nestjs/common';
import { EventModel, WorkshopModel, ReservationModel } from '../../models';
import { USER_REPOSITORY, DATABASE_CONNECTION, EVENTS, WORKSHOPS, RESERVATIONS } from '../../config/constants';
import { Sequelize } from 'sequelize-typescript';
import { response } from 'express';
import {Op} from 'sequelize'

@Injectable() 
export class EventManagementService { 
    constructor(
        @Inject(EVENTS) private readonly events: typeof EventModel,
        @Inject(WORKSHOPS) private readonly workshops: typeof WorkshopModel,
        @Inject(RESERVATIONS) private readonly reservations: typeof ReservationModel,
        @Inject(DATABASE_CONNECTION) private DB: Sequelize

    ) { }

    async eventList(limit: number, offset: number, page:number): Promise<any> {
        const eventList = await this.events.findAll({
            limit,
            offset,
            order: [['start_at', 'DESC']]
            , where: {
                start_at: {
                [Op.gt]: Sequelize.literal("(utc_timestamp())")
            }}
        })

        const pagination = {
            total: eventList.length,
            per_page: limit,
            total_pages: await this.events.count() < limit ? 1 : Math.ceil(await this.events.count() / limit),
            current_page:page
        }

        return { eventList,pagination }
        
    }

    async eventDetails(req: any): Promise<any> {
        const { eventId } = req
        
        const eventDetails = await this.events.findOne({ where: { id: eventId } })
        
        const workshopCount = await this.workshops.count({ where: { event_id: eventId } })

        
        const response = {
            id: eventDetails.id,
            title: eventDetails.title,
            start_at: eventDetails.start_at,
            end_at: eventDetails.end_at,
            total_workshops:workshopCount
        }
        
        return response
    }

    async callStoreProcedure(the_input_paramenters_required: any) : Promise<any>{
        
       
    }
}



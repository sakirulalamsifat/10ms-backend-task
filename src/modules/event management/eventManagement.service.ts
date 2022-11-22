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

    async workshopList(req: any) : Promise<any>{
        
        const { event_id } = req
        
        const workshoplist = await this.events.findOne({
            where:{id:event_id},
            include: [{
                model: WorkshopModel,
                where:{start_at:{[Op.gt]: Sequelize.literal("(utc_timestamp())")}}
            }]
        })

        return workshoplist
    }


    async workshopDetails(req: any) : Promise<any>{
        
        const { workshop_id } = req
        
        const workshopDetails = await this.workshops.findOne({
            where:{id:workshop_id}
        })

        const reservationCount = await this.reservations.count({ where: { workshop_id } })
        
        const response = {
            id: workshopDetails.id,
            title: workshopDetails.title,
            desctiption:workshopDetails.description,
            start_at: workshopDetails.start_at,
            end_at: workshopDetails.end_at,
            total_reservations:reservationCount
        }
        return response
    }

    async workshopReservation(req: any) : Promise<any>{
        
        const { name,email,workshop_id } = req
        
        const reservation = await this.reservations.create({
            name,
            email,
            workshop_id
        })
    
        const workshop = await this.workshops.findOne({
            where:{id:reservation.workshop_id}
        })

        const event = await this.events.findOne({
            where:{id:workshop.event_id}
        })

        const response={reservation, workshop,event}
  
        return response
    }
}



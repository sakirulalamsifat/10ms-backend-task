import { EventModel, WorkshopModel, ReservationModel } from '../../models';
import { EVENTS, WORKSHOPS, RESERVATIONS } from '../../config/constants';

export const eventManagementProviders = [{
    provide: EVENTS,
    useValue: EventModel,
},

{
    provide: WORKSHOPS,
    useValue: WorkshopModel,
    },

    {
        provide: RESERVATIONS,
        useValue: ReservationModel,
    }
    


];
import { Table, Column, Model, DataType, Sequelize,HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import {WorkshopModel} from './index'
@Table({ tableName: 'events' })

export class EventModel extends Model{
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement : true,
        primaryKey : true
    })
    id: number;

    @Column({
        type: DataType.STRING(500)
    })
    title: string;

    @Column({
        type: DataType.DATE,
        defaultValue : Sequelize.literal("(utc_timestamp())")
    })
    start_at : Date;

    @Column({
        type: DataType.DATE,
        defaultValue : Sequelize.literal("(utc_timestamp())")
    })
    end_at: Date;
    
    @HasMany(() => WorkshopModel)
    workshops:WorkshopModel[]

}
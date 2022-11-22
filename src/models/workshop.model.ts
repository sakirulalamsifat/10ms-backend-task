import { Table, Column, Model, DataType,ForeignKey, Sequelize, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import {EventModel, ReservationModel} from './index'
@Table({ tableName: 'workshops' })

export class WorkshopModel extends Model{
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement : true,
        primaryKey : true
    })
    id: number;

    @ForeignKey(() => EventModel)
    @Column({
        type: DataType.NUMBER
    })
    event_id: number;

    @Column({
        type: DataType.DATE,
        defaultValue : Sequelize.literal("(utc_timestamp())")
    })
    start_at : Date;

    @Column({
        type: DataType.DATE,
        defaultValue : Sequelize.literal("(utc_timestamp())")
    })
    end_at : Date;

    @Column({
        type: DataType.STRING(45)
    })
    title: string;

    @Column({
        type: DataType.INTEGER
    })
    description: number;

    @HasMany(() => ReservationModel)
    reservations:ReservationModel[]


}
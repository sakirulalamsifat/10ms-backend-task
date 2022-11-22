import { Table, Column, Model, DataType, Sequelize, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import {WorkshopModel} from './index'

@Table({ tableName: 'reservations' })

export class ReservationModel extends Model{
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement : true,
        primaryKey : true
    })
    id: number;

    @Column({
        type: DataType.STRING(45)
    })
    name: string;

    @Column({
        type: DataType.STRING(45)
    })
    email: string;

    @ForeignKey(() => WorkshopModel)
    @Column({
        type: DataType.INTEGER
    })
    workshop_id: number;


}
import { Table, Column, Model, DataType, Sequelize, CreatedAt, UpdatedAt } from 'sequelize-typescript';

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
        defaultValue : Sequelize.literal("(now())")
    })
    start_at : Date;

    @Column({
        type: DataType.DATE,
        defaultValue : Sequelize.literal("(now())")
    })
    end_at : Date;

}
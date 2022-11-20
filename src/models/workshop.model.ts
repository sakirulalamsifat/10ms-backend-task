import { Table, Column, Model, DataType, Sequelize, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'workshops' })

export class WorkshopModel extends Model{
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement : true,
        primaryKey : true
    })
    id: number;

    @Column({
        type: DataType.NUMBER
    })
    event_id: number;

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

    @Column({
        type: DataType.STRING(45)
    })
    title: string;

    @Column({
        type: DataType.INTEGER
    })
    description: number;


}
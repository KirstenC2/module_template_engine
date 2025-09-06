import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
tableName: 'inspections',
timestamps: true,
})
export class Inspection extends Model<Inspection> {
  @PrimaryKey
  
  @Column({type: DataType.STRING, primaryKey: true, field: 'id'})
  declare id: any;



  @Column({type: DataType.STRING, field: 'title'})
  declare title: string;



  @Column({type: DataType.STRING, allowNull: true, field: 'description'})
  declare description: string;



  @Column({type: DataType.STRING, field: 'inspector'})
  declare inspector: string;



  @Column({type: DataType.DATE, field: 'inspection_date'})
  declare inspection_date: any;



  @Column({type: DataType.STRING, values: ['pending', 'in_progress', 'completed', 'cancelled'], field: 'status'})
  declare status: string;



  @Column({type: DataType.STRING, allowNull: true, field: 'result'})
  declare result: string;




  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
  }
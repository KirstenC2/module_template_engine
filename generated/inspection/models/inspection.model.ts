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



  @Column({type: DataType.STRING, values: ['SafetyInspection', 'EquipmentInspection', 'QualityInspection'], field: 'type'})
  declare type: string;



  @Column({type: DataType.DATE, field: 'inspection_date'})
  declare inspection_date: Date;



  @Column({type: DataType.STRING, values: ['pending', 'in_progress', 'completed'], field: 'status'})
  declare status: string;




  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
  }
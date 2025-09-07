import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
tableName: 'statuses',
timestamps: true,
})
export class Status extends Model<Status> {
  @PrimaryKey
  
  @Column({type: DataType.STRING, primaryKey: true, field: 'id'})
  declare id: any;



  @Column({type: DataType.STRING, field: 'name'})
  declare name: string;



  @Column({type: DataType.STRING, field: 'description'})
  declare description: string;



  @Column({type: DataType.STRING, values: ['pending', 'in_progress', 'completed'], field: 'status'})
  declare status: string;




  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
  }
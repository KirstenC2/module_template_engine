import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
tableName: 'users',
timestamps: true,
})
export class User extends Model<User> {
  @PrimaryKey
  
  @Column({type: DataType.STRING, primaryKey: true, field: 'id'})
  declare id: any;



  @Column({type: DataType.STRING, field: 'username'})
  declare username: string;



  @Column({type: DataType.STRING, allowNull: true, field: 'password'})
  declare password: string;



  @Column({type: DataType.STRING, field: 'email'})
  declare email: string;



  @Column({type: DataType.STRING, values: ['admin', 'user'], field: 'role'})
  declare role: string;




  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
  }
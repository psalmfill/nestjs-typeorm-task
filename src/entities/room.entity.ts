import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Represents a Room entity stored in the database.
 */
@Entity()
export class Room {
  /**
   * The unique identifier for the room.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The name of the room.
   */
  @Column()
  name: string;

  /**
   * The capacity of the room (number of people it can accommodate).
   */
  @Column()
  capacity: number;

  /**
   * The user ID associated with the room.
   */
  @Column()
  userId: number;
}

import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notification')
class Notification {
  @ObjectIdColumn()
  id: ObjectID; // formato do id armazenado no mongo, o padrão

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string; // vai armazenar um uuid

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;

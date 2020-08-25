import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm'
import { Post } from './Post'

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  username: string

  @OneToMany(type => Post, photo => photo.user)
  photos: Post[]
}

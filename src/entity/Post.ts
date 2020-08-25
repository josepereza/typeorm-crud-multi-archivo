import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ length: 100 })
  title: string

  @Column()
  isPublished: boolean

  @ManyToOne(type => User, user => user.photos, {
    onDelete: 'CASCADE',
  })
  user: User
}

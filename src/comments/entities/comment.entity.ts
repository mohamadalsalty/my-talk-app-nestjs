import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    content: string;

    constructor(commentObj?: Partial<Comment>) {
        this.content = commentObj?.content;
    }
}

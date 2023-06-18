import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {

  constructor(@InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>,
  ) { }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { content } = createCommentDto;
    const newComment = this.commentRepository.create({ content });
    const createdComment = await this.commentRepository.save(newComment);
    return createdComment;
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: string): Promise<Comment> {
    return await this.commentRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment['content'] | false> {
    const comment = await this.commentRepository.findOneOrFail({ where: { id } });
    const { content } = updateCommentDto
    if (comment) {
      comment.content = content
      this.commentRepository.save(comment);
      return comment.content
    } else {
      return false
    }


  }
}

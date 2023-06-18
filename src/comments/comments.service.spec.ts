import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

describe('CommentsService', () => {
  let service: CommentsService;
  let commentRepository: Repository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });


  describe('comment CRUD services', () => {
    describe('create', () => {
      it('should create and return a new comment', async () => {
        const createCommentDto: CreateCommentDto = { content: 'test comment' };
        const mockComment: Comment = { id: '1', content: 'test comment' };
        jest.spyOn(commentRepository, 'create').mockReturnValue(mockComment);
        jest.spyOn(commentRepository, 'save').mockResolvedValue(mockComment);
        const result = await service.create(createCommentDto);
        expect(commentRepository.create).toHaveBeenCalledWith({ content: 'test comment' });
        expect(commentRepository.save).toHaveBeenCalledWith(mockComment);
        expect(result).toEqual(mockComment);
      });
    });


    describe('findAll', () => {
      it('should return all the comments', async () => {
        const listOfComments: Comment[] = [
          { content: 'test 1', id: 'id 1' },
          { content: 'test 2', id: 'id 2' },
        ];
        jest.spyOn(commentRepository, 'find').mockResolvedValue(listOfComments);
        const result = await service.findAll();
        expect(result).toEqual(listOfComments);
      });
    });



    describe('findOne', () => {
      it('should return the comment', async () => {
        const oneComment: Comment = { id: 'id 1', content: 'test' };
        jest.spyOn(commentRepository, 'findOneOrFail').mockResolvedValue(oneComment);
        const result = await service.findOne(oneComment['id']);
        expect(result).toEqual(oneComment);
      });
    });




    describe('update', () => {
      it('should return the updated comment', async () => {
        const oneComment: Comment = { id: 'id 1', content: 'test' };
        const updatedContent: UpdateCommentDto = { content: 'New comment' };
        jest.spyOn(commentRepository, 'findOneOrFail').mockResolvedValue(oneComment);
        jest.spyOn(commentRepository, 'save').mockResolvedValue(oneComment);
        const result = await service.update(oneComment['id'], updatedContent);
        expect(result).toEqual(updatedContent['content']);

      });
    });

  });
});

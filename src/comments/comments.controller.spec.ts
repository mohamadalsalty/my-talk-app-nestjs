import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

describe('CommentsController', () => {
  let commentController: CommentsController;
  let commentsService: CommentsService;

  const createdComment: CreateCommentDto = { content: 'test' };
  const listOfComments: CreateCommentDto[] = [
    { content: 'test 1' },
    { content: 'test 2' },
  ];
  const oneComment: Comment = { id: '123', content: 'hello' };
  const updatedCommentContent: Comment['content'] = 'new-comment';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: {
            create: jest.fn().mockResolvedValue(createdComment),
            findAll: jest.fn().mockResolvedValue(listOfComments),
            findOne: jest.fn().mockResolvedValue(oneComment),
            update: jest.fn().mockResolvedValue(updatedCommentContent),
          },
        },
      ],
    }).compile();

    commentController = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  describe('CommentsController', () => {
    it('should be defined', () => {
      expect(commentController).toBeDefined();
      expect(commentsService).toBeDefined();
    });
  });

  describe('comment CRUD controller', () => {
    describe('create', () => {
      it('should return the created comment', async () => {
        const result = await commentController.create(createdComment);
        expect(result).toEqual(createdComment);
      });
    });

    describe('findAll', () => {
      it('should return all the comments', async () => {
        const result = await commentController.findAll();
        expect(result).toEqual(listOfComments);
      });
    });

    describe('findOne', () => {
      it('should return one comment', async () => {
        const result = await commentController.findOne(oneComment.id);
        expect(result).toEqual(oneComment.content);
      });
    });

    describe('update', () => {
      it('should return the updated comment', async () => {
        const result = await commentController.update(
          oneComment.id,
          { content: 'test' },
        );
        expect(result).toEqual(updatedCommentContent);
      });
    });
  });
});

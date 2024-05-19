import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { ResponseService } from 'src/modules/response/response.service';
import { BookService } from '../services/book.service';
import { BookAllQueryDto } from '../dto';

// Define a simple interface to match the structure of BookEntity
interface BookEntity {
  id: number;
  code: string;
  title: string;
  author: string;
  stock: number;
}

describe('BookController', () => {
  let controller: BookController;
  let responseService: ResponseService;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: ResponseService,
          useValue: {
            success: jest.fn(),
          },
        },
        {
          provide: BookService,
          useValue: {
            getAllBooks: jest.fn(),
            getAllAvailableBooks: jest.fn(),
            getAllUnAvailableBooks: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    responseService = module.get<ResponseService>(ResponseService);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllBooks', () => {
    it('should return all books when available query parameter is not provided or true', async () => {
      const query: BookAllQueryDto = {};

      // Mock BookEntity array
      const books: BookEntity[] = [
        {
          id: 1,
          code: 'BK001',
          title: 'Book 1',
          author: 'Author 1',
          stock: 10,
        },
        { id: 2, code: 'BK002', title: 'Book 2', author: 'Author 2', stock: 5 },
      ];
      jest.spyOn(bookService, 'getAllBooks').mockResolvedValueOnce(books);
      jest
        .spyOn(responseService, 'success')
        .mockReturnValue('Success Get All Books' as any);

      const result = await controller.getAllBooks(query);

      expect(responseService.success).toHaveBeenCalledWith(
        'Success Get All Books',
        books,
      );
      expect(result).toBe('Success Get All Books');
    });
  });
});

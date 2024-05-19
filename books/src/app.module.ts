import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './configs';
import { BookModule } from './modules/books/book.module';
import { ResponseModule } from './modules/response';
import { MemberModule } from './modules/member/member.module';
import { SeedsModule } from './seeds/seeds.module';
import { BorrowModule } from './modules/borrow/borrow.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),

    // Import Another modules here
    ResponseModule,
    SeedsModule,
    BookModule,
    MemberModule,
    BorrowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

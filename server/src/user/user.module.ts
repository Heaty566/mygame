import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entities/user.repository';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { LoggerModule } from '../utils/logger/logger.module';
import { RedisModule } from '../utils/redis/redis.module';
import { SmsModule } from '../providers/sms/sms.module';
import { SmailModule } from '../providers/smail/smail.module';

@Module({
      imports: [TypeOrmModule.forFeature([UserRepository]), forwardRef(() => AuthModule), LoggerModule, RedisModule, SmsModule, SmailModule],
      controllers: [UserController, AdminController],
      providers: [UserService, AdminService],
      exports: [UserService, TypeOrmModule],
})
export class UserModule {}

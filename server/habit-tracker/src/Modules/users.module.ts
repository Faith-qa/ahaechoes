import { Module } from '@nestjs/common';
import { UsersControllers } from '../controllers/users.controllers';
import { UsersService } from '../services/users.service';
import { UsersProviders } from '../providers/user.providers';
import { DatabaseModule } from '../db/db.module';
import { AuthService } from '../auth/auth.service';
import { CloudinaryModule } from '../imageUpload-Cloudinary/cloudinary.module';

@Module({
  imports: [DatabaseModule, CloudinaryModule] /*add database configurations */,
  controllers: [UsersControllers],
  providers: [UsersService, AuthService, ...UsersProviders],
  exports: [UsersService],
})
export class UsersModule {}

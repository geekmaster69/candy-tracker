import { Module } from '@nestjs/common';
import { StoreModule } from './store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { envs } from './config/environments/envs';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      url: envs.dbUrl
    }),
    StoreModule,
    FilesModule,
    AuthModule,
    MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

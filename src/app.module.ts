import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    UsersModule, DatabaseModule, EmployeesModule,
    ThrottlerModule.forRoot([
      // { // we can use just this for all routes, It applies for all routes
      // ttl: 60000, // ---->  3 req per 1min
      // limit: 3 
      // },
      {
        name: 'short', // after that we can use it in "employees.controller.ts" 
        ttl: 1000, // 1 sec 3 req only
        limit: 3
      },
      {
        name: 'long',
        ttl: 60000, // 1min 100 req only
        limit: 100
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService,
    { // for rate limit -> ThrottlerModule
      provide: APP_GUARD, // for rate limit -> ThrottlerModule
      useClass: ThrottlerGuard, // for rate limit -> ThrottlerModule
    }// for rate limit -> ThrottlerModule
  ],
})
export class AppModule { }

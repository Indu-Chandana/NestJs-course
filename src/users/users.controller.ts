import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUSerDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // This is a decorator
// This is the parent route. '/users'

// what is the @ symble doing, they run automatically when called. 
// u can thik, Nest is define predefin function. 
export class UsersController {
    // planing routes, we want to handle.

    constructor(private readonly userService: UsersService) { }

    /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */
    /* 
    - dif of PATCH and PUT -
    PATCH- change one thing
    PUT- change entire thing
    */

    /* -------------------- GET Route --------------------  */
    @Get() // GET / users ---- or ---- /users?role=val&age=24 (Query param)
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.userService.findAll(role)
    }

    /*
        We u had a specific static route '/users/interns' 
        that would be before s dynamic route '/users/:id'
    */

    /* 
    ParseIntPipe - It convert string into a --> NUMBER
    */
    @Get(':id') // GET / users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id) // convert num to string
    }

    /* -------------------- POST Route --------------------  */

    /*
    ValidationPipe --> that keep on eye on Dto validations and send error if found
    */

    @Post() // POST / users
    create(@Body(ValidationPipe) createUSerDto: CreateUSerDto) {
        return this.userService.create(createUSerDto)
    }

    /* -------------------- POST Route --------------------  */
    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto)
    }

    /* -------------------- DELETE Route --------------------  */
    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id: string) {
        return this.userService.delete(+id) // +id -> convert string to num
    }
}

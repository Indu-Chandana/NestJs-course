import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUSerDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "tset test",
            "email": "email@email.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "tset test",
            "email": "email@email.com",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "tset test",
            "email": "email@email.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "tset test",
            "email": "email@email.com",
            "role": "INTERN"
        },
        {
            "id": 5,
            "name": "tset test",
            "email": "email@email.com",
            "role": "INTERN"
        },
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const roleArray = this.users.filter(user => user.role === role)

            if (roleArray.length === 0) throw new NotFoundException('User Role Not Found')
            return roleArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if (!user) throw new NotFoundException('User Not Found')
        return user
    }

    create(createUSerDto: CreateUSerDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUSerDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser }
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        this.users = this.users.filter(user => user.id !== id)

        const removeUser = this.findOne(id)
        return removeUser
    }
}

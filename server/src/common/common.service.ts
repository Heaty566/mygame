import { Injectable } from '@nestjs/common';

import { UserRepository } from '../users/entities/user.repository';

@Injectable()
export class CommonService {
      constructor(private userRepository: UserRepository) {}
}

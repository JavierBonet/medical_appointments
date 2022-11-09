import { hash } from 'bcrypt';
import { FindOptions, InferAttributes } from 'sequelize/types';
import { Attributes, CreationAttributes } from '../../db/models/adminuser';
import {
  AdminUser,
  AdminUserRepositoryInterface,
} from '../../repositories/admin_user';

const SALT_ROUNDS = 10;

class AdminUserService {
  private _adminUsersRepository: AdminUserRepositoryInterface;

  constructor(adminUsersRepository: AdminUserRepositoryInterface) {
    this._adminUsersRepository = adminUsersRepository;
  }

  getAll(options?: FindOptions<InferAttributes<AdminUser, { omit: never }>>) {
    return this._adminUsersRepository.getAll(options);
  }

  getById(
    id: number,
    options?:
      | Omit<
          FindOptions<
            InferAttributes<
              AdminUser,
              {
                omit: never;
              }
            >
          >,
          'where'
        >
      | undefined
  ) {
    return this._adminUsersRepository.getAdminUserById(id, options);
  }

  getByEmail(email: string) {
    return this._adminUsersRepository.getAdminUserByEmail(email);
  }

  async create(adminUser: CreationAttributes) {
    const plainPassword = adminUser.password;
    const encryptedPassword = await hash(plainPassword, SALT_ROUNDS);
    adminUser.password = encryptedPassword;
    return this._adminUsersRepository.createAdminUser(adminUser);
  }

  update(id: number, adminUser: Attributes) {
    return this._adminUsersRepository.updateAdminUser(id, adminUser);
  }

  delete(id: number) {
    return this._adminUsersRepository.deleteAdminUser(id);
  }
}

export { AdminUserService };

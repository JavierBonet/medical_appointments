import { FindOptions, InferAttributes, ValidationError } from 'sequelize';
import AdminUser, {
  Attributes,
  CreationAttributes,
} from '../db/models/adminuser';

const AdminUserRepository = {
  getAll: function getAll(
    options?: FindOptions<InferAttributes<AdminUser, { omit: never }>>
  ) {
    return AdminUser.findAll(options);
  },

  getAdminUserById: function getAdminUserlById(
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
    return AdminUser.findByPk(id, options);
  },

  getAdminUserByEmail: function getAdminUserByEmail(email: string) {
    return AdminUser.findOne({ where: { email: email } });
  },

  createAdminUser: function createAdminUser(adminUser: CreationAttributes) {
    return AdminUser.create(adminUser);
  },

  updateAdminUser: function updateAdminUser(id: number, adminUser: Attributes) {
    return AdminUserRepository.getAdminUserById(id).then(
      (previousAdminUser) => {
        if (previousAdminUser) {
          return previousAdminUser
            .update(adminUser)
            .then((_) => ({ message: `AdminUser ${id} updated successfully` }))
            .catch((err: Error) => {
              let message;
              if (err instanceof ValidationError && err.errors) {
                message = err.errors.map((error) => error.message).join('\n');
              } else {
                message = err.message;
              }
              throw { message };
            });
        } else {
          return { message: `Unable to find admin user ${id}` };
        }
      }
    );
  },

  deleteAdminUser: function deleteAdminUser(id: number) {
    return AdminUserRepository.getAdminUserById(id).then((adminUser) => {
      if (adminUser) {
        adminUser.destroy();
        return { message: `AdminUser ${id} deleted successfully` };
      } else {
        return { message: `Unable to find adminuser ${id}` };
      }
    });
  },
};

export type AdminUserRepositoryInterface = typeof AdminUserRepository;

function createAdminUsersRepository() {
  const repository: AdminUserRepositoryInterface =
    Object.create(AdminUserRepository);
  return repository;
}

export { createAdminUsersRepository, AdminUser };

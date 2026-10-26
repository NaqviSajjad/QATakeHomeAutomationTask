import { faker } from '@faker-js/faker';

export default class UserHelper {
  static buildUniqueUser() {
    return {
      username: `qa${faker.internet.username().replace(/[^a-zA-Z0-9]/g, '').slice(0, 12)}${Date.now()}`,
      password: `${faker.internet.password({ length: 12, memorable: true })}!1`,
    };
  }

  static fillIfPresent(input, value) {
    if (value === undefined || value === null || value === '') {
      return;
    }

    input.clear().type(value);
  }
}

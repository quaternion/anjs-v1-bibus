import { UserId } from "commands/models/user";
import { UserEmail, UserEmailId } from "commands/models/user-email";
import {
  activateMainEmail,
  EmailIsNotMain,
} from "commands/operations/user-management/activate-main-email/index";
import { Email } from "libs/branded-types";

describe("activateMainEmail", () => {
  describe("failed", () => {
    it("should throw error if not main email", () => {
      const mainEmail: UserEmail = {
        id: UserEmailId.new(),
        main: false,
        userId: UserId.new(),
        createdAt: new Date(),
        updatedAt: new Date(),
        state: {
          __type: "UserEmailStateInactivated",
          value: Email.ofString("some@mail.com"),
          activated: false,
        },
      };

      try {
        activateMainEmail(mainEmail);
      } catch (e) {
        expect(e instanceof EmailIsNotMain).toBeTruthy();
      }
    });
  });
  describe("successful", () => {
    it("should return void on UserEmailStateInactivated state", () => {
      const mainEmail: UserEmail = {
        id: UserEmailId.new(),
        main: true,
        userId: UserId.new(),
        createdAt: new Date(),
        updatedAt: new Date(),
        state: {
          __type: "UserEmailStateInactivated",
          value: Email.ofString("some@mail.com"),
          activated: false,
        },
      };

      expect(activateMainEmail(mainEmail)).toBeUndefined();
    });
  });
});

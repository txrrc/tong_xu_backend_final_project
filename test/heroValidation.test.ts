import { heroSchema } from "../src/api/v1/validations/heroValidation";

describe("heroSchema validation", () => {
  test("should return an error when name is empty", () => {
    const invalidInput = {
      name: "",
      rank: "A",
      ability: "Tanktop smash",
    };
    const { error } = heroSchema.validate(invalidInput);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Hero name cannot be empty");
  });

  test("should return an error when rank is empty", () => {
    const invalidInput = {
      name: "Tanktop Vegetarian",
      rank: "",
      ability: "Tanktop smash",
    };
    const { error } = heroSchema.validate(invalidInput);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Hero rank cannot be empty");
  });

  test("should return an error when ability is empty", () => {
    const invalidInput = {
      name: "Tanktop Vegetarian",
      rank: "A",
      ability: "",
    };
    const { error } = heroSchema.validate(invalidInput);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Hero ability cannot be empty.");
  });

  test("should return an error when id is empty string", () => {
    const invalidInput = {
      id: "",
      name: "Tanktop Vegetarian",
      rank: "A",
      ability: "Tanktop smash",
    };
    const { error } = heroSchema.validate(invalidInput);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Hero id cannot be empty.");
  });

  test("should pass when all fields are valid", () => {
    const validInput = {
      id: "9",
      name: "Tanktop Vegetarian",
      rank: "A",
      ability: "Tanktop smash",
    };
    const { error } = heroSchema.validate(validInput);
    expect(error).toBeUndefined();
  });
});

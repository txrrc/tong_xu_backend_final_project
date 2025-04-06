import { monsterSchema } from "../src/api/v1/validations/monsterValidation";

describe("monsterSchema validation", () => {
  test("should return an error when name is empty", () => {
    const invalidInput = {
        id: "20",
        name: "",
        threatlevel: "Ghost",
        ability: "Acid",
    };
    const { error } = monsterSchema.validate(invalidInput);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Monster name cannot be empty");
  });

  test("should return an error when threatlevel is empty", () => {
    const invalidInput = {
        id: "20",
        name: "King of the sea",
        threatlevel: "",
        ability: "Acid",
    };
    const { error } = monsterSchema.validate(invalidInput);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Monster threatlevel cannot be empty");
  });

  test("should return an error when ability is empty", () => {
    const invalidInput = {
        id: "20",
        name: "King of the sea",
        threatlevel: "Ghost",
        ability: "",
    };
    const { error } = monsterSchema.validate(invalidInput);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Monster ability cannot be empty.");
  });

  test("should return an error when id is empty string", () => {
    const invalidInput = {
        id: "",
        name: "King of the sea",
        threatlevel: "Ghost",
        ability: "Acid",
    };
    const { error } = monsterSchema.validate(invalidInput);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Monster id cannot be empty.");
  });

  test("should pass when all fields are valid", () => {
    const validInput = {
        id: "20",
        name: "King of the sea",
        threatlevel: "Ghost",
        ability: "Acid",
    };
    const { error } = monsterSchema.validate(validInput);
    expect(error).toBeUndefined();
  });
});
import { affiliationSchema } from "../src/api/v1/validations/affiliationValidation";

describe("affiliationSchema validation", () => {
  test("should return an error when name is empty", () => {
    const invalidInput = {
        id: "3",
        name: "",
        background: "An association locates under City Z"
    };
    const { error } = affiliationSchema.validate(invalidInput);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Affiliation name cannot be empty.");
  });

  test("should return an error when rank background empty", () => {
    const invalidInput = {
        id: "3",
        name: "Family of monster",
        background: ""
    };
    const { error } = affiliationSchema.validate(invalidInput);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Affiliation background cannot be empty.");
  });


  test("should return an error when id is empty string", () => {
    const invalidInput = {
        id: "",
        name: "King of the sea",
        rank: "Ghost",
        ability: "Acid",
    };
    const { error } = affiliationSchema.validate(invalidInput);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Affiliation id cannot be empty.");
  });

  test("should pass when all fields are valid", () => {
    const validInput = {
        id: "3",
        name: "Family of monster",
        background: "An association locates under City Z"
    };
    const { error } = affiliationSchema.validate(validInput);
    expect(error).toBeUndefined();
  });
});
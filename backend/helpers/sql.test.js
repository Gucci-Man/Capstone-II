/**
 * sql.test.js
 * -----------
 * Unit tests for the `sqlForPartialUpdate` function in the sql.js module.
 *
 * Purpose:
 * The `sqlForPartialUpdate` function is a helper function designed to
 * construct a partial SQL UPDATE statement from a data object and an optional 
 * mapping of JavaScript field names to database column names.
 *
 * Tests verify:
 * * Correct SQL generation with valid data and column mapping.
 * * Error handling when no data is provided for the update.
 * * Default column name usage when a mapping is not provided.
 */

const { sqlForPartialUpdate } = require("./sql"); 
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", function () {

  it("should generate SQL for partial update with valid data and mapping", function () {
    const dataToUpdate = { firstName: "Aliya", age: 32 };
    const jsToSql = { firstName: "first_name" }; // Field-to-column mapping

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2', // SQL SET clause
      values: ["Aliya", 32],             // Values for placeholders
    });
  });

  it("should throw BadRequestError if no data is provided", function () {
    const dataToUpdate = {};
    const jsToSql = { firstName: "first_name" };

    expect(() => sqlForPartialUpdate(dataToUpdate, jsToSql)).toThrow(
      BadRequestError, 
      "No data"         
    );
  });

  it("should use default column name if not provided in the mapping", function () {
    const dataToUpdate = { firstName: "Aliya", age: 32 };
    const jsToSql = {}; 

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    // Assert expected output (uses original JS field names as columns)
    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });
});

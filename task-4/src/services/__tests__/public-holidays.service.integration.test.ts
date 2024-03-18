import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../public-holidays.service";

describe("Public Holidays service", () => {
  describe("getListOfPublicHolidays", () => {
    describe("when invalid country or year was provided", () => {
      it("should throw an error", async () => {
        await expect(getListOfPublicHolidays(1984, "GB")).rejects.toThrow(
          "Year provided not the current, received: 1984"
        );
        await expect(
          getListOfPublicHolidays(new Date().getFullYear(), "LT")
        ).rejects.toThrow("Country provided is not supported, received: LT");
      });
    });

    describe("when valid country and year were provided", () => {
      it("should return shorten public holidays for provided country and year", async () => {
        const result = await getListOfPublicHolidays(
          new Date().getFullYear(),
          "GB"
        );

        /**
         * Note: As getListOfPublicHolidays year validation requires current year to be passed,
         * result will be different based on time of execution. Thus, assert in less specific way.
         */
        expect(result.length).toBeGreaterThan(0);
        expect(result[0]).toEqual({
          name: expect.any(String),
          localName: expect.any(String),
          date: expect.any(String),
        });
      });
    });

    // Note: As getListOfPublicHolidays has validation, it is impossible to simulate error return (equal to [])
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    describe("when invalid country was provided", () => {
      it("should throw an error", async () => {
        await expect(checkIfTodayIsPublicHoliday("LT")).rejects.toThrow(
          "Country provided is not supported, received: LT"
        );
      });
    });

    /**
     * Note: As checkIfTodayIsPublicHoliday is not deterministic (result depend on current day date),
     * it is impossible to cover it with integration tests (without API mocking).
     */
  });

  describe("getNextPublicHolidays", () => {
    describe("when invalid country", () => {
      it("should throw an error", async () => {
        await expect(getNextPublicHolidays("LT")).rejects.toThrow(
          "Country provided is not supported, received: LT"
        );
      });
    });

    describe("when valid country was provided", () => {
      it("should return shorten next public holidays for provided country", async () => {
        const result = await getNextPublicHolidays("GB");

        expect(result.length).toBeGreaterThan(0);
        expect(result[0]).toEqual({
          name: expect.any(String),
          localName: expect.any(String),
          date: expect.any(String),
        });
      });
    });

    // Note: As getNextPublicHolidays has validation, it is impossible to simulate error return (equal to [])
  });
});

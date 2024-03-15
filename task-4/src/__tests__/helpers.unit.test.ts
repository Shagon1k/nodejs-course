import {
  validateCountry,
  validateYear,
  validateInput,
  shortenPublicHoliday,
} from "../helpers";

import { PublicHoliday } from "../types";

describe("helpers", () => {
  describe("validateCountry", () => {
    describe("when supported country was passed", () => {
      it.each(["GB", "FR"])(
        "should return 'true' for supported country %s",
        (supportedCountry) => {
          expect(validateCountry(supportedCountry)).toEqual(true);
        }
      );
    });

    describe("when unsupported country was passed", () => {
      it.each(["LT", "PL"])(
        "should return 'false' for unsupported country %s",
        (unsupportedCountry) => {
          expect(validateCountry(unsupportedCountry)).toEqual(false);
        }
      );
    });
  });

  describe("validateYear", () => {
    describe("when current year was provided", () => {
      it("should return 'true'", () => {
        expect(validateYear(new Date().getFullYear())).toEqual(true);
      });
    });

    describe("when NOT current year was provided", () => {
      it("should return 'false'", () => {
        expect(validateYear(1984)).toEqual(false);
      });
    });
  });

  describe("validateInput", () => {
    describe("when 'year' param was provided", () => {
      describe("and 'country' param was NOT provided", () => {
        describe("and provided 'year' is valid", () => {
          it("should return 'true'", () => {
            expect(validateInput({ year: new Date().getFullYear() })).toEqual(
              true
            );
          });
        });
        describe('and provided "year" is NOT valid', () => {
          it("should throw an error", () => {
            expect(() => validateInput({ year: 1984 })).toThrow(
              new Error("Year provided not the current, received: 1984")
            );
          });
        });
      });

      describe("and 'country' param was provided", () => {
        describe("and both 'year' and 'country' are valid", () => {
          it("should return 'true'", () => {
            expect(
              validateInput({ year: new Date().getFullYear(), country: "GB" })
            ).toEqual(true);
          });
        });

        describe("and some of 'year' and 'country' is NOT valid", () => {
          it("should throw an error", () => {
            expect(() =>
              validateInput({ year: new Date().getFullYear(), country: "LT" })
            ).toThrow(
              new Error("Country provided is not supported, received: LT")
            );
            expect(() => validateInput({ year: 1984, country: "GB" })).toThrow(
              new Error("Year provided not the current, received: 1984")
            );
          });
        });
      });
    });

    describe("when 'year' param was NOT provided", () => {
      describe("and 'country' param was provided", () => {
        describe("and 'country' param is valid", () => {
          it("should return 'true'", () => {
            expect(validateInput({ country: "GB" })).toEqual(true);
          });
        });
        describe("and 'country' param is NOT valid", () => {
          it("should throw an error", () => {
            expect(() => validateInput({ country: "LT" })).toThrow(
              new Error("Country provided is not supported, received: LT")
            );
          });
        });
      });
      describe("and 'country' param was NOT provided", () => {
        it("should return 'true'", () => {
          expect(validateInput({})).toEqual(true);
        });
      });
    });
  });

  describe("shortenPublicHoliday", () => {
    describe("when PublicHoliday was provided", () => {
      it("should return its shorten version", () => {
        const mockedPublicHoliday: PublicHoliday = {
          date: "mockedDate",
          localName: "mockedLocalName",
          name: "mockedName",
          countryCode: "mockedCountryCode",
          fixed: true,
          global: true,
          counties: ["mockedCountry"],
          launchYear: 2020,
          types: ["mockedType"],
        };

        expect(shortenPublicHoliday(mockedPublicHoliday)).toEqual({
          name: "mockedName",
          localName: "mockedLocalName",
          date: "mockedDate",
        });
      });
    });
  });
});

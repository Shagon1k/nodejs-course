import axios from "axios";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../public-holidays.service";

const mockedValidateInput = jest.fn();
const mockedShortenPublicHoliday = jest.fn((arg) => arg);

jest.mock("../../helpers", () => ({
  validateInput: (...args: any) => mockedValidateInput(...args),
  shortenPublicHoliday: (arg: any) => mockedShortenPublicHoliday(arg),
}));

describe("Public Holidays service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getListOfPublicHolidays", () => {
    it("should validate provided year and country", async () => {
      const mockedYear = 1984;
      const mockedCountry = "GB";
      await getListOfPublicHolidays(mockedYear, mockedCountry);

      expect(mockedValidateInput).toHaveBeenCalledWith({
        year: mockedYear,
        country: mockedCountry,
      });
    });

    describe("when API call returns data", () => {
      it("should return shorten public holidays", async () => {
        const mockedYear = 1984;
        const mockedCountry = "GB";
        const mockedResponseData = ["mocked1", "mocked2"];
        const axiosGetSpy = jest
          .spyOn(axios, "get")
          .mockImplementation(() =>
            Promise.resolve({ data: mockedResponseData })
          );
        const result = await getListOfPublicHolidays(mockedYear, mockedCountry);

        expect(axiosGetSpy).toHaveBeenCalledWith(
          `https://date.nager.at/api/v3/PublicHolidays/${mockedYear}/${mockedCountry}`
        );
        expect(mockedShortenPublicHoliday).toHaveBeenCalledWith(
          mockedResponseData[0]
        );
        expect(mockedShortenPublicHoliday).toHaveBeenCalledWith(
          mockedResponseData[0]
        );
        expect(result).toEqual(mockedResponseData);
      });
    });

    describe("when API call throws an error", () => {
      it("should return empty array", async () => {
        jest.spyOn(axios, "get").mockImplementation(() => {
          return Promise.reject(new Error("Mocked error"));
        });
        const result = await getListOfPublicHolidays(1984, "GB");

        expect(mockedShortenPublicHoliday).not.toHaveBeenCalled();
        expect(result).toEqual([]);
      });
    });
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    it("should validate provided country", async () => {
      const mockedCountry = "GB";
      await checkIfTodayIsPublicHoliday(mockedCountry);

      expect(mockedValidateInput).toHaveBeenCalledWith({
        country: mockedCountry,
      });
    });

    describe("when API call returns status 200", () => {
      it("should return 'true'", async () => {
        const mockedCountry = "GB";
        const axiosGetSpy = jest
          .spyOn(axios, "get")
          .mockImplementation(() => Promise.resolve({ status: 200 }));
        const result = await checkIfTodayIsPublicHoliday(mockedCountry);

        expect(axiosGetSpy).toHaveBeenCalledWith(
          `https://date.nager.at/api/v3/IsTodayPublicHoliday/${mockedCountry}`
        );
        expect(result).toEqual(true);
      });
    });

    describe("when API call returns status NOT 200", () => {
      it("should return 'false'", async () => {
        const mockedCountry = "GB";
        const axiosGetSpy = jest
          .spyOn(axios, "get")
          .mockImplementation(() => Promise.resolve({ status: 400 }));
        const result = await checkIfTodayIsPublicHoliday(mockedCountry);

        expect(axiosGetSpy).toHaveBeenCalledWith(
          `https://date.nager.at/api/v3/IsTodayPublicHoliday/${mockedCountry}`
        );
        expect(result).toEqual(false);
      });
    });

    describe("when API call throws an error", () => {
      it("should return 'false'", async () => {
        jest.spyOn(axios, "get").mockImplementation(() => {
          return Promise.reject(new Error("Mocked error"));
        });
        const result = await checkIfTodayIsPublicHoliday("GB");

        expect(result).toEqual(false);
      });
    });
  });

  describe("getNextPublicHolidays", () => {
    it("should validate provided country", async () => {
      const mockedCountry = "GB";
      await getNextPublicHolidays(mockedCountry);

      expect(mockedValidateInput).toHaveBeenCalledWith({
        country: mockedCountry,
      });
    });

    describe("when API call returns data", () => {
      it("should return shorten public holidays", async () => {
        const mockedCountry = "GB";
        const mockedResponseData = ["mocked1", "mocked2"];
        const axiosGetSpy = jest
          .spyOn(axios, "get")
          .mockImplementation(() =>
            Promise.resolve({ data: mockedResponseData })
          );
        const result = await getNextPublicHolidays(mockedCountry);

        expect(axiosGetSpy).toHaveBeenCalledWith(
          `https://date.nager.at/api/v3/NextPublicHolidays/${mockedCountry}`
        );
        expect(mockedShortenPublicHoliday).toHaveBeenCalledWith(
          mockedResponseData[0]
        );
        expect(mockedShortenPublicHoliday).toHaveBeenCalledWith(
          mockedResponseData[0]
        );
        expect(result).toEqual(mockedResponseData);
      });
    });

    describe("when API call throws an error", () => {
      it("should return empty array", async () => {
        jest.spyOn(axios, "get").mockImplementation(() => {
          return Promise.reject(new Error("Mocked error"));
        });
        const result = await getNextPublicHolidays("GB");

        expect(mockedShortenPublicHoliday).not.toHaveBeenCalled();
        expect(result).toEqual([]);
      });
    });
  });
});

import request from "supertest";
import { PUBLIC_HOLIDAYS_API_URL } from "../config"; // Swagger https://date.nager.at/swagger/index.html

describe("Nager.Date (Public Holidays) API", () => {
  describe("/PublicHolidays/{year}/{countryCode}", () => {
    describe("when valid year and country code were provided", () => {
      it("should return 200 response code with array of public holidays for specified country in a year", async () => {
        const { status, body: result } = await request(
          PUBLIC_HOLIDAYS_API_URL
        ).get("/PublicHolidays/2020/GB");

        expect(status).toEqual(200);
        expect(result.length).toBeGreaterThan(0);
        expect(result[0]).toEqual({
          date: "2020-01-01",
          localName: "New Year's Day",
          name: "New Year's Day",
          countryCode: "GB",
          fixed: false,
          global: false,
          counties: ["GB-NIR"],
          launchYear: null,
          types: ["Public"],
        });
      });
    });

    describe("when invalid country code was provided", () => {
      it("should return 404 error response code", async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          "/PublicHolidays/2020/OO"
        );

        expect(status).toEqual(404);
      });
    });

    describe("when invalid year was provided", () => {
      it("should return 400 error response code with specific error message", async () => {
        const { status, body: result } = await request(
          PUBLIC_HOLIDAYS_API_URL
        ).get("/PublicHolidays/1900/GB");

        expect(status).toEqual(400);
        expect(result?.errors?.year).toEqual(expect.any(Array));
      });
    });
  });

  // Note: other API endpoints (/IsTodayPublicHoliday, /NextPublicHolidays, /NextPublicHolidaysWorldwide) are nondeterministic, but I'll try.. :)

  describe("/NextPublicHolidays/{countryCode}", () => {
    describe("when valid country code was provided", () => {
      it("should return 200 response code with array of public holidays for specified country in next 365 days", async () => {
        const { status, body: result } = await request(
          PUBLIC_HOLIDAYS_API_URL
        ).get("/NextPublicHolidays/GB");

        expect(status).toEqual(200);
        expect(result.length).toBeGreaterThan(0);
        expect(result[0]).toEqual({
          date: expect.any(String),
          localName: expect.any(String),
          name: expect.any(String),
          countryCode: "GB",
          fixed: expect.any(Boolean),
          global: expect.any(Boolean),
          counties: expect.any(Array),
          launchYear: null,
          types: expect.any(Array),
        });
      });
    });

    describe("when invalid country code was provided", () => {
      it("should return 500 error response code", async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          "/NextPublicHolidays/OO"
        );

        expect(status).toEqual(500);
      });
    });

    describe("when country code was NOT provided", () => {
      it("should return 404 error response code", async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          "/NextPublicHolidays/"
        );

        expect(status).toEqual(404);
      });
    });
  });
});

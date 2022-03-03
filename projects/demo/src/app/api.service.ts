import { Injectable } from "@angular/core";
import utc from 'dayjs/plugin/utc';
import dayjs from "dayjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public readonly initializedDate: string;
  private serializedDate: string;

  constructor() {
    dayjs.extend(utc);
    this.initializedDate = dayjs.utc().startOf('day').toISOString();
    this.serializedDate = this.initializedDate;
  }

  saveDate(dt: dayjs.Dayjs) {
    const serialized = dt.toJSON();
    console.log("serializedDate to: ", serialized);
    const allSerialized = serialized.match(/^([\d-]+)/);
    const justTheDate = allSerialized && allSerialized[0];
    console.log("justTheDate", justTheDate);
    const dateToStore = dayjs.utc(justTheDate, "YYYY-MM-DD").toJSON();
    console.log("dateToStore", dateToStore);
    this.serializedDate = dateToStore;
  }

  getDate(): dayjs.Dayjs {
    return dayjs.utc(this.serializedDate);
  }

  get serializedDateLiteral() {
    return this.serializedDate;
  }
}

import moment from "moment";
import { User } from "./User";

export class Student implements User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public birthDate: moment.Moment,
    public hobbies: string[]
  ) {}

  public getAge(): number {
    return moment().diff(this.birthDate, "months");
  }

  public getHobbies(): string[] {
    return this.hobbies;
  }
}

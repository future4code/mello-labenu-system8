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

  public getAgeById(students: any , id : string): void {
    const now=moment()
    students.forEach((item: any, i: number, array:any ) => {
        if(item.id=== id){
        	const ageOfStudent =now.diff(item.birthDate, "years")
        	console.log(`A idade de ${item.name} é ${ageOfStudent} anos`) 	 
        }
    });
  }

  public getHobbies(): string[] {
    return this.hobbies;
  }
}

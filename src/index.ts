import { Mission } from "./Mission";
import { Student } from "./Student";
import { Teacher } from "./Teacher";
import { TEACHER_SPECIALTY } from "./Teacher";
import moment from "moment";

// CreateStudent

function createStudent(): Student {
  const birthDate: moment.Moment = moment(process.argv[6], "DD/MM/YYYY");
  const hobbies: string[] = [];
  hobbies.push(process.argv[7], process.argv[8], process.argv[9]);

  const newStudent: Student = new Student(
    process.argv[3],
    process.argv[4],
    process.argv[5],
    birthDate,
    hobbies
  );

  console.log(newStudent);

  return newStudent;
}

/* CreateTeacher */

function createTeacher(
  id: string,
  name: string,
  email: string,
  specialities: TEACHER_SPECIALTY[]
): void {
  const newTeacher = new Teacher(id, name, email, specialities);
  console.log(newTeacher);
}

/* Switch case para chamar as funções */

const action: string = process.argv[2];

switch (action) {
  case "createStudent":
    createStudent();
    console.log("Sucesso!");
    break;
  case "createTeacher":
    createTeacher("1", "Astrodev", "astrodev@labenu.com.br", [
      TEACHER_SPECIALTY.BACKEND,
      TEACHER_SPECIALTY.OOP,
    ]);
    break;
  default:
    console.log("Operação inválida");
    break;
}

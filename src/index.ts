import { Mission } from "./Mission";
import { Student } from "./Student";
import { FileManager } from "./FileManager";

import { NightMission } from "./NightMission";
import moment from "moment";
import { Teacher, TEACHER_SPECIALTY } from "./Teacher";

/* CreateTeacher */

function createTeacher(): Teacher {
  const newSpecialties: TEACHER_SPECIALTY[] = [];
  const specialties = process.argv.slice(6);
  for (let specialty of specialties) {
    switch (specialty) {
      case "REACT":
        newSpecialties.push(TEACHER_SPECIALTY.REACT);
        break;
      case "REDUX":
        newSpecialties.push(TEACHER_SPECIALTY.REDUX);
        break;
      case "CSS":
        newSpecialties.push(TEACHER_SPECIALTY.CSS);
        break;
      case "TESTES":
        newSpecialties.push(TEACHER_SPECIALTY.TESTES);
        break;
      case "TYPESCRIPT":
        newSpecialties.push(TEACHER_SPECIALTY.TYPESCRIPT);
        break;
      case "OOP":
        newSpecialties.push(TEACHER_SPECIALTY.OOP);
        break;
      case "BACKEND":
        newSpecialties.push(TEACHER_SPECIALTY.BACKEND);
        break;
      default:
        console.log("Especialidade inexistente");
    }
  }
  const newTeacher = new Teacher(
    process.argv[3],
    process.argv[4],
    process.argv[5],
    newSpecialties
  );
  console.log(newTeacher);
  return newTeacher;
}

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

  /*   const fileManager: FileManager = new FileManager("./../students.json");

  fileManager.setFilePath("./../students.json");

  fileManager.writeFile(newStudent);
 */
  console.log(newStudent);

  return newStudent;
}

const nightMission: NightMission = new NightMission(
  "Julian",
  moment("22/06/2020", "DD/MM/YYYY"),
  moment("22/12/2020", "DD/MM/YYYY"),
  [],
  [],
  2
);

/* Switch case para chamar as funções */

const action: string = process.argv[2];
switch (action) {
  case "createStudent":
    createStudent();
    console.log("Sucesso!");
    break;
  case "createTeacher":
    createTeacher();
    break;
  case "addTeacher":
    const newTeacher = createTeacher();
    nightMission.addTeacher(newTeacher);
    break;
  default:
    console.log("Operação inválida");
    break;
}

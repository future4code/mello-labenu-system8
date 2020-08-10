import { Mission } from "./Mission";
import { Student } from "./Student";
import { FileManager } from "./FileManager";

import { NightMission } from "./NightMission";
import * as fs from 'fs'
import moment from "moment";
import { Teacher, TEACHER_SPECIALTY } from "./Teacher";
import { FullTimeMission } from "./FullTimeMission";

function ReadStudentsFile(): any {
  const fileData: string = fs.readFileSync('./students.json').toString()
  let students: any;  
  try{
      students= JSON.parse(fileData)
      return students
  }catch (error){
      students=[] 
      console.log("Erro ao ler a base de dados: " + error)
  }
}

function ReadMissionsFile(): any {
  const fileData: string = fs.readFileSync('./missions.json').toString()
  let missions: any;  
  try{
      missions= JSON.parse(fileData)
      return missions
  }catch (error){
      missions=[] 
      console.log("Erro ao ler a base de dados: " + error)
  }
}

/*Add teacher to mision */
function addTeacherToMission(missionName: string, teacherName:string ): any{
  const teachers= ReadMissionsFile()
  let teacherChoiced = teachers
  
  teachers.forEach((item: any, i: number, array:any ) => {
    if(teacherName === item.name){
      teacherChoiced = item
      console.log(teacherChoiced)
      return teacherChoiced
    }
  })

  const missions= ReadMissionsFile()
  let missionChoiced = missions

  missions.forEach((item: any, i: number, array:any ) => {
    if(missionName === item.name){
      missionChoiced = item
      console.log(missionChoiced)
      return missionChoiced
    }
  })

  const nightMission: NightMission = new NightMission(
    missionChoiced.id,
    missionChoiced.startDate,
    missionChoiced.endDate,
    missionChoiced.teachers,
    missionChoiced.students,
    missionChoiced.currentModule
  );

  const newTeacher = createTeacher();
  nightMission.addTeacher(newTeacher);
  console.log(`O professor ${teacherName} foi adicionado a turma ${missionName}`)
  
}

console.log(process.cwd());

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

  const fileManager: FileManager = new FileManager("teachers.json");

  fileManager.setFilePath("teachers.json");

  const teachers = fileManager.readFile();
  teachers.push(newTeacher);
  fileManager.writeFile(teachers);

  console.log(newTeacher);
  return newTeacher;
}

// CreateStudent

function createStudent(): Student {
  const birthDate: moment.Moment = moment(process.argv[6], "DD/MM/YYYY");
  const newHobbies: string[] = [];
  const hobbiesList = process.argv.slice(7);

  for (let hobbie of hobbiesList) {
    newHobbies.push(hobbie);
  }

  const newStudent: Student = new Student(
    process.argv[3],
    process.argv[4],
    process.argv[5],
    birthDate,
    newHobbies
  );

  const fileManager: FileManager = new FileManager("students.json");
  fileManager.setFilePath("students.json");

  const students = fileManager.readFile();
  students.push(newStudent);
  fileManager.writeFile(students);

  console.log(newStudent);

  return newStudent;
}

const newStudent: Student = new Student(
  '3',
  'Laura',
  'laura@gmail',
  moment('07/02/1991', 'DD/MM/YYYY'),
  ['Correr', 'Nadar']
)

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
    addTeacherToMission(process.argv[3], process.argv[4])
    break;  
  case "getAgeById":
    const students=ReadStudentsFile()
    newStudent.getAgeById(students, process.argv[3]);
    console.log()
    break;
  default:
    console.log("Operação inválida");
    break;
}

/* Criando nova turma INTEGRAL e adicionando aluno */
let student: Student [] = []
let teacher: Teacher [] = []

const fm = new FileManager(
  "./mission.json"
)

const mission1: FullTimeMission = new FullTimeMission(
  "I01",
  moment("07/12/2019", "DD/MM/YYYY"),
  moment("14/05/2020", "DD/MM/YYYY"),
  teacher,
  student,
);

let b: any = mission1.setName("Mello-I")
let a: any = [...student, b]
student.push(fm.readFile())
student.push(a)
fm.writeFile(student)

/* Criando nova turma NOTURNA e adicionando aluno */
let studentNight: Student [] = []
let teacherNight: Teacher [] = []

studentNight.push(newStudent)

const mission2: NightMission = new NightMission(
  "N01",
  moment("22/12/2019", "DD/MM/YYYY"),
  moment("21/11/2020", "DD/MM/YYYY"),
  teacherNight,
  studentNight,
);

mission2.setName("Mello-N")
student.push(fm.readFile())
student.push(newStudent)
fm.writeFile(student)




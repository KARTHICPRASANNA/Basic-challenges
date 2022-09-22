const { values } = require("@laufire/utils/collection");

const markSheets=[ 
        {
            student: 'Sriram',
            rollNo: 11,
        },
        {
            student: 'Ram',
            rollNo: 16,            
        },
        {
            student: 'sri',
            rollNo: 18,
        },
        {
            student: 'mani',
            rollNo: 20,
        },
        {
            student: 'Prasanna',
            rollNo: 22,
        },
        {
            student: 'balaji',
            rollNo: 24,
        },
    ] 

const studentMarks = {
    '11':{
        tamil: 80,
        english: 90,
        science: 86,
        maths: 97,
        social: 76
    },
    '16':{
        tamil: 60,
        english: 97,
        science: 100,
        maths: 34,
        social: 100
    },
    '18':{
        tamil: 60,
        english: 90,
        science: 66,
        maths: 93, 
        social: 46,
    },
    '20':{
        tamil: 40,
        english: 70,
        science: 86,
        maths: 73,
        social: 86,
    },
    '22':{
        tamil: 50,
        english: 60,
        science: 80,
        maths: 83,
        social: 96,
    },
    '24':{
        tamil: 55,
        english: 65,
        science: 70,
        maths: 80,
        social: 99,
    },
}
const getTotal=(marks)=> values(marks).reduce((a,b) =>a+b,0);

const minMark=35;
const getResult=(marks)=> Math.min(...values(marks)) > minMark ? "Pass" : "Fail";

const getStudentDetails=(markSheet)=>{
return ({...markSheet,
       ...studentMarks[markSheet.rollNo],
       total:getTotal(studentMarks[markSheet.rollNo]),
       result:getResult(studentMarks[markSheet.rollNo])
});
}

const count=(a,b)=>
    b.result === "Pass" ? {pass:a.pass+1} : {fail:a.fail+1};

const getCount=(StudentRecords)=>StudentRecords.reduce((a,b)=>({...a,...count(a,b)}),{pass:0,fail:0});

const processMarkSheet=()=> {
    const studentData=markSheets.map(getStudentDetails);
    let rank=0;
    const finalMarkSheet=studentData.map((markSheet,index,array)=> ({
       ...markSheet,
       rank:markSheet.result ==='Pass' 
  ? array.filter((item) => item.total > markSheet.total && item.result !== 'Fail').length+1
    : '-',}));
  const sortedRecords=finalMarkSheet.sort((a,b)=>a.rank-b.rank);
    return finalMarkSheet;
}

const main=()=> {
const StudentRecords=processMarkSheet();
const Count=getCount(StudentRecords);
return {
    ...StudentRecords,
    Count,
}
}
console.table(main());
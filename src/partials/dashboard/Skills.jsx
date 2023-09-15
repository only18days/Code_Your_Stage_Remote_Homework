/* eslint-disable no-shadow */
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Import utilities
import { useCookies } from "react-cookie";
import { tailwindConfig } from "../../utils/Utils";


// import { skills } from "../../data/mockData";
import useSkills from "../../hooks/dashboard/useSkills";
import { useState, useRef, useEffect } from "react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Skills() {
  const [cookies] = useCookies(["studentId"]);
  const { studentId } = cookies;
  // console.log('student ID', studentId)
  // const studentId = "B11000000";
  async function getValue(studentId) {
    const response = await useSkills(studentId);
    // response.then((v) => (console.log('response.then',v)))
    return response;
  }
  // getValue(studentId).then(values => console.log("value", values[0]));
  // const response = useSkills(studentId);
  // let newSkills = 0;
  // Promise.all([response]).then((values) => {
  //   console.log('values',values);
  //   const newSkills = values;
  // });
  // const newValue = getValue(studentId);
  // console.log('newValue',newValue);
  
  const [allvalue, setAllvalue] = useState();
  // const { labels, values } = skills;
  // console.log('skills',skills);
  const { newLabels, newValues } =  getValue(studentId).then(values => setAllvalue([Object.keys(values), Object.values(values)]));
  // console.log(newLabels, newValues);

  // if (allvalue!==undefined) {console.log('vvv', allvalue[0])};
  
  const labels = (allvalue!==undefined)?(allvalue[0]):([
    "UIUX",
    "backend",
    "business analysis",
    "design thinking",
    "frontend"
  ]);
  const values = (allvalue!==undefined)?(allvalue[1]):([0, 0, 0, 0, 0]);
  console.log('values', values)
  
  const chartData = {
    labels,
    datasets: [
      {
        label: "能力值",
        data: values,
        backgroundColor: tailwindConfig().theme.colors.orange[500],
        borderColor: tailwindConfig().theme.colors.orange[500],
        borderWidth: 2
      }
    ]
  };

  // return (
  //   <div className="flex">
  //     <header className="">
  //       <h2 className="font-semibold text-slate-800 dark:text-slate-100">
  //         Skills
  //       </h2>
  //     </header>
  //     {studentId ? (
  //       <div className="flex align-center flex-col px-28">
  //         <div className="text-center my-4">學號：{studentId}</div>
  //         <Radar data={chartData} />
  //       </div>
  //     ) : (
  //       <div className="pt-20 text-center">尚未輸入數值，請先送出右方表單</div>
  //     )}
  //   </div>
  // );
  return (
    <div className="flex flex-col col-span-12 sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="block font-semibold text-slate-800 dark:text-slate-100">
          Skills
        </h2>
      </header>  
      
      {studentId ? (
        <div className="flex align-center flex-col px-28">
          <div className="text-center my-4">學號：{studentId}</div>
          <Radar data={chartData} />
        </div>
      ) : (
        <div className="pt-20 text-center">尚未輸入數值，請先送出右方表單</div>
      )}
    </div>
  );

  
}

export default Skills;

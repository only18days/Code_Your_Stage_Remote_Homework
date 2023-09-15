/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import DoughnutChart from "../../charts/DoughnutChart";
// import { academyStats } from "../../data/mockData";
import useAcademystats from "../../hooks/dashboard/useAcademystats";

function Academy() {
  const { labels, values } = useAcademystats();
  const rawData = { labels, values };
  // console.log("raw",rawData)
  // const { labels, values } = academyStats;

  // Grouping function 
  const studentsTotal = (rawData.labels !== undefined) ? rawData.labels.length : ''; // 如果問號前的判斷式結果為true，則會等於冒號前的東西；反之，等於冒號後的東西。
  // console.log('out',studentsTotal);
  const groupDep = (rawData, studentsTotal) => {
    // console.log('in',rawData);  
    let group = [
      {
        label: "理學院",
        value: 0
      },
      {
        label: "醫學院",
        value: 0
      },
      {
        label: "電資學院",
        value: 0
      }, {
        label: "創新設計學院",
        value: 0
      }, {
        label: "生農學院",
        value: 0
      }, {
        label: "社科院",
        value: 0
      }, {
        label: "法學院",
        value: 0
      }, {
        label: "工學院",
        value: 0
      }, {
        label: "管理學院",
        value: 0
      }, {
        label: "文學院",
        value: 0
      }
    ];
    for (let i = 0; i < studentsTotal; i += 1) {
      // console.log(i, rawData[i]);
      const labelPrefix = rawData.labels[i].split("").slice(0, 3).join("");
      // console.log(labelPrefix)
      if (labelPrefix === "心理所" || labelPrefix === "數學系" || labelPrefix === "物理學" || labelPrefix === "心理學") {
        for (let j = 0; j < group.length; j += 1) {
          if (group[j].label === "理學院") {
            group[j].value += 1;
            // break;
          }
        };
      } else if (labelPrefix === "物理治" || labelPrefix === "醫學工" || labelPrefix === "生醫電") {
        for (let j = 0; j < group.length; j += 1) {
          if (group[j].label === "醫學院") {
            group[j].value += 1;
            // break;
          }
        };
      } else if (labelPrefix === "電機工" || labelPrefix === "資訊工") {
        for (let j = 0; j < group.length; j += 1) {
          if (group[j].label === "電資學院") {
            group[j].value += 1;
            // break;
          }
        };
      } else if (labelPrefix === "創新領") {
        for (let j = 0; j < group.length; j += 1) {
          if (group[j].label === "創新設計學院") {
            group[j].value += 1;
            // break;
          }
        };
      } else if (labelPrefix === "生物機") {
        for (let j = 0; j < group.length; j += 1) {
          if (group[j].label === "生農學院") {
            group[j].value += 1;
            // break;
          }
        };
      } else if (labelPrefix === "經濟學" || labelPrefix === "經濟系") {
        for (let j = 0; j < group.length; j += 1) {
          if (group[j].label === "社科院") {
            group[j].value += 1;
            // break;
          }
        };
      } else if (labelPrefix === "科際整") {
        for (let j = 0; j < group.length; j += 1) {
          if (group[j].label === "法學院") {
            group[j].value += 1;
            // break;
          }
        };
      } else if (labelPrefix === "材料科" || labelPrefix === "工程科") {
        for (let j = 0; j < group.length; j += 1) {
          if (group[j].label === "工學院") {
            group[j].value += 1;
            // break;
          }
        };
      } else if (labelPrefix === "工商管" || labelPrefix === "國際企" || labelPrefix === "資訊管" || labelPrefix === "會計學") {
        for (let j = 0; j < group.length; j += 1) {
          if (group[j].label === "管理學院") {
            group[j].value += 1;
            // break;
          }
        };
      } else if (labelPrefix === "戲劇學" || labelPrefix === "歷史學" || labelPrefix === "外國語") {
        for (let j = 0; j < group.length; j += 1) {
          if (group[j].label === "文學院") {
            // console.log("文學院");
            group[j].value += 1;
            // break;
          }
        };
      }else{
        console.log("Failed to enter grouping loop.");
      }
    }
    return group;
  };


  const newData = groupDep(rawData, studentsTotal)
  // console.log("Grouping output", newData);

  const valueArray = newData.map(item => item.value);
  // console.log('valueArray',valueArray);

  const labelArray = newData.map(item => item.label);
  // console.log('labelArray',labelArray);

  const dataDict = {
    labels: labelArray,
    values: valueArray
  };
  // console.log('dataDict', dataDict);


  // 生成隨機色碼的函式
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Original code of chart data
  // const chartData = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Distribution of colleges",
  //       data: values,
  //       backgroundColor: values?.map(() => getRandomColor()),
  //       borderWidth: 0
  //     }
  //   ]
  // };
  const newLabel = dataDict.labels;
  const chartData = {
    labels: newLabel,
    datasets: [
      {
        label: "Distribution of colleges",
        data: dataDict.values,
        backgroundColor: dataDict.values?.map(() => getRandomColor()),
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="flex flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Distribution of colleges
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {labels && <DoughnutChart data={chartData} width={389} height={260} />}
    </div>
  );
}

export default Academy;

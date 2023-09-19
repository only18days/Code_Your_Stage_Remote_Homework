import axios from "axios";
import { useCookies } from "react-cookie";
import useSWRFetch from "../useSWRFetch";

const usePostSkills = () => {
  const [, setCookie] = useCookies(["studentId"]);
  return async (studentId, skills) => {
    // console.log(skills);
    try {
      // await axios.post(`https://api.projectszero.tech/skills/${studentId}`, {
      //   skill: skills,
      //   // thisIsDefinitelyWrong: true
      // });
      await axios.post(`https://api.projectszero.tech/skills/${studentId}`, skills);
      setCookie("studentId", studentId);
      // console.log('studentId',studentId)
      alert("送出成功");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
};

export default usePostSkills;

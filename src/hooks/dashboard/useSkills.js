/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import axios from "axios";
// import { useCookies } from "react-cookie";

const useSkills = (studentId) => {

  // const [cookies, setCookie] = useCookies(["studentId"]);
  // console.log('useSkills',cookies, setCookie);
  // finish it by yourself


  async function getUser() {
    try {
      const response = await axios.get(
        `https://api.projectszero.tech/skills/${studentId}`
      );
      // console.log('useSkills',response);
  
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  return getUser();

  // async function getUser() {
  //   return fetch(`https://api.projectszero.tech/skills/${studentId}`, {
  //       method: 'GET',
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const value = JSON.parse(data);
  //       console.log('value',value);
  //       return value;
  //     })
  // }
};

export default useSkills;

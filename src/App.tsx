import "./styles.css";
import arrow from "./assets/arrow.png";
// import heartNotFilled from "./assets/heartNotFilled.png";
// import heartFilled from "./assets/heartFilled.png";
// import logo from "./assets/logo.jpg";
import Text from "./Text.tsx";
import Button from "./Button.tsx";
import data from "./assets/dummyData.json";
import { useImmer } from 'use-immer'
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import React from "react";
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)

export default function SearchResults() {
  const [resultData, setResultData] = useImmer(() => {
    const initialState: any = {};
    for (const result of data) {
      initialState[result.id] = {
        height: 155,
        classes: "visible",
        arrowDirection: 0,
      };
    }
    return initialState;
  });
  // const [heartImage, setHeartImage] = useState(heartNotFilled);

  // function changeHeart() {
  //   if (heartImage === heartNotFilled) {
  //     setHeartImage(heartFilled);
  //   } else {
  //     setHeartImage(heartNotFilled);
  //   }
  // }
  function grow(id: number) {
    setResultData((draft:any) => {
      draft[id]["height"] += 3;
      if (draft[id]["height"] > 300) {
        clearInterval(intervalId);
        draft[id]["arrowDirection"] = 180;
      }
      if(draft[id]["height"] > 250) {
        draft[id]["classes"] = "";
      }
    });
  }

  function shrink(id: number) {
    setResultData((draft: any) => {
      draft[id]["height"] -= 3;
      if (draft[id]["height"] < 155) {
        clearInterval(intervalId);
      }
      if(draft[id]["height"] < 250) {
        draft[id]["classes"] = "visible";
        draft[id]["arrowDirection"] = 0;
      }
    });
  }

  let intervalId: ReturnType<typeof setInterval>;

  function expand(id: number) {
    clearInterval(intervalId);
    if (resultData[id]["height"] < 300) {
      intervalId = setInterval(() => grow(id), 5);
    } else {
      intervalId = setInterval(() => shrink(id), 5);
    }
  }

  const results:any = [];
  for(let result of data) {
    let locType = "Location Availibility: " + result.locType[0].charAt(0).toUpperCase() + result.locType[0].slice(1);
    for(let i = 1; i < result.locType.length; i++) {
      locType += ", " + result.locType[i].charAt(0).toUpperCase() + result.locType[i].slice(1);
    }
    let causes = "Causes: " + result.causes[0].charAt(0).toUpperCase() + result.causes[0].slice(1);
    for(let i = 1; i < result.causes.length; i++) {
      causes += ", " + result.causes[i].charAt(0).toUpperCase() + result.causes[i].slice(1);
    }
    let skills = "Skills: " + result.skills[0].charAt(0).toUpperCase() + result.skills[0].slice(1);
    for(let i = 1; i < result.skills.length; i++) {
      skills += ", " + result.skills[i].charAt(0).toUpperCase() + result.skills[i].slice(1);
    }
    const timeStart = dayjs(result.timeStart).format("dddd, MMMM Do YYYY h:mmA").toString();
    const timeFinish = dayjs(result.timeFinish).format("dddd, MMMM Do YYYY h:mmA").toString();
    results.push(
      <div style={{height: resultData[result.id]["height"]}} className="box" key={result.id}>
        <Text id="header" text={result.organization}/>
        <Text id="locType" text={locType}/>
        <Text id="causes" text={causes}/>
        <Text id="date/time" className="css-fix" text={"Date/Time: " + timeStart + "-\n\t\t  " + timeFinish}/>
        <Text id="skills" text={skills}/>
        <p className={resultData[result.id]["classes"]}><a id="link" href={result.link}>SCOUT this opportunity!</a></p>
        <Text id="eventName" className={resultData[result.id]["classes"]} text={"Event Name: " + result.eventName}/>
        <Text id="age" className={resultData[result.id]["classes"]} text={"Age Requirement:" + result.age}/>
        <Button buttonId="expandButton" buttonClass="whatever" imageName={arrow} buttonFunc={() => expand(result.id)} imageDirection={resultData[result.id]["arrowDirection"]}/>
        {/* <Button buttonId="heartButton" buttonClass="whatever" imageName={heartImage} buttonFunc={changeHeart} /> */}
      </div>
      
    );
  }

  return results;
}
import "./styles.css";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
// import heartNotFilled from "./assets/heartNotFilled.png";
// import heartFilled from "./assets/heartFilled.png";
// import logo from "./assets/logo.jpg";
import Text from "./components/Text.jsx";
import Button from '@mui/material/Button';
import data from "./assets/dummyData.json";
import { useImmer } from 'use-immer'
import dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import React from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)

export default function SearchResults() {
  const [resultData, setResultData] = useImmer(() => {
    const initialState: any = {};
    for (const result of data) {
      initialState[result.id] = {
        height: 155,
        classes: "visible",
        arrow: <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>,
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
        draft[id]["arrow"] = <ArrowDropDownOutlinedIcon style={{transform: "rotate(180deg)"}}></ArrowDropDownOutlinedIcon>;
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
        draft[id]["arrow"] = <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>;
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
  function loadResults(start: number, number: number) {
    for(let i = start; i < start + number && results.length !== Object.keys(data).length; i++) {
      let result = data[i];
      let causes = "Causes: " + result.causes[0].charAt(0).toUpperCase() + result.causes[0].slice(1);
      for(let i = 1; i < result.causes.length; i++) {
        causes += ", " + result.causes[i].charAt(0).toUpperCase() + result.causes[i].slice(1);
      }
      let skills = "Skills: " + result.skills[0].charAt(0).toUpperCase() + result.skills[0].slice(1);
      for(let i = 1; i < result.skills.length; i++) {
        skills += ", " + result.skills[i].charAt(0).toUpperCase() + result.skills[i].slice(1);
      }
      const timeStart = result.timeStart !== null ? dayjs(result.timeStart).format("dddd, MMMM Do YYYY h:mmA").toString() : "";
      const timeFinish = result.timeFinish !== null ? dayjs(result.timeFinish).format("dddd, MMMM Do YYYY h:mmA").toString(): "";
      const eventName = result.eventName !== null ? "Event Name: " + result.eventName : "";
      let address = ""
      if(result.locType.includes("inperson")) {
        address = "Address: "+ result.streetAddress + ", " + result.city + ", " + result.state + " " + result.zip;
      }
      const time = (timeFinish !== "" && timeStart !== "") ? timeStart + "-\n\t\t  " + timeFinish : "Flexible Dates";
      results.push(
        <div style={{height: resultData[result.id]["height"]}} className="box" key={result.id}>
          <Text id="header" text={result.organization}/>
          {result.locType.map((locType: string) => (
            <Text id="locType" text={" "+locType.substring(0, 1).toUpperCase() + locType.substring(1) + " "}/>
          ))}
          <Text id="address" text={address}/>
          <Text id="causes" text={causes}/>
          <Text id="date/time" className="css-fix" text={"Date/Time: " + time}/>
          
          <Text id="skills" text={skills}/>
          <p className={resultData[result.id]["classes"]}><a id="link" href={result.link}>SCOUT this opportunity!</a></p>
          <Text id="eventName" className={resultData[result.id]["classes"]} text={eventName}/>
          <Text id="age" className={resultData[result.id]["classes"]} text={"Age Requirement: " + result.age}/>
          <Button style={{position: "absolute", left: "45%", color: "black", bottom: "5%", textTransform: "none"}} onClick={() => expand(result.id)}>
            {"More"}
            {resultData[result.id]["arrow"]}
          </Button>
          <Text id="description" className={resultData[result.id]["classes"]} text={"Description: " + result.description}/>
          {/* <Button buttonId="heartButton" buttonClass="whatever" imageName={heartImage} buttonFunc={changeHeart} /> */}
        </div>
        
      );
    }
  }

  loadResults(0, 15);

  return(<div>
  <InfiniteScroll
    dataLength={results.length}
    next={() => {}}
    hasMore={results.length < Object.keys(data).length} // Replace with a condition based on your data source
    loader={<p></p>}
    endMessage={<p>No more data to load.</p>}
  >
    {results}
  </InfiniteScroll>
  </div>);
}
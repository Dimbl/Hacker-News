import * as React from "react";
import { observer } from "mobx-react-lite";
import NewsStorys from "./NewsStorys";
import { Routes, Route, Link } from "react-router-dom";
import { dateFormat } from "./dateFormat";

export const NewStories = observer(() => {
  return NewsStorys.NewsStory.map((value) => {
    return (
      <li
        style={{
          margin: "20px 0",
          color: "black",
        }}
      >
        <Link
          to={`/PageNew/${value?.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h4 style={{ marginBottom: "6px" }}>{value?.title}</h4>
          <span
            style={{
              fontSize: "medium",
              color: "#A9A9A9",
            }}
          >
            {value?.score} points by {value?.by} {dateFormat(value?.time)}
          </span>
        </Link>
      </li>
    );
  });
});

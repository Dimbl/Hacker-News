import { Button } from "antd";
import NewsStorys from "./NewsStorys";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { dateFormat } from "./dateFormat";

export const PageNew = (props: any) => {
  const { id } = useParams();
  const [story, setStory] = useState<any>({});
  const [comments, setComments] = useState<any>([]);
  const [commentsKidsArray, setCommentsKidsArray] = useState<any>([]);
  const [commentsKids, setCommentsKids] = useState<any>([]);
  const [commentsKidsSwitcher, setCommentsKidsSwitcher] = useState(false);

  useEffect(() => {
    reqestPost();
  }, []);

  useEffect(() => {
    newCommentsTimeout();
  }, [story?.descendants]);

  useEffect(() => {
    newCommentsKids();
  }, [commentsKidsSwitcher]);

  const reqestPost = () => {
    let Story;
    for (let i = 0; i < NewsStorys.NewsStory.length; i++) {
      if (NewsStorys.NewsStory[i].id == id) {
        Story = JSON.parse(JSON.stringify(NewsStorys.NewsStory[i]));
      }
    }
    setStory(Story);
  };

  const newComments = () => {
    const newArray = story.kids.map((value: any) => {
      return fetch(
        "https://hacker-news.firebaseio.com/v0/item/" +
          value +
          ".json?print=pretty"
      )
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
    Promise.all(newArray).then((value) => {
      const newArray2 = JSON.parse(JSON.stringify(value));
      setComments(newArray2);
      console.log(comments);
    });
    console.log("Обновили список комментариев");
  };

  const newCommentsTimeout = () => {
    setTimeout(() => {
      if (story?.descendants > 0) {
        newComments();
      }
    }, 2000);
  };

  const newCommentsKids = () => {
    const newArrayKids = commentsKidsArray.map((value: any) => {
      return fetch(
        "https://hacker-news.firebaseio.com/v0/item/" +
          value +
          ".json?print=pretty"
      )
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
    Promise.all(newArrayKids).then((value) => {
      const newArrayKids2 = JSON.parse(JSON.stringify(value));
      setCommentsKids(newArrayKids2);
    });
    console.log("Обновили список комментариев под комментариями");
  };
const commentsKidsSwitch = () => {
  commentsKidsSwitcher === false
  ? setCommentsKidsSwitcher(true)
  : setCommentsKidsSwitcher(false);
}
  

  const updateNewComments = () => {
    fetch(
      "https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStory(data);
        if (data?.kids > 0) {
          newComments();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    console.log("Обновили список комментариев по кнопке");
  };

  const CommentsComment = (commentId: any) => {
    for (let i = 0; i < commentsKids.length; i++) {
      if (commentId == commentsKids[i].parent) {
        return (
          <div
            style={{
              backgroundColor: "#DCDCDC",
              borderRadius: "4px",
            }}
          >
            <p>
              by {commentsKids[i].by} {dateFormat(commentsKids[i].time)}
            </p>
            {commentsKids[i].text}
          </div>
        );
      }
    }
  };

  if (story == null) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexFlow: "column wrap",
      }}
    >
      <Button
        type="primary"
        style={{
          backgroundColor: "white",
          color: "black",
          zIndex: "2",
          position: "fixed",
          top: "14px",
          left: "50px",
        }}
        onClick={updateNewComments}
      >
        Refresh
      </Button>
      <Link to="/">
        <Button
          type="primary"
          style={{
            backgroundColor: "#ff6600",
            color: "white",
            position: "relative",
            top: "-10px",
          }}
        >
          Back
        </Button>
      </Link>
      <h1
        style={{
          marginBottom: "10px",
        }}
      >
        {story?.title}
      </h1>
      <span
        style={{
          marginBottom: "10px",
        }}
      >
        by {story?.by} {dateFormat(story?.time)}
      </span>
      <a
        href={`${story?.url}`}
        style={{
          marginBottom: "10px",
        }}
      >
        Link to news
      </a>
      <span
        style={{
          marginBottom: "10px",
        }}
      >
        Comments: {story.descendants}
      </span>
      <span
        style={{
          marginBottom: "10px",
        }}
      >
        List of comments: <br />
      </span>
      {story.descendants > 0
        ? comments.map((value: any) => {
            return (
              <span
                style={{
                  marginBottom: "10px",
                  maxWidth: "500px",
                  backgroundColor: "#D3D3D3",
                  borderRadius: "4px",
                  wordBreak: "break-all",
                }}
              >
                <p>
                  by {value?.by} {dateFormat(value?.time)}
                </p>
                {value?.dead == true ? (
                  <p style={{ color: "red" }}>Removed</p>
                ) : (
                  value?.text
                )}
                {value?.kids > 0 ? (
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "inline-block",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontWeight: "bold",
                    }}
                    onClick={commentsKidsSwitch}
                  >
                    Show next comments:{" "}
                    <div style={{ display: "none" }}>
                      {commentsKidsArray.push(value.kids)}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {commentsKids !== 0 && commentsKidsSwitcher == true
                  ? CommentsComment(value.id)
                  : ""}
              </span>
            );
          })
        : "No comments"}
    </div>
  );
};

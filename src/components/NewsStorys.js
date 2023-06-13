import { makeAutoObservable } from "mobx";

class NewsStorys {
  constructor() {
    makeAutoObservable(this);
  }

  NewsStory = [];

  newStoiesReqest = () => {
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const reqestNewStoriesArray = data;
        const reqestNewStoriesArray100 = reqestNewStoriesArray.slice(0, 100);
        const newArray = reqestNewStoriesArray100.map((value) => {
          return fetch(
            "https://hacker-news.firebaseio.com/v0/item/" +
              value +
              ".json?print=pretty"
          ).then((response) => {
            return response.json();
          });
        });
        Promise.all(newArray).then((value) => {
          const newArray2 = value;
          newArray2.sort((a, b) => (a?.time > b?.time ? -1 : 1));
          this.NewsStory = newArray2;
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
    console.log("Обновили список новостей");
  };
}

export default new NewsStorys();

import React, { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  // request loading
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);

  //error
  const [error, setError] = useState({ show: false, msg: " " });

  const searchGithubUser = async (user) => {
    toggleError();
    setLoading(true);
    const res = await axios(`${rootUrl}/users/${user}`).catch((e) =>
      console.log(e)
    );
    // console.log(res);

    if (res) {
      setGithubUser(res.data);
      const { login, followers_url } = res.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((e) => console.log(e));

      // (https://api.github.com/users/chait04/repos?per_page=100)
      // - [Followers](https://api.github.com/users/john-smilega/followers)
    } else {
      toggleError(true, "There is ano user with that name");
    }
    checkRequests();
    setLoading(false);
  };

  // check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining }, //destucturing is happening here
        } = data;
        setRequests(remaining);
        if (remaining == 0) {
          //throw an error
          toggleError(
            true,
            "sorry you , messed up I already told u buddy only 60 req"
          );
        }
      })
      .catch((e) => console.log(e));
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  useEffect(checkRequests, []);
  // //error
  // useEffect(
  //   () => {
  //   const checkRequests = () => {
  //     axios(`${rootUrl}/rate_limit`)
  //       .then(({ data }) => {
  //         let {
  //           rate: { remaining }, //destucturing is happening here
  //         } = data;
  //         setRequests(remaining);
  //         if (remaining == 0) {
  //           //throw an error
  //           toggleError(
  //             true,
  //             "sorry you , messed up I already told u buddy only 60 req"
  //           );
  //         }
  //       })
  //       .catch((e) => console.log(e));
  //   };

  //   checkRequests();
  // }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };

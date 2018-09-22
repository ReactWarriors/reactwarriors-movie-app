import React from "react";
import { API_URL, API_KEY_3 } from "../../../api/api";

// `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
// `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`
// `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY_3}`

export default class Login extends React.Component {
  sendPromises = () => {
    // добавить async перед () для использования async/await
    // 1
    // const getRequestToken = () => {
    //   return new Promise((resolve, reject) => {
    //     fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //       .then(response => {
    //         if (response.status < 400) {
    //           return response.json();
    //         } else {
    //           throw response;
    //         }
    //       })
    //       .then(data => {
    //         resolve(data);
    //       })
    //       .catch(response => {
    //         response.json().then(error => {
    //           reject(error);
    //         });
    //       });
    //   });
    // };
    // 2
    // const validateWithLogin = body => {
    //   return new Promise((resolve, reject) => {
    //     fetch(
    //       `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //       {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //           "Content-type": "application/json"
    //         },
    //         body: JSON.stringify(body)
    //       }
    //     )
    //       .then(response => {
    //         if (response.status < 400) {
    //           return response.json();
    //         } else {
    //           throw response;
    //         }
    //       })
    //       .then(data => {
    //         resolve(data);
    //       })
    //       .catch(response => {
    //         response.json().then(error => {
    //           reject(error);
    //         });
    //       });
    //   });
    // };
    const fetchApi = (url, options = {}) => {
      return new Promise((resolve, reject) => {
        fetch(url, options)
          .then(response => {
            if (response.status < 400) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then(data => {
            resolve(data);
          })
          .catch(response => {
            response.json().then(error => {
              reject(error);
            });
          });
      });
    };
    // цепочка промисов
    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: "evgeniypodgaetskiy",
              password: "temp1992",
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        console.log("session", data);
      })
      .catch(error => {
        console.log("error", error);
      });
    // async await
    // try {
    //   const data = await fetchApi(
    //     `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
    //   );
    //   const result = await fetchApi(
    //     `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //     {
    //       method: "POST",
    //       mode: "cors",
    //       headers: {
    //         "Content-type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         username: "evgeniypodgaetskiy",
    //         password: "temp199",
    //         request_token: data.request_token
    //       })
    //     }
    //   );
    //   const { session_id } = await fetchApi(
    //     `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //     {
    //       method: "POST",
    //       mode: "cors",
    //       headers: {
    //         "Content-type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         request_token: result.request_token
    //       })
    //     }
    //   );
    //   console.log(session_id);
    // } catch (error) {
    //   console.log("error", error);
    // }

    // цепочка без промисов
    // fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     // 2
    //     fetch(
    //       `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //       {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //           "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //           username: "evgeniypodgaetskiy",
    //           password: "temp1992",
    //           request_token: data.request_token
    //         })
    //       }
    //     )
    //       .then(response => response.json())
    //       .then(data => {
    //         // 3
    //         fetch(
    //           `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //           {
    //             method: "POST",
    //             mode: "cors",
    //             headers: {
    //               "Content-type": "application/json"
    //             },
    //             body: JSON.stringify({
    //               request_token: data.request_token
    //             })
    //           }
    //         )
    //           .then(response => response.json())
    //           .then(data => {
    //             console.log("session", data);
    //           });
    //       });
    //   });
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.sendPromises}
        >
          Login
        </button>
      </div>
    );
  }
}

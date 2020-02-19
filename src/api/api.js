import queryString from "querystring";

export const API_URL = "https://api.themoviedb.org/3";
export const API_KEY_3 = "9258dd3835d9228bb19ea200738eb794";
export const API_KEY_4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjU4ZGQzODM1ZDkyMjhiYjE5ZWEyMDA3MzhlYjc5NCIsInN1YiI6IjVkZjM1ZGI0ZDFhODkzMDAxOTczMTEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V6CpNNSBCJk6hsgop1he8K_m8VS4Lrn7FU0aB9BP2ls";

export const fetchApi = (url, options = {}) => {
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
export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  }

  static post(url, options) {
    const { params = {}, body } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };

    return fetchApi(`${API_URL}${url}?${queryString.stringify(
      queryStringParams
    )}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body)
      }
    );

  }

  static delete(url, options) {
    const { params = {}, body } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };

    return fetchApi(`${API_URL}${url}?${queryString.stringify(
      queryStringParams
    )}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body)
      }
    );
  }

}
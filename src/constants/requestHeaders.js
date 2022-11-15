// export function getHeaders() {
//     const headers = {
//         headers: {
//             SessionId: JSON.parse(sessionStorage.getItem('user')).sessionId,
//             UserId: JSON.parse(sessionStorage.getItem('user')).userId
//         }
//     };
//     return headers;
// }


export function getHeaders() {

    const headers = {
      headers: {
        "Content-type": "application/json",
        UserId: `${JSON.parse(sessionStorage.getItem("user")).userId}`,
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    };
    return headers;
  }
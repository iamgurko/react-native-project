//API İzlemek için kullanılır

const apiTrace = response => {
  response.ok
    ? console.log(
        '%c API_RESPONSE! %c' + response.config.url,
      )
    : console.log(
        '%c API_RESPONSE! %c' + response.config.url,
      );
  console.log(response.data);
};

export default apiTrace;

export default function request(url, callback) {
  const method = "get";
  const request = new XMLHttpRequest();
  request.open(method, url, true);
  request.setRequestHeader("Accept-Language", "ja,ja-JP");
  request.onload = () => {
    const result = JSON.parse(request.response);
    if (request.status < 200 || request.status >= 300) {
      throw result.error;
    }
    callback(result);
  };
  request.send();
}

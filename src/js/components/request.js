export class Request {
  constructor(host) {
    this.host = host;
  }

  async sendRequest(method, callback = () => {}, body = false) {
    const response = fetch(this.host + "createuser/", {
      method: method,
      headers: {
        // 'Content-Type': 'multipart/form-data'
      },
      body: body,
    });
    callback(await response);
  }
}

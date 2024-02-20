import client from "./client/client";

export default async function call(requestType, url, data = null) {
  return client[requestType](url, data);
}

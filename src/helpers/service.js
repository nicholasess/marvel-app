import ajax from "@fdaciuk/ajax";
import CryptoJS from "crypto-js";
export default async setUrl => {
  const PUBLIC_KEY = "091d3e74938e9ec1aeb9fc2b34b6dd11";
  const PRIV_KEY = "207133b1dd33c36ad43785181625d113516a4573";

  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

  var url = `/${setUrl}?apikey=${PUBLIC_KEY}&hash=${hash}&ts=${ts}`;

  var request = ajax({ baseUrl: "http://gateway.marvel.com:80/v1/public" });

  return request.get(url);
};

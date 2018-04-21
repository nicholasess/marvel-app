import ajax from "@fdaciuk/ajax";
import CryptoJS from "crypto-js";
import Key from "./key";

const request = ajax({ baseUrl: "http://gateway.marvel.com:80/v1/public" });

const getHash = ts => CryptoJS.MD5(ts + Key.private + Key.public).toString();
const getTs = () => new Date().getTime();

const get = async setUrl => {
  const ts = getTs();
  var url = `/${setUrl}?apikey=${Key.public}&hash=${getHash(ts)}&ts=${ts}`;

  return request.get(url);
};

export default { get };

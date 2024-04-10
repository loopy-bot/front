import createRequest from "./requestFactory/createRequest";
import createGetBaseUrl from "./requestFactory/createBaseUrl";
// import createDownload from "./requestFactory/createDownload";
const hosts = {
	DEV: "http://127.0.0.1:4433",
	UAT: "http://127.0.0.1:4433",
	PRO: "http://127.0.0.1:4433",
};

const getBaseUrl = createGetBaseUrl(hosts);
const request = createRequest(getBaseUrl);

export { getBaseUrl, request };

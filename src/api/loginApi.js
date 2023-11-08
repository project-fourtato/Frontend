import axios from "axios";

const BASEURL = "http://3.35.179.234:8080";

const schedulesDataApi = {
  getSchedule: async (scheduleId) => {
    const data = axios.get(`${BASEURL}/api/schedules/${scheduleId}`);
    return data;
  },
};

export default schedulesDataApi;

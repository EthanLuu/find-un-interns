import axios from "axios";
export default defineEventHandler(async (event) => {
    const fetchUrl = `${process.env.BASE_URL}/latest`;
    const response = await axios.get(fetchUrl);
    const { data } = response;
    return data;
});

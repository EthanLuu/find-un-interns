import axios from "axios";
export default async () => {
    const fetchUrl = `${process.env.BASE_URL}/statistics`;
    const response = await axios.get(fetchUrl);
    const { data } = response;
    return data;
};

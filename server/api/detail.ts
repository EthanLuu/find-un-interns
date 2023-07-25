import axios from "axios";
export default async (id: string) => {
    const fetchUrl = `${process.env.BASE_URL}/detail/${id}`;
    const response = await axios.get(fetchUrl);
    const { data } = response;
    return data;
};

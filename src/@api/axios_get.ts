import axios from "axios";
import { GET_METHOD, GET_METHOD_ERROR } from "./method_constant";
import { toast } from "sonner";

function axiosGet<TParams, TRes>(
  method: keyof typeof GET_METHOD,
  params?: TParams
): Promise<TRes> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + GET_METHOD[method],
        { params: params }
      );
      resolve(response.data);
    } catch (error) {
      toast(GET_METHOD_ERROR[method]);
      reject(error);
    }
  });
}

export default axiosGet;

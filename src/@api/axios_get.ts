import axios from "axios";
import { GET_METHOD, GET_METHOD_ERROR } from "./method_constant";
import { toast } from "sonner";
import { useGlobalStore } from "../zustand/globalStore";

const isLocal = import.meta.env.local || window.location.hostname === "localhost";

function axiosGet<TParams, TRes>(
  method: keyof typeof GET_METHOD,
  params?: TParams
): Promise<TRes> {
  return new Promise(async (resolve, reject) => {
    const { setIsLoading } = useGlobalStore.getState();
    setIsLoading(true);
    try {
      const response = await axios.get(isLocal ? GET_METHOD[method] : import.meta.env.VITE_BASE_URL +  GET_METHOD[method], { params: params });
      resolve(response.data);
    } catch (error) {
      toast.error(GET_METHOD_ERROR[method]);
      reject(error);
    } finally {
      setIsLoading(false);
    }
  });
}

export default axiosGet;

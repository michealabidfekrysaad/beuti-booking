import { LocaleContext } from "config/Contexts/LocalizationContext/LanguageProvider";
import { UserContext } from "config/providers/UserProvider/UserProvider";
import { useContext } from "react";
import { useQuery } from "react-query";
import { axiosInstance } from "./AxiosConfig";

/**
 * @name name @Required @description  Should be Unique For each Api Call
 */
/**
 * @name method  @description The method For Api Call Should be one of ('post' , 'get' , 'put','delete')
 */
/**
 * @name query  @description set Params for request
 */
/**
 * @name url @Required @description the Api EndPoint
 */
/**
 * @name baseurl  @description to override the baseurl
 */
/**
 * /**
 * @name odata  @description set baseurl to data
 */
/**
 * from @name cacheTime To @name useErrorBoundary   @check https://react-query.tanstack.com/reference/useQuery
 */

export const CallAPI = ({
  name,
  method = "get",
  body,
  query,
  url,
  baseURL,
  headers,
  cacheTime,
  enabled = false,
  initialData,
  initialDataUpdatedAt,
  isDataEqual,
  keepPreviousData,
  meta,
  notifyOnChangeProps,
  notifyOnChangePropsExclusions,
  onError,
  onSettled,
  onSuccess,
  queryKeyHashFn,
  refetchInterval,
  refetchIntervalInBackground,
  refetchOnMount,
  refetchOnReconnect,
  refetchOnWindowFocus = false,
  retry,
  retryOnMount,
  retryDelay,
  select,
  staleTime,
  structuralSharing,
  suspense,
  useErrorBoundary,
}) => {
  const { User } = useContext(UserContext);
  const { locale: language } = useContext(LocaleContext);

  return useQuery(
    name,
    () =>
      axiosInstance({
        url,
        data: body,
        method,
        headers: {
          "Accept-Language": language === "ar" ? "ar-SA" : "en-US",
          Authorization: User.access_token_booking
            ? `Bearer ${User.access_token_booking}`
            : null,
          ...headers,
        },
        params: query,
        baseURL,
      }),
    {
      cacheTime,
      enabled,
      initialData,
      initialDataUpdatedAt,
      isDataEqual,
      keepPreviousData,
      meta,
      notifyOnChangeProps,
      notifyOnChangePropsExclusions,
      onError,
      onSettled,
      onSuccess,
      queryKeyHashFn,
      refetchInterval,
      refetchIntervalInBackground,
      refetchOnMount,
      refetchOnReconnect,
      refetchOnWindowFocus,
      retry,
      retryOnMount,
      retryDelay,
      select,
      staleTime,
      structuralSharing,
      suspense,
      useErrorBoundary,
    }
  );
};

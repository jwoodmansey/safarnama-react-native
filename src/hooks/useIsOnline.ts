import { useNetInfo } from "@react-native-community/netinfo";

const useIsOnline = () => {
  const info = useNetInfo();
  return info.isInternetReachable;
};

export default useIsOnline;

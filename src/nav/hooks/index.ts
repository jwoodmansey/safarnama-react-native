import {
  NavigationAction,
  RouteProp,
  useNavigation,
  usePreventRemove,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  DrawerStackNavigationProp,
  RootStackNavigationProp,
} from "../../types/nav/root";
import { MapNaviationProp } from "../../types/nav/map";
import { AddExperienceProp } from "../../types/nav/addExperience";

export const useRootStackNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackNavigationProp>>();

  return navigation;
};

export const useDrawerStackNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<DrawerStackNavigationProp>>();

  return navigation;
};

export const useDrawerStackRoute = () => {
  const navigation = useRoute<RouteProp<DrawerStackNavigationProp>>();

  return navigation;
};

export const useMapStackNavigation = () => {
  const navigation = useNavigation<StackNavigationProp<MapNaviationProp>>();

  return navigation;
};

export const useAddExperienceNavigation = () => {
  const navigation = useNavigation<StackNavigationProp<AddExperienceProp>>();

  return navigation;
};

export const usePreventRemoveScreen = (
  preventRemove: boolean,
  callback: (options: { data: { action: NavigationAction } }) => void
) => {
  const navigation = usePreventRemove(preventRemove, callback);
  return navigation;
};

import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {

    console.log(navigationRef.isReady(), name)

  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never);
  }
}
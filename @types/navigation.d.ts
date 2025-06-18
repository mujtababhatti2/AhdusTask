import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Auth?: NavigatorScreenParams<AuthParamsList>;
  Onboard?: NavigatorScreenParams<AuthParamsList>;
  Main?: NavigatorScreenParams<MainParamsList>;
  setupOrganization?: NavigatorScreenParams<setupOrganizationParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;

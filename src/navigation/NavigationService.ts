import { CommonActions } from '@react-navigation/native';

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
    _navigator = navigatorRef;
}

function navigate(routeName: string, params: any) {
    _navigator?.navigate(routeName, params);
}

function reset(routeName: string, params?: any ) {
    _navigator.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: routeName, params: params }],
        })
    );
}

function goBack() {
    _navigator.dispatch(CommonActions.goBack());
}

export default {
    navigate,
    setTopLevelNavigator,
    reset,
    goBack,
};

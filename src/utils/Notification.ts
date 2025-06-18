import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import NavigationService from '../navigation/NavigationService';
import notifee, { AndroidImportance } from '@notifee/react-native';


// we can ask user for permission two time behavious explained below,
// if user deny first time it give deinied if user again denied it gives never_ask_again
const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const request = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
            if (request === 'denied') {
                Alert.alert(
                    'Enable Notifications',
                    'To ensure you never miss important updates, please allow notifications for this app. Go to your device settings, find this app, and enable notifications.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );

            }
        } catch (error) {
            console.warn("warn from notification.ts", error)
        }
    }
};

export async function requestUserPermission() {
    checkApplicationPermission();
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        messaging().registerDeviceForRemoteMessages().then(() => {

        })
    }
}



export const NotificationListener = () => {

    console.log("first")

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );
        NavigationService.navigate('userFlow', {
            screen: 'containerList',
            params: {
                remoteMessage
            },
        });
    });

    messaging().getInitialNotification().then(async (remoteMessage: any) => {
        if (remoteMessage) {
            console.log(
                'Notification caused app to open from quit state:',
                remoteMessage,
            );
            NavigationService.navigate('userFlow', {
                screen: 'containerList',
                params: {
                    remoteMessage
                },
            });
        }
    });

    messaging().onMessage(
        async remoteMessage => {
            console.log("Foreground Notification State", remoteMessage);
            onDisplayNotification(remoteMessage)
            // NavigationService.navigate('containerList', remoteMessage?.data)
            // NavigationService.navigate('userFlow', {
            //     screen: 'containerList',
            //     params: {
            //         remoteMessage
            //     },
            // });
        }

    )
}

// export async function onDisplayNotification(data: any) {
//     // Request permissions (required for iOS)

//     if (Platform.OS == 'ios') {
//         await notifee.requestPermission()
//     }

//     // Create a channel (required for Android)
//     const channelId = await notifee.createChannel({
//         id: 'default',
//         name: 'Default Channel',
//         // sound: data?.data?.sound_name,
//         // badge:true,
//         importance: AndroidImportance.HIGH,
//     });

//     // Display a notification
//     await notifee.displayNotification({
//         title: data?.notification.title,
//         body: data?.notification.body,
//         android: {
//             channelId,
//             pressAction: {
//                 id: 'default',
//                 launchActivity: 'com.utradeinc.uexpress.MainActivity'
//             },
//             // badgeCount:3

//         },
//     });

// }

export async function onDisplayNotification(data: any) {
    // Request permissions (required for iOS)
    if (Platform.OS === 'ios') {
        await notifee.requestPermission();
    }

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
    });

    // Display a notification with accept and decline buttons
    await notifee.displayNotification({
        title: data?.notification.title,
        body: data?.notification.body,
        android: {
            channelId,
            pressAction: {
                id: 'default',
                launchActivity: 'com.utradeinc.MainActivity'
            },
            // actions: [
            //     {
            //         title: 'Accept',
            //         pressAction: {
            //             id: 'accept',
            //             launchActivity: 'com.utradeinc.AcceptActivity' // Launch activity for accepting
            //         },
            //     },
            //     {
            //         title: 'Decline',
            //         pressAction: {
            //             id: 'decline',
            //             launchActivity: 'com.utradeinc.DeclineActivity' // Launch activity for declining
            //         },
            //     },
            // ],
        },
    });
}

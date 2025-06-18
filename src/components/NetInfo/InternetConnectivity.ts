import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { showError, showSuccess } from '../../utils/HelperFuctions';
import React, { useEffect, useState } from 'react';

const InternetConnectionStatus: React.FC = () => {
    const [isConnected, setIsInternetReachable] = useState<boolean | null>(null);
    const [showingBackOnline, setShowingBackOnline] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(({ isConnected }: NetInfoState) => {
            if (!isConnected) {
                setIsInternetReachable(isConnected)
                setShowingBackOnline(true);
                return
            }
            if (isConnected) {
                setIsInternetReachable(isConnected)
                return
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (isConnected === null) return;

        if (!isConnected) {
            showError("No Internet Connection");
        } else if (showingBackOnline) {
            showSuccess("Back online");
        }
    }, [isConnected, showingBackOnline]);




    return null; // Since this is a status component, it doesn't render any visible UI
};

export default InternetConnectionStatus;

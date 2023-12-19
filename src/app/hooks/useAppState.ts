import {useAppSelector} from "app/hooks/useAppSelector";
import {isInitializedSelector, statusSelector} from "app/app-selectors";

export const useAppState = () => {
    const appStatus = useAppSelector(statusSelector)
    const isInitialized = useAppSelector(isInitializedSelector)

    return {appStatus, isInitialized}
}
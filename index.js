/**
 * @format
 */

import { Navigation } from "react-native-navigation";

import {RegisterScreen} from './app/component/RegisterScreen'

RegisterScreen()

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: "Login"
            }
        }
    })
})


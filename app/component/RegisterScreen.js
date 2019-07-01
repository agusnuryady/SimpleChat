import {Navigation} from 'react-native-navigation'
import App from '../../App'
import Login from '../login/login'
import Chats from '../chats/chats'

export function RegisterScreen() {
    Navigation.registerComponent('App', ()=> App)
    Navigation.registerComponent('Login', ()=> Login)
    Navigation.registerComponent('Chats', ()=> Chats)
}
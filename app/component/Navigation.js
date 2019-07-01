import {Navigation} from 'react-native-navigation'

export const goToChats = () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name:"Chats"
                    }
                }],
                options: {
                    topBar: {
                        drawBehind: true,
                        visible: false
                    }
                }
            }
        }
    })

    Navigation.setDefaultOptions({
        animations: {
            push: {
                enabled: 'false'
            },
            pop:{
                enabled:'false'
            }
        }
    })
}

export const goToLogin = () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name:"Login"
                    }
                }],
                options: {
                    topBar: {
                        drawBehind: true,
                        visible: false
                    }
                }
            }
        }
    })

    Navigation.setDefaultOptions({
        animations: {
            push: {
                enabled: 'false'
            },
            pop:{
                enabled:'false'
            }
        }
    })
}

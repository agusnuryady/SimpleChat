import React, {Component} from 'react'
import {View,Text,TextInput,Alert,TouchableOpacity} from 'react-native'
import {Icon} from  'native-base'
import styles from '../component/styles'
import AsyncStorage from '@react-native-community/async-storage'
import {goToChats} from '../component/Navigation'
import Axios from 'axios'
import Base64 from 'react-native-base64'
import LinearGradient from 'react-native-linear-gradient'

const Global = require('../component/Global')
const url = Global.URL

export default class Login extends Component {

    constructor(){
        super()
        this.state={
            username:'',
            password:'',
            passwordEncrypt:''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('tokenJwt', (err, result) => {
            if (result) {
                this.setState({
                    token: result
                })
                GetUser = async () => {
                    const response = await Axios({
                        method: 'POST',
                        headers: {
                            "Authorization": `Bearer ${this.state.token}`,
                            "content-type":"appilcation/json"
                        },
                        url:url+'users/info',
                    })
                    .then(()=> {
                        goToChats()
                    })
                }
                GetUser()
            }
        })
    }

    loginButton() {
        if (this.state.username === '' ) {
            alert('Please Enter Username!')
        } else {
            if (this.state.password === '') {
                alert('Please Enter Password!')
            } else {
                const {username} = this.state
                const {password} = this.state
                const encrypt = Base64.encode(password)
                
                Axios.post(`${url}users`, {
                    username: username,
                    password: encrypt
                })
                .then(res=> {
                    if (res.status===200) {
                        AsyncStorage.setItem('tokenJwt', res.data.token)
                        .then(()=> {
                            goToChats()
                        })
                        .catch((error)=> {
                            console.log(error)
                        })
                    }
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        alert('Wrong Username Or Password')
                    }
                })
            }
        } 
    }

    render() {
        return (
            <LinearGradient
                start={{x: 1.0, y: 0.2}} 
                end={{x: 2.5, y: 1}}
                colors={[
                    "#16a9f8", 
                    "#29a3ea", 
                    "#359ddc", 
                    "#3e97ce", 
                    "#4691c0", 
                    "#458ab6", 
                    "#4483ab", 
                    "#437ca1", 
                    "#3b7298", 
                    "#33688e", 
                    "#2c5f85", 
                    "#24557c"
                ]} 
                style={styles.container} >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.loginBox}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.textHeader}>
                                    SIMPLE CHAT
                                </Text>
                                <Icon name='ios-chatboxes' type='Ionicons' style={{paddingVertical:20,color:'white',paddingHorizontal:10}}/>
                            </View>
                            <TextInput
                                placeholder='username'
                                placeholderTextColor='#FDFDFD'
                                style={styles.textInputLogin}
                                onChangeText={(username)=> {this.setState({username})}}
                                value={this.state.username}
                            />
                            <TextInput
                                placeholder='password'
                                placeholderTextColor='#FDFDFD'
                                style={styles.textInputLogin}
                                onChangeText={(password)=> {this.setState({password})}}
                                value={this.state.password}
                                secureTextEntry={true}
                            />
                            <TouchableOpacity
                                onPress={()=> this.loginButton()}
                                style={styles.buttonLogin}
                            >
                                <Text style={styles.textLoginBox}>
                                    Log In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        )
    }

}

import React, {Component} from 'react'
import {View,TouchableOpacity,TextInput,FlatList,YellowBox,Dimensions,Alert} from 'react-native'
import styles from '../component/styles'
import {Container,Content, Text, List, ListItem, Icon, Thumbnail,Header,Footer,Right,Body,Left} from 'native-base'
import {goToLogin} from '../component/Navigation'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal'
YellowBox.ignoreWarnings(['Remote debugger'])

const Global = require('../component/Global')
const url = Global.URL

var {width,height}=Dimensions.get('window')

export default class Chats extends Component {

    constructor(){
        super()
        this.state={
            textInput:'',
            token:'',
            chats:[],
            id_user:'',
            id_chats:'',
            chatItem:'',
            isModalChatVisible:false,
            isModalChatEditVisible:false,
        }
    }

    fetchAll = ()=> {
        axios({
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.state.token}`,
                "content-type":"appilcation/json"
            },
            url:url+'users/info',
        })
        .then(res => {this.setState({id_user: res.data[0].id})})
        axios({
            method: 'get',
            headers: {
                'Authorization' : `Bearer ${this.state.token}`,
                'content-type':'application/json'
            },
            url:url+'chats',
        })
        .then(res => {this.setState({chats: res.data})})
    }

    componentDidMount() {
        AsyncStorage.getItem('tokenJwt', (err, result) => {
            if (result) {
                this.setState({
                    token: result
                })
                this.fetchAll()
            }
        })
    }

    handlePress(){
        this.state.textInput === '' ? null:this.sendChatButton()
    }

    modalChat(id){
        this.setState({isModalChatVisible: !this.state.isModalChatVisible})
        this.setState({id_chats:id})
    }

    modalEdit() {
        this.setState({isModalChatVisible: !this.state.isModalChatVisible})
        AsyncStorage.getItem('tokenJwt', (err, result) => {
            if (result) {
                this.setState({
                    token: result
                })
                GetChat = async () => {
                    const response = await axios({
                        method: 'post',
                        headers: {
                            'Authorization' : `Bearer ${this.state.token}`,'content-type':'application/json'
                        },
                        url:`${url}chats/${this.state.id_chats}`,
                    })
                    this.setState({chatItem: response.data[0].chat})
                    this.setState({isModalChatEditVisible: !this.state.isModalChatEditVisible})
                }
                GetChat()
                
            }
        })
    }

    async sendChatButton() {
        const {textInput} = this.state

        const res = await axios({
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${this.state.token}`,
                'content-type':'application/json'
            },
            url:url+'posts/chats',
            data: {
                chat: textInput,
            }
        })
        .then(res=>{console.log(res.data)})

        this.fetchAll()

        this.setState({textInput:''})
    }

    editButton=()=> {
        AsyncStorage.getItem('tokenJwt', (err, result) => {
            if (result) {
                this.setState({
                    token: result
                })
                GetEditChat = async () => {
                    const res = await axios({
                        method:'patch',
                        headers: {
                            'Authorization' : `Bearer ${this.state.token}`,'content-type':'application/json'
                        },
                        url:`${url}chats/${this.state.id_chats}`,
                        data: {
                            chat: this.state.chatItem
                        }
                    })
                    .then(res=>{console.log(res)})
                    this.fetchAll()
                    this.setState({isModalChatEditVisible: !this.state.isModalChatEditVisible})
                    this.setState({id_chats:''})
                    this.setState({chatItem:''})
                }
                GetEditChat()
            }
        })
    }

    deleteButton(){
        this.setState({isModalChatVisible: !this.state.isModalChatVisible})
        Alert.alert(
        '',
        'Are you sure you want delete this? ',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text:'OK', 
                onPress: ()=> {
                axios({
                    method: 'delete',
                    headers: {
                        'Authorization' : `Bearer ${this.state.token}`,'content-type':'application/json'
                    },
                    url:`${url}chats/${this.state.id_chats}`,
                })
                .then((res)=> this.fetchAll())
                .then(Alert.alert('Data berhasil Di hapus'))
                }
            },
        ],
        {cancelable:false},
        )
    }

    logoutButton(){
        Alert.alert(
        '',
        'Are you sure you want to logout? ',
        [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text:'Yes', 
                onPress: ()=> {
                    AsyncStorage.removeItem('tokenJwt', (err, res) => {
                        if (res) {
                            this.setState({id_chats:''})
                            this.setState({chatItem:''})
                        }
                    })
                    goToLogin()
                } 
            },
        ],
        {cancelable:false},
        )
    }

    render() {
        return (
            <View style={{flex:1}} >
                <View style={styles.headerHome}>
                    <View style={styles.headerText}>
                        <Icon name='ios-chatboxes' type='Ionicons' style={styles.headerIcon} />
                        <Text style={styles.textHeader2}>
                            Simple Chats
                        </Text>
                    </View>
                    <View style={{right:1,position:'absolute',padding:14}} >
                        <TouchableOpacity
                            onPress={()=> this.logoutButton()}
                            style={styles.iconBoxHome}>
                            <Icon name='logout' type='AntDesign' style={styles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:9}} >
                    <FlatList
                        inverted
                        data={this.state.chats}
                        renderItem={({item}) => (
                            <View style={[this.state.id_user === item.id_user ? styles.chatBoxUser : styles.chatBox]}>
                                <View style={[this.state.id_user === item.id_user ? styles.chatBox1User : styles.chatBox1]}>
                                    <Thumbnail
                                        small
                                        source={{uri:item.image_user}}
                                    />
                                </View>
                                <TouchableOpacity
                                    onLongPress={
                                        () => {this.state.id_user === item.id_user ?  this.modalChat(item.id):null}
                                    }
                                    style={[this.state.id_user === item.id_user ? styles.chatBox2User : styles.chatBox2]}
                                >
                                    <Text style={this.state.id_user === item.id_user ? styles.chatTextUser:styles.chatText}>
                                        {this.state.id_user === item.id_user ? 'Me':item.username}
                                    </Text>
                                    <Text style={this.state.id_user === item.id_user ? styles.chatText2User:styles.chatText2} >
                                        {item.chat}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item)=> { return item.id.toString()}}
                    />
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerBox}>
                        <TextInput
                            style={styles.textInputBottomValue}
                            onChangeText={(textInput)=> {this.setState({textInput})}}
                            value={this.state.textInput}
                            multiline={true}
                            
                            placeholder='Write Something..'
                        />
                        <TouchableOpacity
                            style={styles.buttonBottom}
                            onPress={()=> this.handlePress()}    
                        >
                            <Icon name='send' style={styles.buttonSendIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    onBackdropPress={()=>this.modalChat()}
                    isVisible={this.state.isModalChatVisible}
                    style={{flex:1,position:'absolute',margin:0,bottom:0,}}
                    >
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white',width:width,padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                        <TouchableOpacity 
                            onPress={()=>this.modalEdit()}
                            style={{padding:20,}}>
                            <Text style={{fontSize:20,color:'blue'}}>
                                EDIT
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={()=>this.deleteButton()}
                            style={{padding:20}}>
                            <Text style={{fontSize:20,color:'red'}}>
                                DELETE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    onBackdropPress={()=>this.setState({isModalChatEditVisible: !this.state.isModalChatEditVisible})}
                    isVisible={this.state.isModalChatEditVisible}
                    style={{flex:1,position:'absolute',margin:0,bottom:0,}} >
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white',width:width,padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                        <TextInput
                            placeholder='Write something..'
                            placeholderTextColor='gray'
                            style={styles.textInputBottomValue}
                            onChangeText={(chatItem)=> {this.setState({chatItem})}}
                            value={this.state.chatItem}
                        />
                        <TouchableOpacity 
                            onPress={()=>this.editButton()}
                            style={{padding:20}}>
                            <Text style={{fontSize:20,color:'blue'}}>
                                SIMPAN
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }

}
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:0,
    },
    content: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        margin:0,
    },
    loginBox: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'stretch',
        paddingHorizontal:20
    },
    textInputLogin: {
        paddingVertical:10,
        paddingHorizontal:10,
        fontFamily: 'Gill Sans', 
        fontSize: 20, 
        color: 'white',
        minWidth: 300,
        margin: 12,
        minHeight: 50,
        alignSelf: 'stretch',
        borderRadius: 2,
        borderColor: '#FDFDFD',
        borderBottomWidth: 0.5
    },
    buttonLogin: {
        fontSize: 15,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        minWidth: 200,
        padding: 15,
        margin: 12,
        minHeight: 40,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#FFFFFF',
        backgroundColor: 'rgba(255,255,255,0.03)'
    },
    textLoginBox: {
        fontFamily: 'Gill Sans', 
        fontSize: 18, 
        color: '#FDFDFD'
    },
    header: {
        flex:1,
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#BFE754',
    },
    headerHome: {
        backgroundColor: '#7FC7DA',
        height:50,
        elevation:5,
        borderBottomColor:'#BBBBBB',
        borderBottomWidth:0.7
    },
    headerText: {
        padding:10,
        flexDirection:'row',
        alignItems:'center'
    },
    iconBoxHome: {
        paddingHorizontal:5,
        justifyContent:'center',
        color:'#FFF'
    },

    textHeader: {
        fontFamily: 'Gill Sans', 
        fontSize: 27, 
        color: '#FFF',
        fontWeight: '500',
        paddingVertical:20
    },
    textHeader2 : {
        justifyContent: 'center',
        color: '#FFF',
        fontSize: 22,
        fontWeight: '500',
        padding:2,
        paddingLeft:10
    },
    textHeader3 : {
        justifyContent: 'center',
        color: '#FFF',
        fontSize: 17,
        fontWeight: '500',
        padding:2,
    },
    footer: {
        paddingVertical:6,
        backgroundColor:'transparent',
        height:70,
        paddingHorizontal:6
    },
    footerBox: {
        flexDirection:'row',
        backgroundColor:'transparent',
        paddingLeft:5,
        paddingRight:5,
        marginHorizontal:1,
        borderWidth:1,
        height:60,
        borderColor:'#A9A9A9',
        borderRadius:30,
    },
    textInputBottom: {
        flexDirection:'row',
        backgroundColor:'transparent',
    },
    textInputBottomValue: {
        fontSize:17,
        width:330,
        paddingHorizontal:10,
        paddingVertical:15,
    },
    buttonBottom: {
        backgroundColor:'#7FC7DA',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        position:'absolute',
        bottom:3,
        right:3,
        height:52,
        width:52,
    },
    headerIcon: {
        color:'white',
        fontSize:25
    },
    buttonSendIcon: {
        fontSize:20,
        color:'white'
    },
    chatBox: {
        padding:10,
        flexDirection:'row'
    },
    chatBoxUser: {
        padding:10,
        flexDirection:'row-reverse'
    },
    chatBox1: {
        paddingRight:10
    },
    chatBox1User: {
        paddingLeft:10
    },
    chatBox2: { 
        top:10,
        paddingTop:5,
        paddingBottom:10,
        paddingRight:20,
        paddingLeft:20,
        maxWidth:330,
        flexDirection:'column',
        backgroundColor:'#E3E5E6',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
    },
    chatBox2User: {
        top:10,
        paddingTop:5,
        paddingBottom:10,
        paddingRight:20,
        paddingLeft:20,
        maxWidth:330,
        flexDirection:'column',
        backgroundColor:'#67CDD2',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
    },
    chatText: {
        color:'#287E93',
        fontWeight:'bold',
        fontSize:16,
        paddingBottom:7,
        paddingTop:2,
    },
    chatTextUser: {
        color:'#FFF',
        fontWeight:'bold',
        fontSize:16,
        paddingBottom:7,
        paddingTop:2,
        textAlign:'right'
    },
    chatText2: {
        fontSize:17
    },
    chatText2User: {
        fontSize:17,
        textAlign:'right',
    },
})

export default styles;
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Image, TextInput, Text, TouchableOpacity } from 'react-native'

import api from '../services/api';
import Logo from '../Img/logo.png';

export default function Login({ navigation }){
    const [user, setUser] = useState('');
    
    async function handleLoad(){
        const response = await api.post('/devs', { username: user });
        const { _id } = response.data;
       
        navigation.navigate('Main', { _id });
    }

    return (
            <KeyboardAvoidingView
                behavior="padding"
                enabled={Platform.OS === 'ios'}
                style={styles.container}>

                <Image source={Logo} />
                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.text} 
                    placeholderTextColor="#999"
                    placeholder="Informe seu usuário do GitHub." 
                    value={user}
                    onChangeText={setUser}
                />
                <TouchableOpacity onPress={ handleLoad } style={styles.buttton}>
                    <Text style={styles.butttonText}>Entrar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    text: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    buttton: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    butttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
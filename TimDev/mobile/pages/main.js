import React, { useEffect, useState } from 'react';
import {SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { AsyncStorage } from 'react-native'
import api from '../services/api';
import Logo from '../Img/logo.png';
import like from '../Img/like.png';
import dislike from '../Img/dislike.png';

export default function Load({navigation}){
    const id = navigation.getParam('user');
    const [users, setUser] = useState([]);
    useEffect(() => {
        async function LoadUser(){
            const response = await api.get("/devs", {
                headers: {
                    user: id,
                }
            })
            setUser(response.data);
        }
        LoadUser();
    }, [id]);
    
    async function hendleLike(){
        const [user, ...rest] = users;
        await api.post(`devs/${user._id}/likes`, null, {
            headers: { user: id }
        })

        setUser(rest);
    }
    async function hendleDisLike(){
        const [user, ...rest] = users;
        await api.post(`devs/${user._id}/dislikes`, null, {
            headers: { user: id }
        })

        setUser(rest);
    }

    async function handleLogalt(){
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }
    return (
        <SafeAreaView style={styles.containar}>
            <TouchableOpacity onPress={handleLogalt}>
                 <Image source={Logo} style={styles.logo} />
             </TouchableOpacity>
             
             <View style={styles.cardContainer}>
                {
                  users.length == 0 ? <Text style={styles.empty}>Acabou (:</Text>:
                    (  users.map((user, index) => (
                        <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                            <Image style={styles.avatar} source={{ uri: user.avatar }} />
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio}>{user.bio}</Text>
                            </View>
                        </View>
                    )))
                }
             </View >
                
             {
                 users.length > 0 && (
                    <View style={styles.bottoms}>
                    <TouchableOpacity style={styles.bottomLike} onPress={hendleLike}>
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomLike} onPress={hendleDisLike}>
                        <Image source={like} />
                    </TouchableOpacity>
                 </View>
                 )
             }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containar: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        marginTop: 50
    },
    avatar: {
        flex: 1,
        height: 300
    },
    cardContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize:14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },
    bottoms: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    bottomLike: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        
    },
    empty: {
        fontSize: 30,
        color: '#999',
        alignSelf: 'center', 
        fontWeight: 'bold'
    }
});
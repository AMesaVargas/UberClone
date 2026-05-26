import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext';
import { registerFirebase, saveUser } from '../storage/FirestoreService';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../styles/RegisterStyles';

const Register = ({ navigation }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('');

  const { login } = useAuth();

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    });

    if (result.didCancel) {
      return;
    }

    if (result.assets && result.assets.length > 0) {
      setPhotoUrl(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (!name || !phoneNumber || !gender || !language || !email || !password) {
      Alert.alert('Error', 'Complete all fields');

      return;
    }

    try {
      const response = await registerFirebase(email, password);

      if (!response.success) {
        Alert.alert('Error', response.error);
        return;
      }

      const uid = response.user.uid;
      login(response.user);

      const saveResponse = await saveUser(uid, {
        photoUrl,
        fullName: name,
        phoneNumber,
        gender,
        email,
        language,
        role: 'passenger',
      });

      if (!saveResponse.success) {
        Alert.alert('Error', saveResponse.error);
        return;
      }

      Alert.alert('Success', 'successfully registered user');

      console.log('USER CREATED');
      setPhotoUrl(null);
      setName('');
      setPhoneNumber('');
      setGender('');
      setEmail('');
      setPassword('');
      setLanguage('');
    } catch (error) {
      console.log('ERROR:', error.message);
      Alert.alert('Error Firebase', error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.textContainer}>
        <Text style={styles.titleScreen}>Create Account</Text>
        <Text style={styles.textScreen}>Complete your details</Text>
      </View>

      <TouchableOpacity style={styles.photoContainer} onPress={selectImage}>
        {photoUrl ? (
          <Image source={{ uri: photoUrl }} style={styles.photo} />
        ) : (
          <Text style={styles.photoText}>+</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.generalText}>Name</Text>
      <TextInput
        placeholder="Pepito Perez"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.generalText}>Phone Number</Text>
      <TextInput
        placeholder="123456789"
        placeholderTextColor="#888"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Text style={styles.generalText}>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={itemValue => setGender(itemValue)}
          style={styles.picker}
          dropdownIconColor="#FFF"
        >
          <Picker.Item label="Select Gender" value="" color="#888" />
          <Picker.Item label="Male" value="Male" color="#888" />
          <Picker.Item label="Female" value="Female" color="#888" />
        </Picker>
      </View>

      <Text style={styles.generalText}>Email</Text>
      <TextInput
        placeholder="email@gmail.com"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <Text style={styles.generalText}>Password</Text>
      <TextInput
        placeholder="*******"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.generalText}>Lenguage</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={language}
          onValueChange={itemValue => setLanguage(itemValue)}
          style={styles.picker}
          dropdownIconColor="#FFF"
        >
          <Picker.Item label="Select Language" value="" color="#888" />

          <Picker.Item label="English" value="English" color="#888" />

          <Picker.Item label="Spanish" value="Spanish" color="#888" />
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.registeredButton}
        onPress={handleRegister}
      >
        <Text style={styles.registeredButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          You already have an account?{' '}
          <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Register;

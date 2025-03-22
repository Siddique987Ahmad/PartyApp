import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
const RegisterScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = async () => {
    if (!userName || !email || !password) {
      Alert.alert('Error', 'Fields required');
      return;
    }
    try {
      const response = await axios.post(
        'http://192.168.222.64:4001/api/user/register',
        {
          userName,
          email,
          password,
        },
      );
      if (response.status === 200) {
        Alert.alert('Successfull', 'Registeration successfull');
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Registration failed',
      );
    }

    //console.log('Icon component:', <Icon name="user" size={20} color="#fff" />);
  };
  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.KeyboardAvoidingView}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Register Account</Text>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="UserName"
              placeholderTextColor="#ccc"
              value={userName}
              onChangeText={setUserName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ccc"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye-slash' : 'eye'}
                size={20}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          {/* <Button
        title="Register"
        onPress={handleRegister}
      /> */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>
          {/* <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      /> */}
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 16,
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a11cb',
  },
  loginText: {
    marginTop: 20,
    color: '#fff',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RegisterScreen;

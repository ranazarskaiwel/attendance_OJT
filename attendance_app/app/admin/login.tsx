import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otp, setOtp] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    // Simulate two-factor authentication
    setShowTwoFactor(true);
  };

  const handleTwoFactorVerify = () => {
    if (twoFactorCode === '123456') { // Mock code
      router.replace('/admin/dashboard');
    } else {
      Alert.alert('Error', 'Invalid verification code');
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    // Mock OTP sending
    Alert.alert('OTP Sent', `OTP sent to ${email}`);
    setOtp('123456'); // Mock OTP
  };

  const handleResetPassword = () => {
    if (otp === '123456') {
      Alert.alert('Success', 'Password reset successful');
      setShowForgotPassword(false);
      setOtp('');
    } else {
      Alert.alert('Error', 'Invalid OTP');
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      <View style={tw`min-h-screen p-6 justify-center`}>
        {/* Header */}
        <View style={tw`items-center mb-10`}>
          <Ionicons name="shield-checkmark" size={60} color="#1e40af" />
          <Text style={tw`text-3xl font-bold text-gray-900 mt-4`}>Admin Panel</Text>
          <Text style={tw`text-gray-600 mt-2`}>Secure Authentication System</Text>
        </View>

        {!showForgotPassword ? (
          <>
            {/* Login Form */}
            {!showTwoFactor ? (
              <View style={tw`bg-white rounded-xl shadow-lg p-6`}>
                <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>Login</Text>
                
                <View style={tw`mb-4`}>
                  <Text style={tw`font-medium text-gray-700 mb-2`}>Email</Text>
                  <TextInput
                    style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50`}
                    placeholder="admin@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={tw`mb-6`}>
                  <Text style={tw`font-medium text-gray-700 mb-2`}>Password</Text>
                  <TextInput
                    style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50`}
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity 
                  style={tw`bg-blue-600 py-3 rounded-lg mb-4`}
                  onPress={handleLogin}
                >
                  <Text style={tw`text-white text-center font-bold text-lg`}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={tw`py-2`}
                  onPress={() => setShowForgotPassword(true)}
                >
                  <Text style={tw`text-blue-600 text-center`}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* Two-Factor Authentication */
              <View style={tw`bg-white rounded-xl shadow-lg p-6`}>
                <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>Two-Factor Authentication</Text>
                <Text style={tw`text-gray-600 mb-4`}>
                  Enter the 6-digit code sent to your email
                </Text>
                
                <View style={tw`mb-6`}>
                  <Text style={tw`font-medium text-gray-700 mb-2`}>Verification Code</Text>
                  <TextInput
                    style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-center text-2xl`}
                    placeholder="123456"
                    value={twoFactorCode}
                    onChangeText={setTwoFactorCode}
                    keyboardType="number-pad"
                    maxLength={6}
                  />
                </View>

                <TouchableOpacity 
                  style={tw`bg-blue-600 py-3 rounded-lg mb-4`}
                  onPress={handleTwoFactorVerify}
                >
                  <Text style={tw`text-white text-center font-bold text-lg`}>Verify</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={tw`py-2`}
                  onPress={() => setShowTwoFactor(false)}
                >
                  <Text style={tw`text-gray-600 text-center`}>Back to Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          /* Forgot Password */
          <View style={tw`bg-white rounded-xl shadow-lg p-6`}>
            <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>Reset Password</Text>
            
            <View style={tw`mb-4`}>
              <Text style={tw`font-medium text-gray-700 mb-2`}>Email</Text>
              <TextInput
                style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50`}
                placeholder="admin@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            {otp ? (
              <>
                <View style={tw`mb-4`}>
                  <Text style={tw`font-medium text-gray-700 mb-2`}>OTP</Text>
                  <TextInput
                    style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-center text-2xl`}
                    placeholder="123456"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={tw`mb-4`}>
                  <Text style={tw`font-medium text-gray-700 mb-2`}>New Password</Text>
                  <TextInput
                    style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50`}
                    placeholder="••••••••"
                    secureTextEntry
                  />
                </View>
                <TouchableOpacity 
                  style={tw`bg-green-600 py-3 rounded-lg mb-4`}
                  onPress={handleResetPassword}
                >
                  <Text style={tw`text-white text-center font-bold text-lg`}>Reset Password</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity 
                style={tw`bg-blue-600 py-3 rounded-lg mb-4`}
                onPress={handleForgotPassword}
              >
                <Text style={tw`text-white text-center font-bold text-lg`}>Send OTP</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={tw`py-2`}
              onPress={() => {
                setShowForgotPassword(false);
                setOtp('');
              }}
            >
              <Text style={tw`text-gray-600 text-center`}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Token Information */}
        <View style={tw`mt-6 bg-blue-50 p-4 rounded-lg`}>
          <Text style={tw`font-bold text-blue-800 mb-2`}>Authentication Type: Bearer Token</Text>
          <Text style={tw`text-blue-600 text-sm`}>
            Upon successful login, a bearer token will be issued for API authentication.
            This token will be automatically destroyed on logout.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
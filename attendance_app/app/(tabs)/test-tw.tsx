import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'twrnc';

export default function AuthFlowPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: enter email, 2: enter OTP, 3: new password

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setIs2FAEnabled(true);
    Alert.alert('Success', 'Login successful! 2FA required.');
  };

  const handle2FAVerify = () => {
    if (!formData.otp || formData.otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    setAuthToken(mockToken);
    setIsLoggedIn(true);
    setIs2FAEnabled(false);
    Alert.alert('Success', '2FA verified! You are now logged in.');
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    setForgotPasswordStep(2);
    Alert.alert('OTP Sent', `OTP has been sent to ${formData.email}`);
  };

  const handleOTPVerify = () => {
    if (!formData.otp || formData.otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    setForgotPasswordStep(3);
  };

  const handleResetPassword = () => {
    if (!formData.newPassword || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (formData.newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    Alert.alert('Success', 'Password reset successfully!');
    setActiveTab('login');
    setForgotPasswordStep(1);
    setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '', otp: '' }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthToken('');
    setFormData({
      email: '',
      password: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
    });
    Alert.alert('Logged Out', 'You have been successfully logged out');
  };

  const generateMockToken = () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    setAuthToken(mockToken);
    Alert.alert('Token Generated', 'Bearer token has been generated');
  };

  const clearToken = () => {
    setAuthToken('');
    Alert.alert('Token Cleared', 'Bearer token has been destroyed');
  };

  const renderLoginForm = () => (
    <View style={tw`bg-white rounded-2xl shadow-lg p-6`}>
      <Text style={tw`text-2xl font-bold text-gray-800 mb-2`}>Welcome Back</Text>
      <Text style={tw`text-gray-600 mb-6`}>Sign in to your account</Text>
      
      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-700 font-medium mb-2`}>Email Address</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-xl px-4 py-3 text-gray-800`}
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-700 font-medium mb-2`}>Password</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-xl px-4 py-3 text-gray-800`}
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity 
          onPress={() => setShowPassword(!showPassword)}
          style={tw`absolute right-4 top-3`}
        >
          <Text style={tw`text-blue-500`}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        onPress={handleLogin}
        style={tw`bg-blue-500 py-4 rounded-xl mb-4`}
      >
        <Text style={tw`text-white text-center font-bold text-lg`}>Sign In</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setActiveTab('forgot')}>
        <Text style={tw`text-blue-500 text-center`}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );

  const render2FAForm = () => (
    <View style={tw`bg-white rounded-2xl shadow-lg p-6`}>
      <View style={tw`items-center mb-6`}>
        <View style={tw`w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4`}>
          <Text style={tw`text-2xl`}>🔐</Text>
        </View>
        <Text style={tw`text-2xl font-bold text-gray-800`}>Two-Factor Authentication</Text>
        <Text style={tw`text-gray-600 text-center mt-2`}>
          Enter the 6-digit code sent to your email
        </Text>
      </View>
      
      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-700 font-medium mb-2`}>Verification Code</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-xl px-4 py-3 text-center text-2xl font-bold text-gray-800`}
          placeholder="000000"
          value={formData.otp}
          onChangeText={(text) => handleInputChange('otp', text)}
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>
      
      <TouchableOpacity 
        onPress={handle2FAVerify}
        style={tw`bg-blue-500 py-4 rounded-xl mb-4`}
      >
        <Text style={tw`text-white text-center font-bold text-lg`}>Verify & Continue</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setIs2FAEnabled(false)}>
        <Text style={tw`text-gray-500 text-center`}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );

  const renderForgotPasswordForm = () => (
    <View style={tw`bg-white rounded-2xl shadow-lg p-6`}>
      <Text style={tw`text-2xl font-bold text-gray-800 mb-2`}>
        {forgotPasswordStep === 1 && 'Forgot Password'}
        {forgotPasswordStep === 2 && 'Verify OTP'}
        {forgotPasswordStep === 3 && 'Reset Password'}
      </Text>
      <Text style={tw`text-gray-600 mb-6`}>
        {forgotPasswordStep === 1 && 'Enter your email to receive a reset OTP'}
        {forgotPasswordStep === 2 && 'Enter the 6-digit code sent to your email'}
        {forgotPasswordStep === 3 && 'Enter your new password'}
      </Text>
      
      {forgotPasswordStep === 1 && (
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 font-medium mb-2`}>Email Address</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-xl px-4 py-3 text-gray-800`}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
          />
        </View>
      )}
      
      {forgotPasswordStep === 2 && (
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 font-medium mb-2`}>OTP Code</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-xl px-4 py-3 text-center text-2xl font-bold text-gray-800`}
            placeholder="000000"
            value={formData.otp}
            onChangeText={(text) => handleInputChange('otp', text)}
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>
      )}
      
      {forgotPasswordStep === 3 && (
        <>
          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>New Password</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-xl px-4 py-3 text-gray-800`}
              placeholder="Enter new password"
              value={formData.newPassword}
              onChangeText={(text) => handleInputChange('newPassword', text)}
              secureTextEntry
            />
          </View>
          <View style={tw`mb-6`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Confirm New Password</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-xl px-4 py-3 text-gray-800`}
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              secureTextEntry
            />
          </View>
        </>
      )}
      
      <TouchableOpacity 
        onPress={() => {
          if (forgotPasswordStep === 1) handleForgotPassword();
          if (forgotPasswordStep === 2) handleOTPVerify();
          if (forgotPasswordStep === 3) handleResetPassword();
        }}
        style={tw`bg-blue-500 py-4 rounded-xl mb-4`}
      >
        <Text style={tw`text-white text-center font-bold text-lg`}>
          {forgotPasswordStep === 1 && 'Send OTP'}
          {forgotPasswordStep === 2 && 'Verify OTP'}
          {forgotPasswordStep === 3 && 'Reset Password'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => {
        setActiveTab('login');
        setForgotPasswordStep(1);
      }}>
        <Text style={tw`text-gray-500 text-center`}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTokenSection = () => (
    <View style={tw`bg-white rounded-2xl shadow-lg p-6`}>
      <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Bearer Token Management</Text>
      
      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-700 font-medium mb-2`}>Current Token</Text>
        <View style={tw`bg-gray-50 border border-gray-200 rounded-xl p-4`}>
          <Text style={tw`text-gray-600 text-sm font-mono`} numberOfLines={2}>
            {authToken || 'No token generated'}
          </Text>
        </View>
      </View>
      
      <View style={tw`flex-row gap-3`}>
        <TouchableOpacity 
          onPress={generateMockToken}
          style={tw`flex-1 bg-green-500 py-3 rounded-xl`}
        >
          <Text style={tw`text-white text-center font-bold`}>Generate Token</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={clearToken}
          style={tw`flex-1 bg-red-500 py-3 rounded-xl`}
        >
          <Text style={tw`text-white text-center font-bold`}>Destroy Token</Text>
        </TouchableOpacity>
      </View>
      
      <View style={tw`mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl`}>
        <Text style={tw`text-blue-800 font-medium mb-1`}>Token Status</Text>
        <Text style={tw`text-blue-600 text-sm`}>
          {authToken ? '✅ Token is active and valid' : '❌ No active token'}
        </Text>
      </View>
    </View>
  );

  const renderDashboard = () => (
    <View style={tw`bg-white rounded-2xl shadow-lg p-6`}>
      <View style={tw`items-center mb-6`}>
        <View style={tw`w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4`}>
          <Text style={tw`text-3xl`}>👤</Text>
        </View>
        <Text style={tw`text-2xl font-bold text-gray-800`}>Welcome, User!</Text>
        <Text style={tw`text-gray-600`}>You are successfully authenticated</Text>
      </View>
      
      <View style={tw`mb-6 p-4 bg-gray-50 rounded-xl`}>
        <Text style={tw`text-gray-700 font-medium mb-2`}>Account Information</Text>
        <Text style={tw`text-gray-600`}>Email: {formData.email || 'user@example.com'}</Text>
        <Text style={tw`text-gray-600`}>Status: <Text style={tw`text-green-500`}>Verified</Text></Text>
        <Text style={tw`text-gray-600`}>Last Login: Just now</Text>
      </View>
      
      <TouchableOpacity 
        onPress={handleLogout}
        style={tw`bg-red-500 py-4 rounded-xl`}
      >
        <Text style={tw`text-white text-center font-bold text-lg`}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1 bg-gray-50`}
    >
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <View style={tw`items-center mb-6`}>
            <Text style={tw`text-3xl font-bold text-blue-600`}>AuthFlow</Text>
            <Text style={tw`text-gray-600 mt-1`}>Complete Authentication System</Text>
          </View>
          
          {/* Navigation Tabs */}
          {!isLoggedIn && (
            <View style={tw`flex-row bg-white rounded-xl shadow-sm mb-6 p-1`}>
              {['login', 'forgot'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => {
                    setActiveTab(tab);
                    if (tab === 'login') setIs2FAEnabled(false);
                  }}
                  style={tw`flex-1 py-3 rounded-lg ${activeTab === tab ? 'bg-blue-500' : ''}`}
                >
                  <Text style={tw`text-center font-medium ${activeTab === tab ? 'text-white' : 'text-gray-600'}`}>
                    {tab === 'login' ? 'Login' : 'Forgot Password'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          {/* Main Content */}
          <View style={tw`mb-8`}>
            {isLoggedIn ? (
              <>
                {renderDashboard()}
                <View style={tw`mt-6`}>
                  {renderTokenSection()}
                </View>
              </>
            ) : is2FAEnabled ? (
              render2FAForm()
            ) : activeTab === 'login' ? (
              renderLoginForm()
            ) : (
              renderForgotPasswordForm()
            )}
          </View>
          
          {/* Status Indicator */}
          <View style={tw`mt-8`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Authentication Status</Text>
            <View style={tw`flex-row flex-wrap gap-2`}>
              <View style={tw`px-3 py-2 rounded-full ${isLoggedIn ? 'bg-green-100' : 'bg-gray-100'}`}>
                <Text style={tw`${isLoggedIn ? 'text-green-700' : 'text-gray-600'}`}>
                  {isLoggedIn ? '✅ Logged In' : '❌ Not Logged In'}
                </Text>
              </View>
              <View style={tw`px-3 py-2 rounded-full ${authToken ? 'bg-green-100' : 'bg-gray-100'}`}>
                <Text style={tw`${authToken ? 'text-green-700' : 'text-gray-600'}`}>
                  {authToken ? '✅ Token Active' : '❌ No Token'}
                </Text>
              </View>
              <View style={tw`px-3 py-2 rounded-full ${is2FAEnabled ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <Text style={tw`${is2FAEnabled ? 'text-blue-700' : 'text-gray-600'}`}>
                  {is2FAEnabled ? '🔐 2FA Required' : '✅ 2FA Not Required'}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Instructions */}
          <View style={tw`mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl`}>
            <Text style={tw`text-blue-800 font-bold mb-2`}>How to Test:</Text>
            <Text style={tw`text-blue-600 text-sm mb-1`}>1. Enter credentials and click Login</Text>
            <Text style={tw`text-blue-600 text-sm mb-1`}>2. Enter 6-digit OTP for 2FA verification</Text>
            <Text style={tw`text-blue-600 text-sm mb-1`}>3. Use Forgot Password for OTP-based reset</Text>
            <Text style={tw`text-blue-600 text-sm mb-1`}>4. Generate/Destroy Bearer Token in dashboard</Text>
            <Text style={tw`text-blue-600 text-sm`}>5. Logout to destroy session</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Switch } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CreateUser() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User',
    brand: '',
    deviceModel: '',
    serialNumber: '',
    sendWelcomeEmail: true,
  });

  const handleCreateUser = () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // Create user logic here
    Alert.alert('Success', 'User created successfully');
    router.back();
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`p-6`}>
        {/* Header */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-2xl font-bold text-gray-900`}>Create New User</Text>
          <Text style={tw`text-gray-600 mt-2`}>Add a new user to the system</Text>
        </View>

        {/* Form */}
        <View style={tw`bg-white rounded-xl shadow-sm p-6 mb-6`}>
          {/* Basic Information */}
          <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Basic Information</Text>
          
          <View style={tw`mb-4`}>
            <Text style={tw`font-medium text-gray-700 mb-2`}>Username *</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50`}
              placeholder="johndoe"
              value={form.username}
              onChangeText={(text) => setForm({...form, username: text})}
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`font-medium text-gray-700 mb-2`}>Email *</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50`}
              placeholder="john@example.com"
              value={form.email}
              onChangeText={(text) => setForm({...form, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`font-medium text-gray-700 mb-2`}>Password *</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50`}
              placeholder="••••••••"
              value={form.password}
              onChangeText={(text) => setForm({...form, password: text})}
              secureTextEntry
            />
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`font-medium text-gray-700 mb-2`}>Confirm Password *</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50`}
              placeholder="••••••••"
              value={form.confirmPassword}
              onChangeText={(text) => setForm({...form, confirmPassword: text})}
              secureTextEntry
            />
          </View>

          {/* Role Selection */}
          <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Role</Text>
          <View style={tw`flex-row gap-3 mb-6`}>
            {['User', 'Admin', 'SuperAdmin'].map((role) => (
              <TouchableOpacity
                key={role}
                style={tw`flex-1 border ${
                  form.role === role ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                } rounded-lg p-4 items-center`}
                onPress={() => setForm({...form, role})}
              >
                <Ionicons 
                  name={role === 'SuperAdmin' ? 'shield' : role === 'Admin' ? 'key' : 'person'} 
                  size={24} 
                  color={form.role === role ? '#3b82f6' : '#6b7280'} 
                />
                <Text style={tw`mt-2 font-medium ${
                  form.role === role ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  {role}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Device Information */}
          <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Device Information (Optional)</Text>
          
          <View style={tw`mb-4`}>
            <Text style={tw`font-medium text-gray-700 mb-2`}>Brand</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50`}
              placeholder="Apple, Samsung, etc."
              value={form.brand}
              onChangeText={(text) => setForm({...form, brand: text})}
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`font-medium text-gray-700 mb-2`}>Device Model</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50`}
              placeholder="iPhone 13, Galaxy S21, etc."
              value={form.deviceModel}
              onChangeText={(text) => setForm({...form, deviceModel: text})}
            />
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`font-medium text-gray-700 mb-2`}>Serial Number</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-gray-50`}
              placeholder="ABC123XYZ"
              value={form.serialNumber}
              onChangeText={(text) => setForm({...form, serialNumber: text})}
            />
          </View>

          {/* Options */}
          <View style={tw`flex-row items-center justify-between py-4 border-t border-gray-200`}>
            <Text style={tw`font-medium text-gray-700`}>Send Welcome Email</Text>
            <Switch
              value={form.sendWelcomeEmail}
              onValueChange={(value) => setForm({...form, sendWelcomeEmail: value})}
              trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
              thumbColor={form.sendWelcomeEmail ? '#3b82f6' : '#9ca3af'}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={tw`flex-row gap-3`}>
          <TouchableOpacity 
            style={tw`flex-1 bg-gray-200 py-4 rounded-xl`}
            onPress={() => router.back()}
          >
            <Text style={tw`text-gray-800 text-center font-bold text-lg`}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={tw`flex-1 bg-blue-600 py-4 rounded-xl`}
            onPress={handleCreateUser}
          >
            <Text style={tw`text-white text-center font-bold text-lg`}>Create User</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
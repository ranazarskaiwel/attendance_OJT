import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function UserManagement() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'SuperAdmin',
      brand: 'Apple',
      deviceModel: 'iPhone 13',
      serialNumber: 'ABC123XYZ',
      lastLogin: '2024-01-29 14:30:00',
      status: 'Active',
    },
    {
      id: 2,
      username: 'johndoe',
      email: 'john@example.com',
      role: 'User',
      brand: 'Samsung',
      deviceModel: 'Galaxy S21',
      serialNumber: 'DEF456UVW',
      lastLogin: '2024-01-29 10:15:00',
      status: 'Active',
    },
    // Add more mock users...
  ]);

  const handleDeleteUser = (userId: number) => {
    Alert.alert(
      'Delete User',
      'This will soft delete the user. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Soft delete logic
            setUsers(users.map(user => 
              user.id === userId ? { ...user, status: 'Deleted' } : user
            ));
            Alert.alert('Success', 'User soft deleted successfully');
          },
        },
      ]
    );
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`p-6`}>
        {/* Header */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-2xl font-bold text-gray-900`}>User Management</Text>
          <Text style={tw`text-gray-600 mt-2`}>Manage all users in the system</Text>
        </View>

        {/* Search and Create */}
        <View style={tw`flex-row gap-3 mb-6`}>
          <View style={tw`flex-1`}>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-white`}
              placeholder="Search users..."
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity 
            style={tw`bg-blue-600 px-4 rounded-lg items-center justify-center`}
            onPress={() => router.push('/admin/users/create')}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Users Table */}
        <View style={tw`bg-white rounded-xl shadow-sm overflow-hidden mb-6`}>
          <View style={tw`flex-row bg-gray-100 p-4 border-b border-gray-200`}>
            <Text style={tw`flex-1 font-bold text-gray-700`}>Username</Text>
            <Text style={tw`flex-1 font-bold text-gray-700`}>Email</Text>
            <Text style={tw`flex-1 font-bold text-gray-700`}>Role</Text>
            <Text style={tw`flex-1 font-bold text-gray-700`}>Last Login</Text>
            <Text style={tw`w-20 font-bold text-gray-700`}>Actions</Text>
          </View>

          {filteredUsers.map((user) => (
            <View key={user.id} style={tw`flex-row items-center p-4 border-b border-gray-100 last:border-b-0`}>
              <View style={tw`flex-1`}>
                <Text style={tw`font-medium text-gray-900`}>{user.username}</Text>
                <Text style={tw`text-sm text-gray-500`}>
                  {user.brand} {user.deviceModel}
                </Text>
              </View>
              <Text style={tw`flex-1 text-gray-700`}>{user.email}</Text>
              <View style={tw`flex-1`}>
                <View style={tw`px-2 py-1 rounded-full ${
                  user.role === 'SuperAdmin' ? 'bg-purple-100' : 'bg-blue-100'
                }`}>
                  <Text style={tw`text-center font-medium ${
                    user.role === 'SuperAdmin' ? 'text-purple-800' : 'text-blue-800'
                  }`}>
                    {user.role}
                  </Text>
                </View>
              </View>
              <Text style={tw`flex-1 text-gray-600 text-sm`}>{user.lastLogin}</Text>
              <View style={tw`w-20 flex-row gap-2`}>
                <TouchableOpacity 
                  style={tw`p-1`}
                  onPress={() => router.push(`/admin/users/${user.id}`)}
                >
                  <Ionicons name="eye" size={20} color="#4b5563" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={tw`p-1`}
                  onPress={() => router.push(`/admin/users/${user.id}?edit=true`)}
                >
                  <Ionicons name="create" size={20} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={tw`p-1`}
                  onPress={() => handleDeleteUser(user.id)}
                >
                  <Ionicons name="trash" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* User Data Information */}
        <View style={tw`bg-blue-50 p-4 rounded-lg mb-6`}>
          <Text style={tw`font-bold text-blue-800 mb-2`}>User Data Collected:</Text>
          <View style={tw`flex-row flex-wrap gap-2`}>
            {['Username', 'Email', 'Password', 'Brand', 'Device Model', 'S/N'].map((item) => (
              <View key={item} style={tw`px-3 py-1 bg-blue-100 rounded-full`}>
                <Text style={tw`text-blue-700 text-sm`}>{item}</Text>
              </View>
            ))}
          </View>
          <Text style={tw`text-blue-600 text-sm mt-2`}>
            Note: Passwords are never displayed. Last login time is recorded for security monitoring.
          </Text>
        </View>

        {/* Export Option */}
        <TouchableOpacity 
          style={tw`bg-white border border-gray-300 rounded-xl p-4 flex-row items-center justify-between`}
          onPress={() => Alert.alert('Export', 'Export user data as CSV/Excel')}
        >
          <View style={tw`flex-row items-center`}>
            <Ionicons name="download" size={24} color="#4b5563" style={tw`mr-3`} />
            <View>
              <Text style={tw`font-bold text-gray-900`}>Export User Data</Text>
              <Text style={tw`text-gray-600`}>Download all user data as CSV/Excel</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
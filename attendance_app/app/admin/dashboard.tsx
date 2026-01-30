import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '1,248', icon: 'people', color: 'bg-blue-500', route: '/admin/users' },
    { title: 'Active Events', value: '12', icon: 'calendar', color: 'bg-green-500', route: '/admin/events' },
    { title: 'Today Participants', value: '342', icon: 'person', color: 'bg-purple-500', route: '/admin/participants' },
    { title: 'Breakout Rooms', value: '28', icon: 'business', color: 'bg-yellow-500', route: '/admin/events/breakout' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'logged in', time: '2 min ago' },
    { id: 2, user: 'Jane Smith', action: 'created new event', time: '15 min ago' },
    { id: 3, user: 'Bob Johnson', action: 'updated participant data', time: '1 hour ago' },
    { id: 4, user: 'Alice Brown', action: 'exported report', time: '2 hours ago' },
  ];

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`p-6`}>
        {/* Welcome Header */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-2xl font-bold text-gray-900`}>Welcome back, Admin</Text>
          <Text style={tw`text-gray-600 mt-2`}>Here's what's happening with your system today.</Text>
        </View>

        {/* Stats Grid */}
        <View style={tw`flex-row flex-wrap -mx-2 mb-8`}>
          {stats.map((stat, index) => (
            <TouchableOpacity 
              key={index} 
              style={tw`w-1/2 px-2 mb-4`}
              onPress={() => router.push(stat.route)}
            >
              <View style={tw`bg-white rounded-xl shadow-sm p-4`}>
                <View style={tw`flex-row items-center justify-between mb-2`}>
                  <View style={tw`${stat.color} p-2 rounded-lg`}>
                    <Ionicons name={stat.icon as any} size={24} color="white" />
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </View>
                <Text style={tw`text-2xl font-bold text-gray-900`}>{stat.value}</Text>
                <Text style={tw`text-gray-600`}>{stat.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-xl font-bold text-gray-900 mb-4`}>Quick Actions</Text>
          <View style={tw`flex-row flex-wrap -mx-2`}>
            {[
              { title: 'Create User', icon: 'person-add', color: 'bg-blue-100', route: '/admin/users/create' },
              { title: 'Create Event', icon: 'add-circle', color: 'bg-green-100', route: '/admin/events/create' },
              { title: 'Generate QR', icon: 'qr-code', color: 'bg-purple-100', route: '/admin/events/qr' },
              { title: 'Export Data', icon: 'download', color: 'bg-yellow-100', route: '/admin/export' },
            ].map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={tw`w-1/2 px-2 mb-4`}
                onPress={() => router.push(action.route)}
              >
                <View style={tw`${action.color} rounded-xl p-4 items-center`}>
                  <Ionicons name={action.icon as any} size={32} color="#4b5563" />
                  <Text style={tw`text-gray-700 font-medium mt-2 text-center`}>{action.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={tw`bg-white rounded-xl shadow-sm p-6 mb-8`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-xl font-bold text-gray-900`}>Recent Activities</Text>
            <TouchableOpacity>
              <Text style={tw`text-blue-600`}>View All</Text>
            </TouchableOpacity>
          </View>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={tw`flex-row items-center py-3 border-b border-gray-100 last:border-b-0`}>
              <View style={tw`w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3`}>
                <Ionicons name="time" size={16} color="#3b82f6" />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-gray-900`}>
                  <Text style={tw`font-medium`}>{activity.user}</Text> {activity.action}
                </Text>
                <Text style={tw`text-gray-500 text-sm`}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* System Status */}
        <View style={tw`bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6`}>
          <Text style={tw`text-white text-xl font-bold mb-2`}>System Status</Text>
          <Text style={tw`text-blue-100 mb-4`}>All systems operational</Text>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-white text-2xl font-bold`}>99.9%</Text>
              <Text style={tw`text-blue-200`}>Uptime</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-white text-2xl font-bold`}>2.4s</Text>
              <Text style={tw`text-blue-200`}>Avg Response</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-white text-2xl font-bold`}>0</Text>
              <Text style={tw`text-blue-200`}>Errors</Text>
            </View>
          </View>
        </View>

        {/* Dashboard Background Settings */}
        <TouchableOpacity 
          style={tw`mt-8 bg-white rounded-xl shadow-sm p-6 flex-row items-center justify-between`}
          onPress={() => router.push('/admin/settings')}
        >
          <View style={tw`flex-row items-center`}>
            <View style={tw`w-10 h-10 bg-indigo-100 rounded-lg items-center justify-center mr-4`}>
              <Ionicons name="image" size={24} color="#4f46e5" />
            </View>
            <View>
              <Text style={tw`font-bold text-gray-900`}>Dashboard Background</Text>
              <Text style={tw`text-gray-600`}>Customize dashboard appearance</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
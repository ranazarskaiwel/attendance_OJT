import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AdminLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  // Theme-based colors
  const headerStyle = colorScheme === 'dark' 
    ? { backgroundColor: '#1e293b' } // Dark blue for dark mode
    : { backgroundColor: '#1e40af' }; // Blue for light mode

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle,
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Login screen - no header */}
        <Stack.Screen 
          name="login" 
          options={{ headerShown: false }}
        />
        
        {/* Dashboard screen with custom header buttons */}
        <Stack.Screen 
          name="dashboard" 
          options={{ 
            title: 'Admin Dashboard',
            headerLeft: () => (
              <TouchableOpacity style={tw`mr-4`} onPress={() => {/* Open drawer/sidebar */}}>
                <Ionicons name="menu" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={tw`flex-row items-center`}>
                <TouchableOpacity style={tw`mr-4`} onPress={() => {/* Toggle theme */}}>
                  <Ionicons 
                    name={colorScheme === 'dark' ? 'sunny' : 'moon'} 
                    size={22} 
                    color="white" 
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/admin/login')}>
                  <Ionicons name="log-out-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        
        {/* User Management */}
        <Stack.Screen 
          name="users/index" 
          options={{ 
            title: 'User Management',
            headerRight: () => (
              <TouchableOpacity onPress={() => router.push('/admin/users/create')}>
                <Ionicons name="add" size={24} color="white" style={tw`ml-4`} />
              </TouchableOpacity>
            ),
          }}
        />
        
        {/* Create User */}
        <Stack.Screen 
          name="users/create" 
          options={{ 
            title: 'Create User',
            presentation: 'modal',
          }}
        />
        
        {/* Edit User */}
        <Stack.Screen 
          name="users/[id]" 
          options={{ 
            title: 'Edit User',
          }}
        />
        
        {/* Event Management */}
        <Stack.Screen 
          name="events/index" 
          options={{ 
            title: 'Event Management',
            headerRight: () => (
              <TouchableOpacity onPress={() => router.push('/admin/events/create')}>
                <Ionicons name="add" size={24} color="white" style={tw`ml-4`} />
              </TouchableOpacity>
            ),
          }}
        />
        
        {/* Default screens for tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

export default function TestTW() {
  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-3xl font-bold text-center text-blue-600 mb-8`}>
          í¾¨ Tailwind CSS Test Page
        </Text>
        
        {/* Colors Test */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-xl font-bold mb-4`}>Color Palette</Text>
          <View style={tw`flex-row flex-wrap gap-2`}>
            {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'].map(color => (
              <View key={color} style={tw`${color} w-16 h-16 rounded-lg`} />
            ))}
          </View>
        </View>
        
        {/* Typography Test */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-xl font-bold mb-4`}>Typography</Text>
          <Text style={tw`text-xs text-gray-600`}>Extra Small Text</Text>
          <Text style={tw`text-sm text-gray-600`}>Small Text</Text>
          <Text style={tw`text-base text-gray-700`}>Base Text</Text>
          <Text style={tw`text-lg font-medium text-gray-800`}>Large Text</Text>
          <Text style={tw`text-xl font-bold text-gray-900`}>Extra Large Text</Text>
        </View>
        
        {/* Buttons Test */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-xl font-bold mb-4`}>Buttons</Text>
          <View style={tw`flex-row flex-wrap gap-3`}>
            <TouchableOpacity style={tw`px-4 py-2 bg-blue-500 rounded`}>
              <Text style={tw`text-white font-medium`}>Primary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`px-4 py-2 bg-gray-500 rounded`}>
              <Text style={tw`text-white font-medium`}>Secondary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`px-4 py-2 border border-blue-500 rounded`}>
              <Text style={tw`text-blue-500 font-medium`}>Outline</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Cards Test */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-xl font-bold mb-4`}>Cards</Text>
          <View style={tw`bg-white rounded-xl shadow-lg p-6`}>
            <Text style={tw`text-lg font-bold mb-2`}>Card Title</Text>
            <Text style={tw`text-gray-600 mb-4`}>
              This is a card with shadow, rounded corners, and padding.
            </Text>
            <View style={tw`h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full`} />
          </View>
        </View>
        
        {/* Spacing Test */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-xl font-bold mb-4`}>Spacing</Text>
          <View style={tw`flex-row items-center`}>
            <View style={tw`w-8 h-8 bg-red-400`} />
            <View style={tw`w-4`} />
            <View style={tw`w-8 h-8 bg-green-400`} />
            <View style={tw`w-8`} />
            <View style={tw`w-8 h-8 bg-blue-400`} />
          </View>
        </View>
        
        {/* Success Message */}
        <View style={tw`mt-8 p-6 bg-green-50 border border-green-200 rounded-xl`}>
          <Text style={tw`text-green-800 text-center text-lg font-bold`}>
            âœ… If you see all these styled elements, twrnc is working perfectly!
          </Text>
          <Text style={tw`text-green-600 text-center mt-2`}>
            You can now use Tailwind CSS in your React Native app
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

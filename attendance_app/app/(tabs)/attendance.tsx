// This is your existing attendance page
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function AttendanceTab() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-xl`}>Attendance Page</Text>
      {/* Your attendance page content here */}
    </View>
  );
}
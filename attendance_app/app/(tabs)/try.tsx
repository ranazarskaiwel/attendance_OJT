// App.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import tw from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';

interface Attendee {
  id: number;
  name: string;
  time: string;
  session: 'Morning' | 'Afternoon';
  status: 'Present' | 'Late';
}

export default function App() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editAttendee, setEditAttendee] = useState<Attendee | null>(null);
  const [editName, setEditName] = useState('');

  // Determine session based on current time
  const getSession = () => {
    const hour = new Date().getHours();
    return hour < 12 ? 'Morning' : 'Afternoon';
  };

  // Determine if late (after 9 AM for morning, 1 PM for afternoon)
  const getStatus = () => {
    const now = new Date();
    const hour = now.getHours();
    const session = getSession();
    if ((session === 'Morning' && hour >= 9) || (session === 'Afternoon' && hour >= 13)) {
      return 'Late';
    }
    return 'Present';
  };

  // Add attendee
  const handleCheckIn = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }
    const newAttendee: Attendee = {
      id: Date.now(),
      name,
      time: new Date().toLocaleTimeString(),
      session: getSession(),
      status: getStatus(),
    };
    setAttendees([newAttendee, ...attendees]);
    setName('');
  };

  // Open edit modal
  const openEditModal = (attendee: Attendee) => {
    setEditAttendee(attendee);
    setEditName(attendee.name);
    setEditModalVisible(true);
  };

  // Save edited attendee
  const saveEdit = () => {
    if (!editName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    setAttendees(
      attendees.map((a) =>
        a.id === editAttendee?.id ? { ...a, name: editName } : a
      )
    );
    setEditModalVisible(false);
  };

  // Delete attendee
  const deleteAttendee = (id: number) => {
    setAttendees(attendees.filter((a) => a.id !== id));
  };

  // Filter attendees by search
  const filteredAttendees = attendees.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  // Summary
  const totalPresent = attendees.filter((a) => a.status === 'Present').length;
  const totalLate = attendees.filter((a) => a.status === 'Late').length;

  // Render each attendee
  const renderItem = ({ item }: { item: Attendee }) => (
    <View style={tw`bg-white p-4 rounded-2xl mb-3 flex-row items-center shadow`}>
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-semibold text-purple-800`}>
          {item.name}
        </Text>
        <Text style={tw`text-gray-500 mt-1`}>
          {item.time} | {item.session} | {item.status}
        </Text>
      </View>
      <TouchableOpacity
        style={tw`mr-3`}
        onPress={() => openEditModal(item)}
      >
        <FontAwesome name="edit" size={20} color="#2563eb" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteAttendee(item.id)}>
        <FontAwesome name="trash" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <Text style={tw`text-3xl font-bold text-center mb-4 text-purple-800`}>
        Attendance ({attendees.length})
      </Text>

      {/* Attendance Summary */}
      <View style={tw`flex-row justify-around mb-4`}>
        <Text style={tw`text-green-600 font-bold`}>Present: {totalPresent}</Text>
        <Text style={tw`text-yellow-600 font-bold`}>Late: {totalLate}</Text>
      </View>

      {/* Search */}
      <TextInput
        style={tw`border border-gray-300 rounded-lg p-3 bg-white mb-4`}
        placeholder="Search attendee..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Check-in Input */}
      <View style={tw`flex-row mb-4 items-center`}>
        <TextInput
          style={tw`flex-1 border border-gray-300 rounded-lg p-3 bg-white`}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity
          style={tw`ml-3 bg-purple-500 px-5 py-3 rounded-lg`}
          onPress={handleCheckIn}
        >
          <FontAwesome name="check" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Attendees List */}
      <FlatList
        data={filteredAttendees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={tw`text-gray-400 text-center mt-10 text-lg`}>
            No attendees yet.
          </Text>
        }
      />

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-6 rounded-xl w-4/5`}>
            <Text style={tw`text-xl font-bold mb-4`}>Edit Attendee</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 mb-4`}
              value={editName}
              onChangeText={setEditName}
            />
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                style={tw`mr-3`}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={tw`text-gray-500`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveEdit}>
                <Text style={tw`text-blue-600 font-bold`}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

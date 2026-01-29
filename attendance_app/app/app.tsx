import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { markAttendance, getAttendance } from "./api";

interface AttendanceRecord {
  id: number;
  user_id: string;
  date: string;
  status: string;
}

export default function App() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  const handleMarkAttendance = async () => {
    const result = await markAttendance("1", "present");
    console.log(result);
  };

  const fetchAttendance = async () => {
    const data = await getAttendance("1");
    setRecords(data);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Button title="Mark Attendance" onPress={handleMarkAttendance} />
      <Button title="Refresh" onPress={fetchAttendance} />
      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>User: {item.user_id}, Date: {item.date}, Status: {item.status}</Text>
        )}
      />
    </View>
  );
}

const BASE_URL = "http://192.168.1.10:8000"; // replace with your PC's local IP

export const markAttendance = async (userId: string, status: string) => {
  try {
    const response = await fetch(`${BASE_URL}/attendance/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
        status: status
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error marking attendance:", error);
  }
};

export const getAttendance = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/attendance/${userId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching attendance:", error);
  }
};

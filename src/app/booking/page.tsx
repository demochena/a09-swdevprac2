import LocationDateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";

export default async function Booking() {
    const session = await getServerSession();
    let profile = null;

    if (session && session.user) {
        const token = (session.user as any).token;
        
        if (token) {
            const response = await getUserProfile(token);
            profile = response.data; 
        }
    }

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 pt-10">
            {profile ? (
                <div className="bg-slate-100 p-6 rounded-lg w-fit m-5 text-gray-800 text-left shadow-md">
                    <div className="text-xl font-bold mb-4">User Profile</div>
                    <div className="space-y-1">
                        <div><strong>Name:</strong> {profile.name}</div>
                        <div><strong>Email:</strong> {profile.email}</div>
                        <div><strong>Tel.:</strong> {profile.tel}</div>
                        {/* ใช้ Date() เพื่อแปลง string เป็นรูปแบบวันที่อ่านง่าย */}
                        <div><strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>
            ) : (
                <div className="text-red-500 my-5 text-lg">
                    Please Log-In to view your profile and make a booking.
                </div>
            )}

            <div className="text-xl font-medium">New Booking</div>
            <div className="w-fit space-y-2">
                <TextField
                    id="Name-Lastname"
                    variant="standard"
                    name="Name-Lastname"
                    label="Name-Lastname"
                />

                <TextField
                    id="Contact-Number"
                    variant="standard"
                    name="Contact-Number"
                    label="Contact-Number"
                />
        
                <div className="text-md text-left text-gray-600">
                    <br />วันที่ต้องการจัดงาน
                </div>
                <LocationDateReserve />
            </div>

            <button name="Book Venue" className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white">
                Book Venue
            </button>
        </main>
    );
}
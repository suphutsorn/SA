import { MembersInterface } from "../../interfaces/IMember";
import { RewardInterface  } from "../../interfaces/IReward"; 






const apiUrl = "http://localhost:8080/api";

// ฟังก์ชันเพื่อดึงข้อมูลรางวัลทั้งหมด
async function GetReward() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/rewards`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}

// ฟังก์ชันเพื่อดึงข้อมูลรางวัลตาม ID
async function GetRewardById(id: Number | undefined) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/rewards/${id}`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json(); // ถ้าสถานะเป็น 200 ส่งข้อมูลกลับมา
        } else {
          return false; // ถ้าไม่ใช่สถานะ 200 ส่งค่ากลับเป็น false
        }
      })
      .catch((error) => {
        console.error("Error fetching reward by ID:", error);
        return false; // ส่งกลับ false หากเกิดข้อผิดพลาด
      });
  
    return res; // ส่งข้อมูลรางวัลที่ได้กลับไป
  }
  
  async function CreateReward(data: RewardInterface) {
    // คัดลอกข้อมูล โดยตัด `id` และ `imageUrl` ออก
    const { ID, imageUrl, ...rewardDataWithoutIdAndImageUrl } = data;
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rewardDataWithoutIdAndImageUrl), // ส่งเฉพาะข้อมูลที่ต้องการ
    };
  
    let res = await fetch(`${apiUrl}/rewards`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });
  
    return res;
  }
  async function GetUserProfile(userId: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/member/profile/${userId}`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();  // คืนค่า JSON ถ้าสถานะเป็น 200
        } else {
          return false;  // คืนค่า false ถ้าไม่สำเร็จ
        }
      });
  
    return res;
  }
  

  // ประกาศฟังก์ชัน login โดยไม่ใช้ export ข้างหน้า
async function login(values: { username: string, password: string }) {
    try {
        const response = await fetch('http://localhost:8080/api/signinn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: values.username,  // ส่ง username ไปเป็น email
                password: values.password,
            }),
        });

        if (response.ok) {
            const data = await response.json();  // แปลงข้อมูลเป็น JSON
            console.log("API response:", data);

            const { email, id: memberID, token, name, points } = data;  // รับข้อมูลจาก backend เช่น name และ points

            if (memberID && token) {
                // เก็บข้อมูลที่ได้ลงใน localStorage
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('email', email); 
                localStorage.setItem('memberID', memberID);  
                localStorage.setItem('token', token);  
                localStorage.setItem('name', name);  // เก็บชื่อผู้ใช้ลงใน localStorage
                localStorage.setItem('points', points.toString());  // เก็บคะแนนของผู้ใช้ในรูปแบบ string

                return { success: true, isAdmin: (email === 'sa@gmail.com') };  // คืนค่าบอกว่าล็อกอินสำเร็จและเช็คว่าผู้ใช้เป็น admin หรือไม่
            } else {
                console.error("Invalid login response: memberID or token is missing");
                return { success: false, message: 'Invalid login response' };
            }
        } else {
            return { success: false, message: 'Login failed. Please check your username and password.' };
        }
    } catch (error) {
        console.error("Login failed. Error details:", error);
        return { success: false, message: 'Login failed. Please try again.' };
    }
}

const fetchMemberProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("Token is missing.");
        return;
    }

    const response = await fetch('http://localhost:8080/api/member/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,  // ต้องเป็น Bearer ตามด้วย token ที่ถูกต้อง
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Member Profile Data:", data);
        return data;
    } else {
        const errorData = await response.json();
        console.error("Error fetching member profile:", errorData.error);
        throw new Error(errorData.error || 'Failed to fetch profile');
    }
};


  

  export { 
    GetReward, 
    GetRewardById,
    CreateReward,
    GetUserProfile,
    login,
    fetchMemberProfile,
   

   };
  


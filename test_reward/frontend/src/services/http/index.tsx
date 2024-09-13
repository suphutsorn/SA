import { MembersInterface } from "../../interfaces/IMember";
import { RewardInterface  } from "../../interfaces/IReward"; 






const apiUrl = "http://localhost:8081/api";

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



  // ฟังก์ชันเพื่อดึงข้อมูลสมาชิกทั้งหมด
async function GetMembers() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/members`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
  }
  
  // ฟังก์ชันเพื่อดึงข้อมูลเพศทั้งหมด
  async function GetGenders() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/genders`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
  }
  
  // ฟังก์ชันเพื่อลบสมาชิกตาม ID
  async function DeleteMemberByID(id: Number | undefined) {
    const requestOptions = {
      method: "DELETE",
    };
  
    let res = await fetch(`${apiUrl}/members/${id}`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      });
  
    return res;
  }
  
  // ฟังก์ชันเพื่อดึงข้อมูลสมาชิกตาม ID
  async function GetMemberById(id: Number | undefined) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/members/${id}`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
  }
  
  // ฟังก์ชันเพื่อสร้างสมาชิกใหม่
  async function CreateMember(data: MembersInterface) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/members`, requestOptions)
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
  
  // ฟังก์ชันเพื่ออัปเดตข้อมูลสมาชิก
  async function UpdateMember(data: MembersInterface) {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/members/${data.ID}`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return false;
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

  const GetRewardsByMemberID = async (memberID: string) => {
    try {
        const response = await fetch(`/api/rewards/${memberID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Raw Response:", response);

        if (!response.ok) {
            // ถ้าไม่สำเร็จ อ่านข้อมูลจาก response.text() เพื่อดีบักข้อผิดพลาด
            const errorText = await response.text(); 
            console.error("Error response text:", errorText);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // พยายามอ่านข้อมูล response.json() เพียงครั้งเดียว
        const data = await response.json();
        console.log("Data:", data); // ตรวจสอบข้อมูลที่ได้รับ
        return data;

    } catch (error) {
        console.error("Error fetching rewards:", error);
        throw error;
    }
};


  

  
  

  export { 
    GetReward, 
    GetRewardById,
    CreateReward,
    GetUserProfile,
    GetMembers,
    GetGenders,
    DeleteMemberByID,
    GetMemberById,
    CreateMember,
    UpdateMember,
    GetRewardsByMemberID 
   

   };
  


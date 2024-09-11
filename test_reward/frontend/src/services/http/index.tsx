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
  
  


  

  export { 
    GetReward, 
    GetRewardById,
    CreateReward 

   };
  


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
  
    let res = await fetch(`${apiUrl}/reward`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}

async function GetRewardId(id: number | undefined) {
    if (id === undefined) {
      console.error("Reward ID is undefined");
      return false;
    }
  
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const res = await fetch(`${apiUrl}/reward/${id}`, requestOptions);
  
      if (res.status === 200) {
        return await res.json();
      } else if (res.status === 404) {
        console.error("Movie not found");
        return false;
      } else {
        console.error("Failed to fetch movie, status code:", res.status);
        return false;
      }
    } catch (error) {
      console.error("Error fetching movie by ID:", error);
      return false;
    }
  }

  // ฟังก์ชันเพื่อสร้างและส่งไปให้ Backend
  async function CreateReward(data: RewardInterface) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
    GetRewardId,
    CreateReward 

   };
  


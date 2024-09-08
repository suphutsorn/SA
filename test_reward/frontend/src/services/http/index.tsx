import { MembersInterface } from "../../interfaces/IMember";
import { Reward } from "../../interfaces/IReward"; 




const apiUrl = "http://localhost:8080/api";

// ฟังก์ชันเพื่อเรียก API แลกรางวัล
export async function RedeemReward(userName: string, rewardName: string, pointsUsed: number) {
  const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          userName: userName,
          rewardName: rewardName,
          pointsUsed: pointsUsed,
      }),
  };

  let res = await fetch(`${apiUrl}/redeem`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.message) {
              return { status: true, message: res.message, remainingPoints: res.remainingPoints };
          } else {
              return { status: false, error: res.error };
          }
      });

  return res;
}



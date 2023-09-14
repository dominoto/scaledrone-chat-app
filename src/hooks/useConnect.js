import { useState, useEffect } from "react";
import { randomName, randomColor } from "../utils/utils";

// Connect to Scaledrone channel
export function useConnect(channelId) {
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    const drone = new window.Scaledrone(channelId, {
      // Append user data because of observable room
      data: {
        name: randomName(),
        color: randomColor(),
      },
    });
    setDrone(drone);
  }, [channelId]);
  return drone;
}

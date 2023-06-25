import { useState, useEffect } from "react";

const useSkins = (botId) => {
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    const fetchSkins = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/botitems/forsale/${botId}`
      );
      const skinData = await response.json();
      setSkins(skinData);
    };

    fetchSkins();
  }, [botId]);

  return skins;
};

export default useSkins;

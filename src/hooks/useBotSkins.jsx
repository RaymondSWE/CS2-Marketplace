import { useState, useEffect } from "react";

const useSkins = (botId) => {
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    const fetchSkins = async () => {
      const response = await fetch(
        `https://api.csfairtrade.com:4001/api/botitems/forsale/${botId}`
      );
      const skinData = await response.json();
      setSkins(skinData);
    };

    fetchSkins();
  }, [botId]);

  return skins;
};

export default useSkins;

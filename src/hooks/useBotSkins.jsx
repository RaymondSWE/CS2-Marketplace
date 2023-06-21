import { useState, useEffect } from "react";

const useSkins = (botId) => {
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    const fetchSkins = async () => {
      const response = await fetch(
        `http://139.59.179.67:4000/api/botitems/forsale/${botId}`
      );
      const skinData = await response.json();
      setSkins(skinData);
    };

    fetchSkins();
  }, [botId]);

  return skins;
};

export default useSkins;

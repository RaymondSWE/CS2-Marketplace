import { useState, useEffect } from "react";

const useSkins = (botId) => {
  const [skins, setSkins] = useState([]);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/botitems/forsale/${botId}`)
      .then((response) => response.json())
      .then((data) => setSkins(data))
      .catch((error) => {
        console.error(error);
        setSkins([]); // Reset skins to an empty array on error
      });
  }, [botId]);

  return skins;
};

export default useSkins;

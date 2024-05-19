import { useState, useEffect } from "react";

const useSkins = (botId) => {
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/botitems/forsale/${botId}`;

    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => setSkins(data))
      .catch((error) => {
        console.error(error);
        setSkins([]);
      });
  }, [botId]);

  return skins;
};

export default useSkins;

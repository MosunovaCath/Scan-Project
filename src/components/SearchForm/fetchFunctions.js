import { getSearchData } from "./searchData";

export const fetchData = (formData, link, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json",
  };
  let resData = getSearchData(formData);

  const requestData = {
    method: "POST",
    headers,
    body: JSON.stringify(resData),
  };

  return fetch(link, requestData).then((response) => {
    if (!response.ok) {
      throw new Error("Error");
    }
    return response.json();
  });
};

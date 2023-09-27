export const istokenValid = async () => {
  const tokenState = JSON.parse(localStorage.getItem("accessToken"));
  if (tokenState === null) {
    return false;
  }

  const apiUrl = "https://gateway.scan-interfax.ru/api/v1/account/info";
  const headers = {
    Authorization: `Bearer ${tokenState?.token}`,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    if (response.status === 401) return false;
    return true;
  } catch (error) {
    return false;
  }
};

export const getTokenObj = () => {
  if (localStorage.getItem("accessToken") === null) {
    return { isAuthenticated: false, token: null, expirationDate: null };
  }
  const obj = JSON.parse(localStorage.getItem("accessToken"));

  return {
    isAuthenticated: true,
    token: obj.token,
    expirationDate: obj.expirationDate,
  };
};

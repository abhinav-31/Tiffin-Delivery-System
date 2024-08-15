const SERVER_URL = "http://localhost:9090";

export const createError = (error) => {
  return { status: "error", error };
};

export const createUrl = (path) => {
  return `${SERVER_URL}/${path}`;
};

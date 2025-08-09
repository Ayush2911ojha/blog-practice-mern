// utils/getUserId.js
export const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = Math.random().toString(36).substring(2, 6);
    localStorage.setItem('userId', userId);
  }
  return userId;
};

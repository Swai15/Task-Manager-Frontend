import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(true);
  let contextData = { user: user };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

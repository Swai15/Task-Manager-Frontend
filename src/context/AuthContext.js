import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState();
  let contextData = {};

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

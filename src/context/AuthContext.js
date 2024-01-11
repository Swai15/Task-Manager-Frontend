import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext;

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider></AuthContext.Provider>;
};

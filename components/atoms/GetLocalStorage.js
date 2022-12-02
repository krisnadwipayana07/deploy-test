import React from "react";

export default function GetLocalStorage(name) {
  if (typeof window !== "undefined") return localStorage.getItem(name);
}

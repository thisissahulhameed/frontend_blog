import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navigator() {
  const navigate = useNavigate();
  useEffect(() => navigate("/allPosts", { state: { path: "allPosts" } }));
}

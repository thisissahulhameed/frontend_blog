import { Skeleton } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export default function PostSkeleton({ hei }) {
  const matches = useMediaQuery("(max-width:700px)");
  return (
    <div
      style={
        matches
          ? { margin: "80px 50px 50px 50px" }
          : { margin: "90px 60px 50px 260px" }
      }
    >
      <Skeleton
        variant="rectangular"
        height={hei}
        style={{ marginBottom: 20 }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        height={hei}
        style={{ marginBottom: 20 }}
        animation="wave"
      />
      <Skeleton variant="rectangular" height={hei} animation="wave" />
    </div>
  );
}

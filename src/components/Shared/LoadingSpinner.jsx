import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingSpinner = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <p>
      <Skeleton count={3} />
    </p>
  </SkeletonTheme>
    </div>
  );
};

export default LoadingSpinner;
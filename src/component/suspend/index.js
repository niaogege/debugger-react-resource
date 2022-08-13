import React, { Suspense } from "react";

const ChildComp = React.lazy(() => import("./chld"));

const ChildComp2 = React.lazy(() => import("./chld2"));

const Loading = () => {
  return <div>Loading</div>;
};
const TestApp = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ChildComp />
      <ChildComp2 />
    </Suspense>
  );
};
export default TestApp;

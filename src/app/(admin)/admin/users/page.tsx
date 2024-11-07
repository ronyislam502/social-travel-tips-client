import { Suspense } from "react";

import UsersData from "../_components/UsersData";

import ErrorBoundary from "@/src/components/ErrorBoundary";
import Loader from "@/src/components/ui/Loader";

const page = () => {
  return (
    <div>
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<Loader />}>
          <UsersData />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default page;

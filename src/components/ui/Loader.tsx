import { Spinner } from "@nextui-org/spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Spinner color="success" label="Success" labelColor="success" size="lg" />
    </div>
  );
};

export default Loader;

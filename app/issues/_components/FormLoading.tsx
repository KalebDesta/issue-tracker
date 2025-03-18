import { Box } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const FormLoading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default FormLoading;

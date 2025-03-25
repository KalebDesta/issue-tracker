import { Button } from "@radix-ui/themes";

const ProvideSolutionButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button variant="soft" onClick={onClick}>
      Provide Solution
    </Button>
  );
};

export default ProvideSolutionButton;

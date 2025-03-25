import { MagicWandIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

const GenerateSolutionButton = () => {
  return (
    <Button variant="soft">
      <MagicWandIcon />
      Generate Solution
    </Button>
  );
};

export default GenerateSolutionButton;

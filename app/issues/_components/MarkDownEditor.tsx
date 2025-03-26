import MDEditor, { commands } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value?: string) => void;
  placeholder?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  // Exclude the 'image' command
  const toolbarCommands = commands
    .getCommands()
    .filter((cmd) => cmd.name !== "image");

  return (
    <MDEditor
      data-color-mode="light"
      value={value}
      onChange={onChange}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
      textareaProps={{
        placeholder: placeholder || "Enter markdown content...",
        style: { fontSize: "24px", color: "#333" },
      }}
      style={{ fontSize: "24px", height: "300px", color: "#333" }}
      commands={toolbarCommands}
    />
  );
};

export default MarkdownEditor;

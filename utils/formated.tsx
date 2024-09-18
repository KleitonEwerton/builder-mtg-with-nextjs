import { Box } from "@mui/material";

interface FormattedTextProps {
  text: string;
}
const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  // Divide o texto em partes usando a quebra de linha como separador
  const textParts = text.split("\n");

  return (
    <div className="formatted-text">
      {textParts.map((part, index) => (
        <Box
          key={index}
          component="section"
          sx={{ p: 2,  borderRadius: 1,border: "1px grey" } }
        >
          {part}
        </Box>
      ))}
    </div>
  );
};

export default FormattedText;

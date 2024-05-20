import { Box } from "@mui/material";

const ProgressCircle = ({ progress = 0, size = 40 }) => {
    const angle = (progress / 100) * 360;
    const primaryColor = "#1F2A40";
    const blueAccentColor = "#6870fa";
    const greenAccentColor = "#4cceac";

    return (
        <Box
            sx={{
                position: "relative",
                background: `radial-gradient(${primaryColor} 55%, transparent 56%),
                             conic-gradient(transparent 0deg ${angle}deg, ${blueAccentColor} ${angle}deg 360deg),
                             ${greenAccentColor}`,
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
            }}
        >

        </Box>
    );
};

export default ProgressCircle;
export default function Button({ onClick, backgroundColor, children, type }) {
    const buttonStyle = {
        height: "2.5rem",
        padding: "1.75rem",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        borderRadius: "0.25rem",
        backgroundColor: backgroundColor || "transparent",
        color: backgroundColor ? "#ffffff" : "#000000",
    };

    return (
        <button style={buttonStyle} onClick={onClick} type={type}>
            {children}
        </button>
    );
}

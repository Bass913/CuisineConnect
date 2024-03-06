export default function Button({ onClick, backgroundColor, children, type }) {
  const buttonStyle = {
    height: "2.5rem", // Ajustez la hauteur selon vos besoins
    padding: "1.75rem", // Ajustez le padding selon vos besoins
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    border: "1px solid",
    borderRadius: "0.25rem",
    backgroundColor: backgroundColor || "transparent", // Utilisez la couleur de fond fournie ou transparent par défaut
    color: backgroundColor ? "#ffffff" : "#000000", // Utilisez la couleur du texte en fonction de la couleur de fond
  };

  return (
    <button className="custom-button" style={buttonStyle} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default function Button({ onClick, className, children, type }) {
	return (
		<button onClick={onClick} type={type} className={className}>
			{children}
		</button>
	);
}

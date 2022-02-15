import React from "react";
import "../../Styles/CSS/input.css";

const Input = React.forwardRef((props, ref) => {
	const { children, className, type, name, required } = props;
	const styleClass = className + " fancy-input";

	return (
		<div className={styleClass}>
			<input type={type} name={name} ref={ref} required={required} />
			<label htmlFor={name} className="label-name">
				<span className="content-name">{children}</span>
			</label>
		</div>
	);
});

export default Input;

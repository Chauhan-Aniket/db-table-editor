const InputText = ({ id, value, children, handleChange }) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id} className="text-xs font-medium tracking-[0.3px]">
				{children}
			</label>
			<input
				type={id}
				id={id}
				placeholder={id}
				value={value}
				onChange={handleChange}
				className="p-2 bg-transparent border border-zinc-300 dark:border-zinc-700 text-sm outline-none rounded"
			/>
		</div>
	);
};

export default InputText;

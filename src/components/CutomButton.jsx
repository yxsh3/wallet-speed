
export default function CustomButton({text, onClick}){
    return (
        <button className="bg-fuchsia-900 py-2 px-4 rounded text-neutral-100" onClick={onClick}>
            {text}
        </button>
    )
}
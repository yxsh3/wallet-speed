
export default function CustomButton({text, onClick}){
    return (
        <button className="bg-fuchsia-900 hover:bg-fuchsia-800 py-2 px-4 rounded text-neutral-100 shadow-md" onClick={onClick}>
            {text}
        </button>
    )
}
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

function Success() {

const [width, height] = useWindowSize();

return (

<div className="flex flex-col items-center justify-center min-h-[80vh] text-center">

<Confetti width={width} height={height} numberOfPieces={300} />

<div className="text-6xl animate-bounce mb-4">
🍦
</div>

<h1 className="text-4xl font-bold text-pink-600">
🎉 Order Placed Successfully!
</h1>

<p className="mt-3 text-gray-600">
Thanks for ordering from <span className="font-semibold">Scoopify</span> 🍦
</p>

<Link
to="/orders"
className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow"
>
View Orders
</Link>

</div>

);
}

export default Success;
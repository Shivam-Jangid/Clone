export default function Balance({balance}) {
  return (
    <div className="text-xl p-2 font-semibold">
   Your Balance {" "} :{" "}₹{balance.toFixed(2)}
    </div>
  )
}

import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex flex-col gap-2">
      <Link to="pokemon" className="text-blue-600 hover:underline">
        Pokemon
      </Link>

      <Link to="form" className="text-blue-600 hover:underline">
        Form
      </Link>
    </div>
  );
}
